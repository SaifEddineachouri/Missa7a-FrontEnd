import { FinancialAccountService } from "./../../../services/financial-account.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { EditAccountComponent } from "./edit-account/edit-account.component";
import { ConfirmDialogModel, DeleteAccountComponent } from "./delete-account/delete-account.component";

@Component({
  selector: "app-financial-account",
  templateUrl: "./financial-account.component.html",
  styleUrls: ["./financial-account.component.scss"],
})
export class FinancialAccountComponent implements OnInit {
  displayedColumns: string[] = [
    "CodeComp",
    "TypeComp",
    "date",
    "InitBalance",
    "statut",
    "Action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  FinancialAccountsObject: any = [];
  FinancialAccounts: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private FinancialAccountService: FinancialAccountService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.ReadFinancialAccounts();
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

  ReadFinancialAccounts() {
    this.FinancialAccountService.getFinancialAccounts().subscribe((data) => {
      this.FinancialAccountsObject.push(data);
      this.FinancialAccounts = this.FinancialAccountsObject[0].data;
      this.dataSource = new MatTableDataSource(this.FinancialAccounts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(){
    this.dialog.open(CreateAccountComponent,{
      width: "40%",
    });
  }


  EditFinancialAccount(row) {
    this.dialog.open(EditAccountComponent, {
      width: "40%",
      data: row,
    });
  }

  DeleteFinancialAccount(id){
    const message = `Êtes-vous sûr de vouloir supprimer ce Compte?`;

    const dialogData = new ConfirmDialogModel("Supprimer ce Compte", message);

    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      width: "40%",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.FinancialAccountService.deleteFinancialAccount(id).subscribe((res) => {
        this.toast.success({
          detail: "succès",
          summary: "Compte Supprimer avec succès!",
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
