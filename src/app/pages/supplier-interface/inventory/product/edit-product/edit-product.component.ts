import { ProductsService } from "./../../../../../services/products.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"],
})
export class EditProductComponent implements OnInit {
  submitted = false;
  EditProductForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private ProductsService: ProductsService,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public editData
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {
    this.ValidateForm();
    if (this.editData) {
      this.EditProductForm.controls["NomPrd"].setValue(this.editData.NomPrd);
      this.EditProductForm.controls["QuantPrd"].setValue(
        this.editData.QuantPrd
      );
      this.EditProductForm.controls["PrixPrd"].setValue(this.editData.PrixPrd);
      this.EditProductForm.controls["DescrPrd"].setValue(
        this.editData.DescrPrd
      );
      this.EditProductForm.controls["ExpDate"].setValue(this.editData.ExpDate);
    }
  }

  ValidateForm() {
    this.EditProductForm = this.fb.group({
      NomPrd: ["", [Validators.required]],
      QuantPrd: ["", [Validators.required]],
      PrixPrd: ["", [Validators.required]],
      DescrPrd: ["", [Validators.required]],
      ExpDate: ["", [Validators.required]],
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
    if (!this.EditProductForm.valid) {
      return false;
    } else {
      return this.ProductsService.updateProduct(
        this.editData._id,
        this.EditProductForm.value
      ).subscribe({
        complete: () => {
          this.EditProductForm.reset(this.EditProductForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Produit Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.EditProductForm.reset(this.EditProductForm.value);
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
