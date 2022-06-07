import { ConsultationService } from "./../../../services/consultation.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PayConsultationComponent } from "./pay-consultation/pay-consultation.component";
import { NgToastService } from "ng-angular-popup";
import { EditConsultationComponent } from "./edit-consultation/edit-consultation.component";

@Component({
  selector: "app-consultations",
  templateUrl: "./consultations.component.html",
  styleUrls: ["./consultations.component.scss"],
})
export class ConsultationsComponent implements OnInit {
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

  TodayConsultationsObject: any = [];
  TodayConsultations: any = [];
  data: any;
  result: string = "";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private ConsultationService: ConsultationService,
    private toast: NgToastService,
  ) {}

  ngOnInit(): void {
    this.ReadTodayConsultations();
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

  ReadTodayConsultations() {
    this.ConsultationService.getTodayConsultations().subscribe((data) => {
      this.TodayConsultationsObject.push(data);
      this.TodayConsultations = this.TodayConsultationsObject[0].data;
      this.dataSource = new MatTableDataSource(this.TodayConsultations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  payConsultation(row){
    this.dialog.open(PayConsultationComponent, {
      width: "40%",
      data: row,
    });
  }

  EditConsultation(row) {
    this.dialog.open(EditConsultationComponent, {
      width: "40%",
      data: row,
    });
  }

  detailConsultation(id){
    this.router.navigate([`consultations/${id}/details`]);
  }
}
