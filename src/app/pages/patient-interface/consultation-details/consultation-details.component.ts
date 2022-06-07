import { MedicalActService } from './../../../services/medical-act.service';
import { PatientService } from './../../../services/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from './../../../services/consultation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.scss']
})
export class ConsultationDetailsComponent implements OnInit {

  displayedColumns: string[] = [
    "NomActe",
    "TarifActe",
    "createAt",
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
    private router: Router,
    private ConsultationService: ConsultationService,
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
    this.router.navigate([`patient/consultations/${id}/ordonnance`]);
  }

  showDoctorNote(){
    let id =  this.route.snapshot.params.id;
    this.ConsultationService.AddedConsultationId = id;
    this.router.navigate([`patient/consultations/${id}/certificat`]);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
