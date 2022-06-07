import { StocksService } from './../../../../../services/stocks.service';
import { ProductsService } from './../../../../../services/products.service';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  submitted = false;
  uploadedFiles: Array < File > ;
  CreateProductForm : FormGroup ;
  public variables2: [];
  public filteredList5: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private StocksService : StocksService,
    private ProductsService : ProductsService,
    private dialogRef: MatDialogRef<CreateProductComponent>,
  ){
    this.ValidateForm();
  }

  ngOnInit(): void {
    this.StocksService.getStocks().subscribe(
      (res: any) => {
        this.variables2 = res.data;
        this.filteredList5 = this.variables2.slice();
      }
    );
  }

   ValidateForm() {
    this.CreateProductForm = this.fb.group({
      NomPrd : ["",[Validators.required]],
      QuantPrd : ["",[Validators.required]],
      PrixPrd : ["",[Validators.required]],
      DescrPrd : ["",[Validators.required]],
      ExpDate: ["", [Validators.required]],
      stock: [null, [Validators.required]],
    })
  }

   reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  fileChange(element) {
      this.uploadedFiles = element.target.files;
  }

  onSubmit(){
    let formData = new FormData();

    formData.append("NomPrd",this.CreateProductForm.value.NomPrd);
    formData.append("QuantPrd",this.CreateProductForm.value.QuantPrd);
    formData.append("PrixPrd",this.CreateProductForm.value.PrixPrd);
    formData.append("DescrPrd",this.CreateProductForm.value.DescrPrd);
    formData.append("ExpDate",this.CreateProductForm.value.ExpDate);

    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("imagePrd", this.uploadedFiles[i]);
    }

    this.submitted = true;
    if (!this.CreateProductForm.valid) {
      return false;
    } else {
      return this.ProductsService.addProduct(
        this.CreateProductForm.value.stock,
        formData
      ).subscribe({
        complete: () => {
          console.log("Produit ajoutée avec succès!");
          this.CreateProductForm.reset(this.CreateProductForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Produit ajoutée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (err) => {
          this.CreateProductForm.reset(this.CreateProductForm.value);
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
