import { ConsultationService } from "src/app/services/consultation.service";
import { FinancialAccountService } from "./../../../../services/financial-account.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgToastService } from "ng-angular-popup";
import { Router } from "@angular/router";

@Component({
  selector: "app-pay-consultation",
  templateUrl: "./pay-consultation.component.html",
  styleUrls: ["./pay-consultation.component.scss"],
})
export class PayConsultationComponent implements OnInit {
  submitted = false;
  PaymentForm: FormGroup;
  public variables2: [];
  public filteredList5: any;

  constructor(
    private FinancialAccountService: FinancialAccountService,
    private ConsultationService: ConsultationService,
    private router: Router,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<PayConsultationComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public ConsultationData
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {
    this.FinancialAccountService.getFinancialAccounts().subscribe(
      (res: any) => {
        this.variables2 = res.data;
        this.filteredList5 = this.variables2.slice();
      }
    );
  }

  ValidateForm() {
    this.PaymentForm = this.fb.group({
      CodeComp: [null, [Validators.required]],
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.PaymentForm.valid) {
      return false;
    } else {
      return this.ConsultationService.payConsultation(
        this.ConsultationData._id,
        this.PaymentForm.value,
      ).subscribe({
        complete: () => {
          this.PaymentForm.reset(this.PaymentForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Consultation payé avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (err) => {
          this.PaymentForm.reset(this.PaymentForm.value);
          this.toast.error({
            detail: "échec",
            summary: "échec de paiement!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
      });
    }
  }
}
