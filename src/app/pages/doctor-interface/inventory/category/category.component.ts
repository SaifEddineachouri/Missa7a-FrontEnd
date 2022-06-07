import { CategoriesService } from './../../../../services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ConfirmDialogModel, DeleteCategoryComponent } from './delete-category/delete-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = [
    "NomCategorie",
    "createAt",
    "Action",
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  CategoriesObject: any = [];
  Categories: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private CategoriesService : CategoriesService,
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
    this.CategoriesService.getCategories().subscribe((data) => {
      this.CategoriesObject.push(data);
      this.Categories = this.CategoriesObject[0].data;
      this.dataSource = new MatTableDataSource(this.Categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog() {
    this.dialog.open(CreateCategoryComponent, {
      width: "40%",
    });
  }

  EditCategory(row) {
    this.dialog.open(EditCategoryComponent, {
      width: "40%",
      data: row,
    });
  }

  DeleteCategory(id){
    const message = `Êtes-vous sûr de vouloir supprimer cette Categorie?`;

    const dialogData = new ConfirmDialogModel("Supprimer cette Categorie", message);

    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      width: "40%",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.CategoriesService.deleteCategorie(id).subscribe((res) => {
        this.toast.success({
          detail: "succès",
          summary: "Categorie Supprimer avec succès!",
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
