import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { UserService } from "./../../../services/user.service";
import { ConfirmDialogModel, DeleteUserComponent } from "./delete-user/delete-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "avatar",
    "Prenom",
    "Nom",
    "cin",
    "email",
    "role",
    "createdAt",
    "Action",
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  UsersObject: any = [];
  Users: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private UsersService: UserService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.ReadUsers();
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

  ReadUsers() {
    this.UsersService.getUsers().subscribe((data) => {
      this.UsersObject.push(data);
      this.Users = this.UsersObject[0].data;
      this.dataSource = new MatTableDataSource(this.Users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  EditUser(row) {
    this.dialog.open(EditUserComponent, {
      width: "40%",
      data: row,
    });
  }

  DeleteUser(id) {
    const message = `Êtes-vous sûr de vouloir supprimer cette utilisateur?`;

    const dialogData = new ConfirmDialogModel("Supprimer cette utilisateur", message);

    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: "40%",
      data: dialogData,
    });

     dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.UsersService.deleteUser(id).subscribe((res) => {
        this.toast.success({
          detail: "succès",
          summary: "Utilisateur Supprimer avec succès!",
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
