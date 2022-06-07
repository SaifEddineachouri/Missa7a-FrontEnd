import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MedicalFolderService } from "../../../../services/medical-folder.service";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-archived-folders",
  templateUrl: "./archived-folders.component.html",
  styleUrls: ["./archived-folders.component.scss"],
})
export class ArchivedFoldersComponent implements OnInit {
  displayedColumns: string[] = [
    "Nom",
    "Prenom",
    "cin",
    "Taille",
    "Poids",
    "Action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  MedicalFolderObject: any = [];
  MedicalFolders: any = [];
  data: any;
  result: string = "";

  constructor(
    private router: Router,
    private MedicalFolderService: MedicalFolderService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.ReadArchivedMedicalFolders();
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

  ReadArchivedMedicalFolders() {
    this.MedicalFolderService.getArchivedMedicalFolders().subscribe((data) => {
      this.MedicalFolderObject.push(data);
      this.MedicalFolders = this.MedicalFolderObject[0].data;
      console.log(this.MedicalFolders);
      this.dataSource = new MatTableDataSource(this.MedicalFolders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  UnarchiveMedicalFolder(id) {
    this.MedicalFolderService.unarchiveMedicalFolder(id).subscribe(
      (res: any) => {
        this.toast.success({
          detail: "succès",
          summary: "Dossier Unarchiver avec succès!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      },
      (err: any) => {
        this.toast.error({
          detail: "échec",
          summary: "Impossible de Unarchiver Cette Dossier!",
          duration: 3000,
        });
        this.reloadCurrentRoute();
      }
    );
  }
}
