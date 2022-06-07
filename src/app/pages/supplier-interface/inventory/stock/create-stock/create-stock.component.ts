import { StocksService } from './../../../../../services/stocks.service';
import { CategoriesService } from './../../../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {
  submitted = false;
  CreateStockForm : FormGroup ;
  public variables2: [];
  public filteredList5: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private StocksService :StocksService,
    private CategoriesService : CategoriesService,
    private dialogRef: MatDialogRef<CreateStockComponent>,
  ) {
    this.ValidateForm();
  }


  ngOnInit(): void {
    this.CategoriesService.getCategories().subscribe(
      (res: any) => {
        this.variables2 = res.data;
        this.filteredList5 = this.variables2.slice();
      }
    );
  }

  ValidateForm() {
    this.CreateStockForm = this.fb.group({
      NomStock : ["",[Validators.required]],
      StatusStock : ["",[Validators.required]],
      categorie : ["",[Validators.required]],
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
    if (!this.CreateStockForm.valid) {
      return false;
    } else {
      return this.StocksService.addStock(
        this.CreateStockForm.value.categorie,
        {
          NomStock : this.CreateStockForm.value.NomStock,
          StatusStock :this.CreateStockForm.value.StatusStock,
        }
      ).subscribe({
        complete: () => {
          console.log("Stock créé avec succès!");
          this.CreateStockForm.reset(this.CreateStockForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Stock créé avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.CreateStockForm.reset(this.CreateStockForm.value);
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

