import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  submitted = false;
  UserEditForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private UsersService: UserService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public editData
  ) {
    this.ValidateForm();
   }

  ngOnInit(): void {
    if (this.editData) {
      this.UserEditForm.controls["Prenom"].setValue(this.editData.Prenom);
      this.UserEditForm.controls["Nom"].setValue(this.editData.Nom);
      this.UserEditForm.controls["cin"].setValue(this.editData.cin);
      this.UserEditForm.controls["role"].setValue(this.editData.role);
      this.UserEditForm.controls["email"].setValue(this.editData.email);
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  ValidateForm() {
    this.UserEditForm = this.fb.group({
      Prenom: ["", [Validators.required]],
      Nom: ["", [Validators.required]],
      cin: [
        "",
        [Validators.pattern("^[01][01][0-9]{6}$") , Validators.minLength(8),Validators.maxLength(8)]
      ],
      role : ["", [Validators.required]],
      email : ["",[Validators.required , Validators.email]]
    })
  }

  onSubmit(){
    this.submitted = true;
    if (!this.UserEditForm.valid) {
      return false;
    } else {
      return this.UsersService.updateUser(
        this.editData._id,
        this.UserEditForm.value
      ).subscribe({
        complete: () => {
          this.UserEditForm.reset(this.UserEditForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Utilisateur Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: () => {
          this.UserEditForm.reset(this.UserEditForm.value);
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
