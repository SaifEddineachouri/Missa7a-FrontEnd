import { AppointmentRequestService } from './../../../../services/appointment-request.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';
import { ConfirmDialogModel, DeleteAppointmentRequestComponent } from '../delete-appointment-request/delete-appointment-request.component';
import { ConfirmAppointmentRequestComponent } from '../confirm-appointment-request/confirm-appointment-request.component';
import { UnconfirmAppointmentRequestComponent } from '../unconfirm-appointment-request/unconfirm-appointment-request.component';
import { EditAppointmentRequestComponent } from '../edit-appointment-request/edit-appointment-request.component';

@Component({
  selector: 'app-list-all-apointments-requests',
  templateUrl: './list-all-apointments-requests.component.html',
  styleUrls: ['./list-all-apointments-requests.component.scss']
})
export class ListAllApointmentsRequestsComponent implements OnInit {

    displayedColumns: string[] = [
    "Nom",
    "Prenom",
    "Cin",
    "numeroTel",
    "StartTime",
    "Status",
    "Action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppointmentRequestObject: any = [];
  AppointmentRequest: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private PatientsService: PatientService,
    private AppointmentRequestService :AppointmentRequestService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.ReadAllAppointmentRequests();
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


  ReadAllAppointmentRequests() {
    this.AppointmentRequestService.getAppointmentsRequests().subscribe((data) => {
      console.log(data);
      this.AppointmentRequestObject.push(data);
      this.AppointmentRequest = this.AppointmentRequestObject[0].data;
      this.dataSource = new MatTableDataSource(this.AppointmentRequest);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  ConfirmAppointmentRequest(id){
    const message = `Êtes-vous sûr de vouloir Confirmer cette Demande?`;

    const dialogData = new ConfirmDialogModel("Confirmer cette Demande", message);

    const dialogRef = this.dialog.open(ConfirmAppointmentRequestComponent, {
      width: "40%",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.AppointmentRequestService.confirmAppointmentRequest(id).subscribe((res) => {
        this.toast.success({
          detail: "succès",
          summary: "Demande Confimer avec succès!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
        });
      } else {
        this.toast.error({
          detail: "échec",
          summary: "échec de confirmation!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      }
    });
  }

  UnconfirmAppointmentRequest(id){
    const message = `Êtes-vous sûr de vouloir rejeter cette Demande?`;

    const dialogData = new ConfirmDialogModel("Rejeter cette Demande", message);

    const dialogRef = this.dialog.open(UnconfirmAppointmentRequestComponent, {
      width: "40%",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.AppointmentRequestService.unConfirmAppointmentRequest(id).subscribe((res) => {
        this.toast.success({
          detail: "succès",
          summary: "Demande Rejeter avec succès!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
        });
      } else {
        this.toast.error({
          detail: "échec",
          summary: "échec de Rejection!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      }
    });
  }

  EditAppointmentRequest(row) {
    this.dialog.open(EditAppointmentRequestComponent, {
      width: "40%",
      data: row,
    });
  }


  DeleteAppointmentRequest(id){
    const message = `Êtes-vous sûr de vouloir supprimer cette Demande?`;

    const dialogData = new ConfirmDialogModel("Supprimer cette Demande", message);

    const dialogRef = this.dialog.open(DeleteAppointmentRequestComponent, {
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
