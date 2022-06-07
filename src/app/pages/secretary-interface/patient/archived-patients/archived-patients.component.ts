import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { PatientService } from "src/app/services/patient.service";

@Component({
  selector: "app-archived-patients",
  templateUrl: "./archived-patients.component.html",
  styleUrls: ["./archived-patients.component.scss"],
})
export class ArchivedPatientsComponent implements OnInit {
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
    private router: Router,
    private PatientsService: PatientService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.ReadArchivedPatients();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ReadArchivedPatients() {
    this.PatientsService.getArchivedPatients().subscribe((data) => {
      this.PatientsObject.push(data);
      this.Patients = this.PatientsObject[0].data;
      this.dataSource = new MatTableDataSource(this.Patients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  UnarchivePatient(id) {
    this.PatientsService.unarchivePatient(id).subscribe(
      (res: any) => {
        this.toast.success({
          detail: "succès",
          summary: "Patient Unarchiver avec succès!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      },
      (err: any) => {
        this.toast.error({
          detail: "échec",
          summary: "Impossible de Unarchiver Cette Patient!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      }
    );
  }
}
