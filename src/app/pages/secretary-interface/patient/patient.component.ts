import { EditPatientComponent } from "src/app/pages/secretary-interface/patient/edit-patient/edit-patient.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { MatDialog } from "@angular/material/dialog";
import { PatientService } from "./../../../services/patient.service";
import { CreatePatientComponent } from "./create-patient/create-patient.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.scss"],
})
export class PatientComponent implements OnInit {
  displayedColumns: string[] = [
    "Nom",
    "Prenom",
    "cin",
    "sexe",
    "numeroTel",
    "DateNaiss",
    "Etatcivil",
    "Travail",
    "Action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  PatientsObject: any = [];
  Patients: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private PatientsService: PatientService,
    private toast: NgToastService
  ) {}



  ngOnInit(): void {
    this.ReadPatients();
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

  openDialog() {
    this.dialog.open(CreatePatientComponent, {
      width: "40%",
    });
  }

  ReadPatients() {
    this.PatientsService.getPatients().subscribe((data) => {
      console.log(data);
      this.PatientsObject.push(data);
      this.Patients = this.PatientsObject[0].data;
      this.dataSource = new MatTableDataSource(this.Patients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  EditPatient(row) {
    this.dialog.open(EditPatientComponent, {
      width: "40%",
      data: row,
    });
  }

  ArchivePatient(id) {
    this.PatientsService.archivePatient(id).subscribe(
      (res: any) => {
        this.toast.success({
          detail: "succès",
          summary: "Patient archiver avec succès!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      },
      (err: any) => {
        this.toast.error({
          detail: "échec",
          summary: "impossible de l'archiver!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      }
    );
  }
}
