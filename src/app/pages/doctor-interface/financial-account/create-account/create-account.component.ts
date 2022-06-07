import { FinancialAccountService } from './../../../../services/financial-account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  submitted = false;
  FinancialAccountForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private FinancialAccountService: FinancialAccountService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<CreateAccountComponent>
  ) { }

  ngOnInit(): void {
    this.ValidateForm();
  }

    ValidateForm() {
    this.FinancialAccountForm = this.fb.group({
      CodeComp: ["", [Validators.required]],
      TypeComp: ["", [Validators.required]],
      statut: [
        "",
        [Validators.required],
      ],
      InitBalance: [0, [Validators.required]],
      bankName: ["", [Validators.minLength(5)]],
      NumComp: ["", [Validators.minLength(5)]],
      NumIban: ["", [Validators.minLength(24)]],
      SwiftCode: ["", [Validators.minLength(5)]],
    });
  }

  // Getter to access form control
  get myForm() {
    return this.FinancialAccountForm.controls;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }


  onSubmit() {
    this.submitted = true;
    if (!this.FinancialAccountForm.valid) {
      return false;
    } else {
      return this.FinancialAccountService.createFinancialAccount(
        this.FinancialAccountForm.value
      ).subscribe({
        complete: () => {
          this.FinancialAccountForm.reset(this.FinancialAccountForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Compte créé avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: () => {
          this.FinancialAccountForm.reset(this.FinancialAccountForm.value);
          this.toast.error({
            detail: "échec",
            summary: "échec de création!",
            duration: 3000,
          });
        },
      });
    }
  }
}
