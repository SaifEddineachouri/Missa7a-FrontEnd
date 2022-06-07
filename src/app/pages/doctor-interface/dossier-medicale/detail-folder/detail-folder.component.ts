import { ConsultationService } from './../../../../services/consultation.service';
import { MedicalFolderService } from "./../../../../services/medical-folder.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-detail-folder",
  templateUrl: "./detail-folder.component.html",
  styleUrls: ["./detail-folder.component.scss"],
})
export class DetailFolderComponent implements OnInit {
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
   let id =  this.route.snapshot.params.id;
   this.MedicalFolderService.getMedicalFolder(id).subscribe((res:any)=>{
    this.Nom = res.data.patient.Nom;
    this.Prenom = res.data.patient.Prenom;
    this.Cin = res.data.patient.cin;
    this.NumeroTel = res.data.patient.numeroTel;
    this.TaillePatient = res.data.TaillePatient;
    this.PerimetrePatient = res.data.PerimetrePatient;
    this.PoidsPatient = res.data.PoidsPatient;
    this.Antecedents = res.data.Antecedents;
    this.AllergiesMedicamenteuses = res.data.AllergiesMedicamenteuses;
    this.MaladiesHereditaires = res.data.MaladiesHereditaires;
    this.AllergiesAlimentaires = res.data.AllergiesAlimentaires;
    this.ListeFichier =  res.data.files ;
    this.getMedicalFolderConsultations(id);
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
    this.router.navigate([`consultations/${id}/details`]);
  }
}
