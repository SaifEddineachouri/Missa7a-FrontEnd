import { AuthService } from "./../../services/auth.service";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { mimeType } from "./mime-type.validator";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  imagePreview: string;
  avatar: any;
  constructor(
    private AuthService: AuthService,
    public router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.RegisterForm = new FormGroup({
      Prenom: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      Nom: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      cin: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      avatar: new FormControl(null, [Validators.required], [mimeType]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.RegisterForm.patchValue({ avatar: file });
    this.RegisterForm.get("avatar").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onRegister() {
    this.AuthService.Register(
      this.RegisterForm.value.Prenom,
      this.RegisterForm.value.Nom,
      this.RegisterForm.value.cin,
      this.RegisterForm.value.avatar,
      this.RegisterForm.value.email,
      this.RegisterForm.value.password
    ).subscribe(
      (res: any) => {
        this.toast.success({
          detail: "succès",
          summary: "Votre compte à été créé avec succès!",
          duration: 3000,
        });
        this.router.navigateByUrl("/connexion");
      },
      (err: any) => {
        this.RegisterForm.reset();
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
