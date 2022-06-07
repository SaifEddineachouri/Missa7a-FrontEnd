import { CreateMedicalActComponent } from './../create-medical-act/create-medical-act.component';
import { MedicalActService } from './../../../../services/medical-act.service';
import { PatientService } from './../../../../services/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from './../../../../services/consultation.service';
import {CertificatMedicaleService } from './../../../../services/certificat-medicale.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogModel, DeleteMedicalActComponent } from '../delete-medical-act/delete-medical-act.component';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { EditMedicalActComponent } from '../edit-medical-act/edit-medical-act.component';
import { CreateNoteComponent } from '../create-note/create-note.component';

@Component({
  selector: 'app-details-consultation',
  templateUrl: './details-consultation.component.html',
  styleUrls: ['./details-consultation.component.scss']
})
export class DetailsConsultationComponent implements OnInit {

  displayedColumns: string[] = [
    "NomActe",
    "TarifActe",
    "createAt",
    "Action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MedicalActsObject: any = [];
  MedicalActs: any = [];
  data: any;
  result: string = "";
  count : number ;
  Nom : any ;
  Prenom : any ;
  DateConsul  : any ;
  TensionSystolique  : any ;
  TensionDiastolique  : any ;
  Temperature  : any ;
  Diagnostique  : any ;
  Motif  : any ;
  CommentConsul  : any ;
  FraisConsul  : any ;
  StatutPaiement  : any ;
  ActsList : any ;
  certificate: any;
  ordonnance : any;


  constructor(
    private route : ActivatedRoute,
    private dialog: MatDialog,
    private toast: NgToastService,
    private router: Router,
    private ConsultationService: ConsultationService,
    private CertificatMedicaleService : CertificatMedicaleService,
    private MedicalActService : MedicalActService,
    private PatientService : PatientService) { }

  ngOnInit(): void {
    this.getConsultationsDetails();
    this.ReadConsultationMedicalActs()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getConsultationsDetails(){
    let id =  this.route.snapshot.params.id;
    this.ConsultationService.getSingleConsultation(id).subscribe((res)=>{
      this.DateConsul = res.data.createAt;
      this.TensionSystolique = res.data.TensionSystolique;
      this.TensionDiastolique = res.data.TensionDiastolique;
      this.Temperature = res.data.Temperature;
      this.Diagnostique = res.data.DiagnoCons;
      this.Motif = res.data.Motif;
      this.CommentConsul = res.data.CommentaireCons;
      this.FraisConsul = res.data.sumTarif;
      this.StatutPaiement = res.data.paid;
      this.ActsList = res.data.medicalActs;
      this.certificate = res.data.certificate;
      this.ordonnance = res.data.prescription;
      this.getPatientDetails(res.data.dossier.patient);
    })
  }

  getPatientDetails(id){
    this.PatientService.getPatient(id).subscribe((res) =>{
      this.Nom = res.data.Nom;
      this.Prenom = res.data.Prenom;
    })
  }

  ReadConsultationMedicalActs() {
     let id =  this.route.snapshot.params.id;
    this.MedicalActService.getConsultationMedicalActs(id).subscribe((data) => {
      this.MedicalActsObject.push(data);
      this.count = data.count;
      this.MedicalActs = this.MedicalActsObject[0].data;
      this.dataSource = new MatTableDataSource(this.MedicalActs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  showPrescription(){
    let id =  this.route.snapshot.params.id;
    this.ConsultationService.AddedConsultationId = id;
    this.router.navigate([`consultations/${id}/ordonnance`]);
  }

  showDoctorNote(){
    let id =  this.route.snapshot.params.id;
    this.ConsultationService.AddedConsultationId = id;
    this.router.navigate([`consultations/${id}/certificat`]);
  }

  createDoctorNote() {
    let id =  this.route.snapshot.params.id;
    this.ConsultationService.AddedConsultationId = id;
    this.dialog.open(CreateNoteComponent, {
      width: "40%",
    });
  }

  createMedicalAct() {
    let id =  this.route.snapshot.params.id;
    this.ConsultationService.AddedConsultationId = id;
    this.dialog.open(CreateMedicalActComponent, {
      width: "40%",
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  EditMedicalActe(row) {
    this.dialog.open(EditMedicalActComponent, {
      width: "40%",
      data: row,
    });
  }

  DeleteMedicalAct(id) {
    const message = `Êtes-vous sûr de vouloir supprimer cette Acte ?`;

    const dialogData = new ConfirmDialogModel("Supprimer cette Acte", message);

    const dialogRef = this.dialog.open(DeleteMedicalActComponent, {
      width: "40%",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        this.MedicalActService.deleteMedicalAct(id).subscribe(
          (data) => {
        this.toast.success({
          detail: "succès",
          summary: "Acte Supprimer avec succès!",
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
