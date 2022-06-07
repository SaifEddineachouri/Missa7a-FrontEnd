import { CategoriesService } from './../../../../../services/categories.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  submitted = false;
  EditCategoryForm : FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private CategoriesService : CategoriesService,
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public editData
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {
    this.ValidateForm();
    if (this.editData) {
      this.EditCategoryForm.controls["NomCategorie"].setValue(this.editData.NomCategorie);
    }
  }

  ValidateForm() {
    this.EditCategoryForm = this.fb.group({
      NomCategorie : ["",[Validators.required]],
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit(){
    this.submitted = true;
    if (!this.EditCategoryForm.valid) {
      return false;
    } else {
      return this.CategoriesService.updateCategorie(
        this.editData._id,
        this.EditCategoryForm.value
      ).subscribe({
        complete: () => {
          this.EditCategoryForm.reset(this.EditCategoryForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Catégorie Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.EditCategoryForm.reset(this.EditCategoryForm.value);
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
