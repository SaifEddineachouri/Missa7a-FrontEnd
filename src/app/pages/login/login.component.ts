import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./../../services/auth.service";
import { NgToastService } from "ng-angular-popup";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  LoginForm: FormGroup;
  LoggedInUser: any;
  constructor(
    private AuthService: AuthService,
    public router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.LoginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }
  ngOnDestroy() {}

  onLogin() {
    this.AuthService.Login(
      this.LoginForm.value.email,
      this.LoginForm.value.password
    ).subscribe(
      (res: any) => {
        this.LoginForm.reset();
        this.toast.success({
          detail: "succès",
          summary: "Bienvenue!",
          duration: 3000,
        });
        this.AuthService.getLoggedInUser().subscribe((res: any) => {
          switch (res.data.role) {
            case "admin":
              this.router.navigateByUrl("/tableau-de-bord");
              break;
            case "patient":
              this.router.navigateByUrl("/patient/tableau-de-bord");
              break;
            case "secretary":
              this.router.navigateByUrl("/secretaire/tableau-de-bord");
              break;
            case "supplier":
              this.router.navigateByUrl("/fournisseur/tableau-de-bord");
              break;
          }
        });
      },
      (err: any) => {
        this.LoginForm.reset();
        this.toast.error({
          detail: "Erreur",
          summary: "E-mail ou Mot de passe Incorrect",
          duration: 3000,
        });
      }
    );
  }
}
