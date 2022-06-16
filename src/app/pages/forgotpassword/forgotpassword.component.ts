import { catchError } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"],
})
export class ForgotpasswordComponent implements OnInit {
  ForgotPasswordForm: FormGroup;
  constructor(
    private AuthService: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ForgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  onForgotPassword() {
    this.AuthService.forgotPassword(
      this.ForgotPasswordForm.value.email
    ).subscribe((res:any) => {
      this.ForgotPasswordForm.reset();
      this.toast.success({
        detail: "E-mail envoyé avec succès",
        summary: res.data,
        duration: 5000,
      })
      this.router.navigateByUrl("/connexion")},

      (err) => {
        this.ForgotPasswordForm.reset();
        this.toast.error({
          detail: "Erreur",
          summary: "Il n'y a pas d'utilisateur avec cet e-mail",
          duration: 5000,
        });
        this.router.navigateByUrl("/inscription");
      });
  }
}
