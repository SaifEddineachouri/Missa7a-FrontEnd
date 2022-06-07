import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ConfirmDialogModel, DeleteProductComponent } from './product/delete-product/delete-product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

 displayedColumns: string[] = [
    "imagePrd",
    "NomPrd",
    "QuantPrd",
    "PrixPrd",
    "stock",
    "createAt",
    "ExpDate",
    "Action",
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ProductsObject: any = [];
  Products: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private ProductsService : ProductsService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.ReadProducts();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ReadProducts() {
    this.ProductsService.getProducts().subscribe((data) => {
      this.ProductsObject.push(data);
      this.Products = this.ProductsObject[0].data;
      this.dataSource = new MatTableDataSource(this.Products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog() {
    this.dialog.open(CreateProductComponent, {
      width: "40%",
    });
  }

  EditProduct(row) {
    this.dialog.open(EditProductComponent, {
      width: "40%",
      data: row,
    });
  }

  DeleteProduct(id){
    const message = `Êtes-vous sûr de vouloir supprimer ce Produit?`;

    const dialogData = new ConfirmDialogModel("Supprimer ce Produit", message);

    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: "40%",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.ProductsService.deleteProduct(id).subscribe((res) => {
        this.toast.success({
          detail: "succès",
          summary: "Produit Supprimer avec succès!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
        });
      } else {
        this.toast.error({
          detail: "échec",
          summary: "échec de Supprimation!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      }
    });
  }
}
