import { StocksService } from './../../../../services/stocks.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { ConfirmDialogModel, DeleteStockComponent } from './delete-stock/delete-stock.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  displayedColumns: string[] = [
    "NomStock",
    "StatusStock",
    "categorie",
    "DateStock",
    "Action",
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  StocksObject: any = [];
  Stocks: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private StocksService : StocksService,
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
    this.StocksService.getStocks().subscribe((data) => {
      this.StocksObject.push(data);
      this.Stocks = this.StocksObject[0].data;
      this.dataSource = new MatTableDataSource(this.Stocks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog() {
    this.dialog.open(CreateStockComponent, {
      width: "40%",
    });
  }

  EditStock(row) {
    this.dialog.open(EditStockComponent, {
      width: "40%",
      data: row,
    });
  }

  DeleteStock(id){
    const message = `Êtes-vous sûr de vouloir supprimer cette Stock?`;

    const dialogData = new ConfirmDialogModel("Supprimer cette Stock", message);

    const dialogRef = this.dialog.open(DeleteStockComponent, {
      width: "40%",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.StocksService.deleteStock(id).subscribe((res) => {
        this.toast.success({
          detail: "succès",
          summary: "Stock Supprimer avec succès!",
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
