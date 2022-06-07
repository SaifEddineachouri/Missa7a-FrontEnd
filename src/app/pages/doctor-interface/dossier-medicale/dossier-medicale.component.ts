import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { MedicalFolderService } from "./../../../services/medical-folder.service";
import { EditFolderComponent } from "./edit-folder/edit-folder.component";

@Component({
  selector: "app-dossier-medicale",
  templateUrl: "./dossier-medicale.component.html",
  styleUrls: ["./dossier-medicale.component.scss"],
})
export class DossierMedicaleComponent implements OnInit {
  displayedColumns: string[] = [
    "Nom",
    "Prenom",
    "cin",
    "Taille",
    "Poids",
    "Action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  MedicalFolderObject: any = [];
  MedicalFolders: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private MedicalFolderService: MedicalFolderService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.ReadMedicalFolders();
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

  ReadMedicalFolders() {
    this.MedicalFolderService.getMedicalFolders().subscribe((data) => {
      this.MedicalFolderObject.push(data);
      this.MedicalFolders = this.MedicalFolderObject[0].data;
      this.dataSource = new MatTableDataSource(this.MedicalFolders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  EditMedicalFolder(row) {
    this.dialog.open(EditFolderComponent, {
      width: "40%",
      data: row,
    });
  }

  ConsultMedicalFolder(id){
    this.router.navigate([`dossiers-medicaux/${id}/details`]);
  }

}
