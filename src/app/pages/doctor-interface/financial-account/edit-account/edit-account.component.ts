import { FinancialAccountService } from './../../../../services/financial-account.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  submitted = false;
  FinancialAccountEditForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private FinancialAccountService:FinancialAccountService ,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public editData
  ) {
    this.ValidateForm();
   }

  ngOnInit(): void {
    if (this.editData) {
      this.FinancialAccountEditForm.controls["TypeComp"].setValue(this.editData.TypeComp);
      this.FinancialAccountEditForm.controls["statut"].setValue(this.editData.statut);
      this.FinancialAccountEditForm.controls["bankName"].setValue(this.editData.bankName);
      this.FinancialAccountEditForm.controls["NumComp"].setValue(this.editData.NumComp);
      this.FinancialAccountEditForm.controls["NumIban"].setValue(this.editData.NumIban);
      this.FinancialAccountEditForm.controls["SwiftCode"].setValue(this.editData.SwiftCode);
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  ValidateForm() {
    this.FinancialAccountEditForm = this.fb.group({
      TypeComp: ["", [Validators.required]],
      statut: [
        "",
        [Validators.required],
      ],
      bankName: ["", [Validators.minLength(5)]],
      NumComp: ["", [Validators.minLength(5)]],
      NumIban: ["", [Validators.minLength(24)]],
      SwiftCode: ["", [Validators.minLength(5)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.FinancialAccountEditForm.valid) {
      return false;
    } else {
      return this.FinancialAccountService.updateFinancialAccount(
        this.editData._id,
        this.FinancialAccountEditForm.value
      ).subscribe({
        complete: () => {
          this.FinancialAccountEditForm.reset(this.FinancialAccountEditForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Compte Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.FinancialAccountEditForm.reset(this.FinancialAccountEditForm.value);
          this.toast.error({
            detail: "échec",
            summary: "échec de Modification!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
      });
    }
  }

}
