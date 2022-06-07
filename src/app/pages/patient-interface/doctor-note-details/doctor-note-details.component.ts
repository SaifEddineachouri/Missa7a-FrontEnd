import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultationService } from './../../../services/consultation.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-doctor-note-details',
  templateUrl: './doctor-note-details.component.html',
  styleUrls: ['./doctor-note-details.component.scss']
})
export class DoctorNoteDetailsComponent implements OnInit {

  certificat : any ;
  prescription : any ;
  constructor(private route : ActivatedRoute,private ConsultationService:ConsultationService) { }

  ngOnInit(): void {
  let id =  this.route.snapshot.params.id;
    this.ConsultationService.getSingleConsultation(id).subscribe((res)=>{
      this.prescription = res.data.prescription;
      this.certificat = res.data.certificate;
      console.log(res.data.certificate);
    })
  }

  download(){
    var element = document.getElementById('Certif');
    html2canvas(element).then((canvas)=>{
      var imageData = canvas.toDataURL('image/png');
      var doc = new jspdf('p','mm','a4');
      var imageHeight = canvas.height * 208 / canvas.width ;
      doc.addImage(imageData,0,0,208,imageHeight);
      doc.save(`Certificat.pdf`);
    })
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('Certif').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          footer {
  font-size: 9px;
  color: #f00;
  text-align: center;
}

@page {
  size: A4;
  margin: 11mm 17mm 17mm 17mm;
}

@media print {
  footer {
    position: fixed;
    font-size: 150px;
    bottom: 0;
  }
}
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}

