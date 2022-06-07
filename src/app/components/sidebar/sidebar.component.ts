import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { AuthService } from "./../../services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/tableau-de-bord",
    title: "Tableau de bord",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/calendrier",
    title: "Calendrier",
    icon: "ni-calendar-grid-58 text-red",
    class: "",
  },
  {
    path: "/consultations",
    title: "Consultations",
    icon: "ni ni-ambulance text-orange",
    class: "",
  },
  {
    path: "/patients",
    title: "Patients",
    icon: "fas fa-procedures text-blue",
    class: "",
  },
  {
    path: "/archive-patients",
    title: "Archive Patients",
    icon: "ni ni-badge text-brown",
    class: "",
  },
  {
    path: "/dossiers-medicaux",
    title: "Dossiers médicaux",
    icon: "ni ni-folder-17 text-yellow",
    class: "",
  },
  {
    path: "/archive-dossiers",
    title: "Archive Dossiers",
    icon: "fas fa-archive text-brown",
    class: "",
  },
  {
    path: "/compte-financier",
    title: "Banque | Espèces",
    icon: "ni ni-money-coins text-green",
    class: "",
  },
  {
    path: "/stock/produit",
    title: "Stock",
    icon: "ni ni-box-2 text-purple",
    class: "",
  },
  {
    path : "/utilisateurs",
    title : "Utilisateurs",
    icon : "fas fa-users text-indigo",
    class : ""
  },
  {
    path: "/profil",
    title: "Paramètres du compte",
    icon: "fas fa-cogs text-cyan",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  Prenom: "";
  avatar: "";

  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private toast: NgToastService,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.getMe();
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.AuthService.Logout().subscribe((res: any) => {
      if (res.success == true) {
        this.router.navigateByUrl("connexion");
        this.toast.success({
          detail: "succès",
          summary: "Vous êtes maintenant déconnecté!",
          duration: 3000,
        });
      }
    });
  }

  getMe() {
    this.AuthService.getLoggedInUser().subscribe((res: any) => {
      console.log(res.data);
      this.Prenom = res.data.Prenom;
      this.avatar = res.data.avatar;
    });
  }
}
