import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from "./../../../../services/auth.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  UserPasswordEditForm : FormGroup ;
  submitted = false;

  Prenom: String;
  avatar: String;
  Nom: String;
  Cin: String;
  Email: String;
  Role: String;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private AuthService: AuthService
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {
    this.getMe();
  }

  ValidateForm() {
    this.UserPasswordEditForm = this.fb.group({
      currentPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
    });
  }


  getMe() {
    this.AuthService.getLoggedInUser().subscribe((res: any) => {
      this.Prenom = res.data.Prenom;
      this.Nom = res.data.Nom;
      this.Cin = res.data.cin;
      this.Email = res.data.email;
      this.Role = res.data.role;
      this.avatar = res.data.avatar;
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  onSubmit(){
    this.submitted = true;
    if (!this.UserPasswordEditForm.valid) {
      return false;
    } else {
      return this.AuthService.updatePassword(
        this.UserPasswordEditForm.value
      ).subscribe({
        complete: () => {
          this.toast.success({
            detail: "succès",
            summary: "Votre mot de passe a été modifié avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (err) => {
          this.toast.error({
            detail: "échec",
            summary: err.error.error,
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
      });
    }
  }

}
