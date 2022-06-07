import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DemandAppointmentComponent } from "../demand-appointment/demand-appointment.component";
import { AppointmentRequestService } from "./../../../services/appointment-request.service";
import { PatientService } from "src/app/services/patient.service";
import { AuthService } from "./../../../services/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { EditDemandComponent } from "../demand-appointment/edit-demand/edit-demand.component";
import { ConfirmDialogModel, DeleteDemandComponent } from "../demand-appointment/delete-demand/delete-demand.component";
import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "app-patient-dashboard",
  templateUrl: "./patient-dashboard.component.html",
  styleUrls: ["./patient-dashboard.component.scss"],
})
export class PatientDashboardComponent implements OnInit {
  result: string = "";

  displayedColumns: string[] = [
    "subject",
    "StartTime",
    "createAt",
    "status",
    "Action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  PatientAppointmentRequestsObject: any = [];
  PatientAppointmentRequests: any = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private toast: NgToastService,
    private AuthService: AuthService,
    private PatientService: PatientService,
    private AppointmentRequestService: AppointmentRequestService
  ) {}

  ngOnInit(): void {
   this.AuthService.getLoggedInUser().subscribe((res: any) => {
      this.PatientService.getPatientWithCin(res.data.cin).subscribe(
        (res: any) => {
          this.getPatientAppointmentRequests(res.data[0]._id)
        }
      );
    });
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

  getPatientAppointmentRequests(id) {
    return this.AppointmentRequestService.getPatientAppointmentsRequests(
      id
    ).subscribe((res: any) => {
      this.PatientAppointmentRequestsObject.push(res);
      this.PatientAppointmentRequests = this.PatientAppointmentRequestsObject[0].data;
      this.dataSource = new MatTableDataSource(this.PatientAppointmentRequests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  openDialog() {
    this.dialog.open(DemandAppointmentComponent, {
      width: "40%",
    });
  }

   EditAppointmentRequest(row) {
    this.dialog.open(EditDemandComponent, {
      width: "40%",
      data: row,
    });
  }

  DeleteAppointmentRequest(id){
    const message = `Êtes-vous sûr de vouloir supprimer cette demande?`;

    const dialogData = new ConfirmDialogModel("Supprimer cette demande", message);

    const dialogRef = this.dialog.open(DeleteDemandComponent, {
      width: "40%",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.AppointmentRequestService.deleteAppointmentRequest(id).subscribe((res) => {
        this.toast.success({
          detail: "succès",
          summary: "Demande Supprimer avec succès!",
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
