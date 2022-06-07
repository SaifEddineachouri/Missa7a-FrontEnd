import { CategoriesService } from './../../../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  submitted = false;
  CreateCategoryForm : FormGroup ;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private CategoriesService : CategoriesService,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
  ) { 
    this.ValidateForm();
  }

  ngOnInit(): void {
  }

  ValidateForm() {
    this.CreateCategoryForm = this.fb.group({
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
    if (!this.CreateCategoryForm.valid) {
      return false;
    } else {
      return this.CategoriesService.addCategorie(
        this.CreateCategoryForm.value,
      ).subscribe({
        complete: () => {
          console.log("Catégorie ajoutée avec succès!");
          this.CreateCategoryForm.reset(this.CreateCategoryForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Catégorie ajoutée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (err) => {
          this.CreateCategoryForm.reset(this.CreateCategoryForm.value);
          this.toast.error({
            detail: "échec",
            summary: "échec de création!",
            duration: 3000,
          });
        },
      });
    }
  }
}

