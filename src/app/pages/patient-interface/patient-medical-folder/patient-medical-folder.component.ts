import { PatientService } from './../../../services/patient.service';
import { AuthService } from './../../../services/auth.service';
import { ConsultationService } from './../../../services/consultation.service';
import { MedicalFolderService } from "./../../../services/medical-folder.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-patient-medical-folder',
  templateUrl: './patient-medical-folder.component.html',
  styleUrls: ['./patient-medical-folder.component.scss']
})

export class PatientMedicalFolderComponent implements OnInit {

   displayedColumns: string[] = [
    "Nom",
    "Prenom",
    "sumTarif",
    "paid",
    "createAt",
    "Action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  MedicalFolderConsultationsObject: any = [];
  MedicalFolderConsultations: any = [];

  Nom : String;
  Prenom : String;
  Cin : String;
  NumeroTel : String;
  TaillePatient : Number;
  PerimetrePatient : Number ;
  PoidsPatient : Number ;
  Antecedents : String;
  AllergiesMedicamenteuses : String;
  MaladiesHereditaires : String;
  AllergiesAlimentaires : String;
  ListeFichier : [] ;
  ListeConsultations : [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AuthService:AuthService,
    private PatientService:PatientService,
    private MedicalFolderService: MedicalFolderService,
    private ConsultationService : ConsultationService
  ) {}

  ngOnInit(): void {
    this.getMedicalFolder();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMedicalFolder() {
   this.AuthService.getLoggedInUser().subscribe((res:any)=>{
     this.Cin = res.data.cin ;
      this.PatientService.getPatientWithCin(res.data.cin).subscribe((res:any)=>{
      console.log(res);
      this.Nom = res.data[0].Nom;
      this.Prenom = res.data[0].Prenom;
      this.NumeroTel = res.data[0].numeroTel;
      this.TaillePatient = res.data[0].dossier.TaillePatient;
      this.PerimetrePatient = res.data[0].dossier.PerimetrePatient;
      this.PoidsPatient = res.data[0].dossier.PoidsPatient;
      this.Antecedents = res.data[0].dossier.Antecedents;
      this.AllergiesMedicamenteuses = res.data[0].dossier.AllergiesMedicamenteuses;
      this.MaladiesHereditaires = res.data[0].dossier.MaladiesHereditaires;
      this.AllergiesAlimentaires = res.data[0].dossier.AllergiesAlimentairesl;
      this.ListeFichier =  res.data[0].dossier.files ;
      let id = res.data[0].dossier.id;
      this.getMedicalFolderConsultations(id);
   })
   })
  }

  getMedicalFolderConsultations(id){
    this.ConsultationService.getMedicalFolderConsultations(id).subscribe((res:any)=>{
      this.MedicalFolderConsultationsObject.push(res);
      this.MedicalFolderConsultations = this.MedicalFolderConsultationsObject[0].data;
      this.dataSource = new MatTableDataSource(this.MedicalFolderConsultations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  detailConsultation(id){
    this.router.navigate([`patient/consultations/${id}/details`]);
  }

}
