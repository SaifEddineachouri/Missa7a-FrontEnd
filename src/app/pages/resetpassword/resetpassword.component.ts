import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.scss"],
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  resetToken: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AuthService: AuthService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl("", [Validators.required]),
    });
    this.resetToken = this.route.snapshot.paramMap.get("resetToken");
    console.log(this.resetToken);
  }

  onResetPassword() {
    this.AuthService.resetPassword(
      this.resetToken,
      this.resetPasswordForm.value.password
    ).subscribe(
      (res:any) => {
        console.log(res);
        this.resetPasswordForm.reset();
        this.toast.success({
          detail: "succès",
          summary: "Le mot de passe a été Modifié avec succès",
          duration: 3000,
        });
        this.router.navigateByUrl("/connexion");
      },
      (err:any) => {
        console.log(err);
        this.resetPasswordForm.reset();
        this.toast.error({
          detail: "Erreur",
          summary: err.error.error,
          duration: 3000,
        });
        this.router.navigateByUrl("/inscription");
      }
    );
  }
}
