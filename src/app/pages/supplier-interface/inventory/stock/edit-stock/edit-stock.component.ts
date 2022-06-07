import { StocksService } from './../../../../../services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit {
  submitted = false;
  EditStockForm : FormGroup ;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private StocksService  : StocksService,
    private dialogRef: MatDialogRef<EditStockComponent>,
    @Inject(MAT_DIALOG_DATA) public editData
  ) {
    this.ValidateForm();
   }

  ngOnInit(): void {
    this.ValidateForm();
    if (this.editData) {
      this.EditStockForm.controls["NomStock"].setValue(this.editData.NomStock);
      this.EditStockForm.controls["StatusStock"].setValue(
        this.editData.StatusStock
      );
    }
  }

  ValidateForm() {
    this.EditStockForm = this.fb.group({
      NomStock: ["", [Validators.required]],
      StatusStock : ["",[Validators.required]],
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit(){
    this.submitted = true;
    if (!this.EditStockForm.valid) {
      return false;
    } else {
      return this.StocksService.updateStock(
        this.editData._id,
        this.EditStockForm.value
      ).subscribe({
        complete: () => {
          this.EditStockForm.reset(this.EditStockForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Stock Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.EditStockForm.reset(this.EditStockForm.value);
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
