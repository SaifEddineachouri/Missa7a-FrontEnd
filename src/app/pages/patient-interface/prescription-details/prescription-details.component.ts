import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicationService } from './../../../services/medication.service';
import { ConsultationService } from './../../../services/consultation.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-prescription-details',
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.scss']
})
export class PrescriptionDetailsComponent implements OnInit {

   NomDocteur : string ;
  PrenomDocteur : string ;
  NomPatient : string ;
  PrenomPatient : string ;
  DatePresciption : Date ;
  Medicaments : any ;
  constructor(private route : ActivatedRoute,private ConsultationService:ConsultationService,private MedicationService :MedicationService ) { }

  ngOnInit(): void {
    let id =  this.route.snapshot.params.id;
    this.ConsultationService.getSingleConsultation(id).subscribe((res)=>{
      console.log(res.data);
      this.NomDocteur = res.data.prescription.NomDocteur;
      this.PrenomDocteur = res.data.prescription.PrenomDocteur;
      this.NomPatient = res.data.prescription.NomPatient;
      this.PrenomPatient = res.data.prescription.PrenomPatient;
      this.DatePresciption = res.data.prescription.createAt;
      this.MedicationService.getPrescriptionMedications(res.data.prescription._id).subscribe((res:any)=>{
        console.log(res);
        this.Medicaments = res.data ;
      })
    })

  }

  download(){
    var element = document.getElementById('Ordonnance');
    html2canvas(element).then((canvas)=>{
      var imageData = canvas.toDataURL('image/png');
      var doc = new jspdf('p','mm','a4');
      var imageHeight = canvas.height * 208 / canvas.width ;
      doc.addImage(imageData,0,0,208,imageHeight);
      doc.save(`Ordonnance.pdf`);
    })
  }
}