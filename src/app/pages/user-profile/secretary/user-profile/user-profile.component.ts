import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { AuthService } from "./../../../../services/auth.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  submitted = false;
  UserInfoEditForm: FormGroup;

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

  ngOnInit() {
    this.getMe();
    this.UserInfoEditForm.controls["Nom"].setValue(this.Nom);
    this.UserInfoEditForm.controls["Prenom"].setValue(this.Prenom);
    this.UserInfoEditForm.controls["cin"].setValue(this.Cin);
    this.UserInfoEditForm.controls["email"].setValue(this.Email);
  }

  ValidateForm() {
    this.UserInfoEditForm = this.fb.group({
      Prenom: ["", [Validators.required]],
      Nom: ["", [Validators.required]],
      cin: ["", [Validators.pattern("^[01][01][0-9]{6}$")]],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  getMe() {
    this.AuthService.getLoggedInUser().subscribe((res: any) => {

      this.Prenom = res.data.Prenom;
      this.UserInfoEditForm.controls["Prenom"].setValue(this.Prenom);

      this.Nom = res.data.Nom;
      this.UserInfoEditForm.controls["Nom"].setValue(this.Nom);

      this.Cin = res.data.cin;
      this.UserInfoEditForm.controls["cin"].setValue(this.Cin);

      this.Email = res.data.email;
      this.UserInfoEditForm.controls["email"].setValue(this.Email);

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

  onSubmit() {
    this.submitted = true;
    if (!this.UserInfoEditForm.valid) {
      return false;
    } else {
      return this.AuthService.updateDetails(
        this.UserInfoEditForm.value
      ).subscribe({
        complete: () => {
          this.toast.success({
            detail: "succès",
            summary: "Vos informations ont été modifiées !",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
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
