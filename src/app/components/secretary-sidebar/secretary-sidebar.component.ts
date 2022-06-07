import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from "./../../services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/secretaire/tableau-de-bord",
    title: "Tableau de bord",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/secretaire/calendrier",
    title: "Calendrier",
    icon: "ni-calendar-grid-58 text-red",
    class: "",
  },
  {
    path: "/secretaire/consultations",
    title: "Consultations",
    icon: "ni ni-ambulance text-orange",
    class: "",
  },
  {
    path: "/secretaire/patients",
    title: "Patients",
    icon: "fas fa-procedures text-blue",
    class: "",
  },
  {
    path: "/secretaire/archive-patients",
    title: "Archive Patients",
    icon: "ni ni-badge text-brown",
    class: "",
  },
  {
    path: "/secretaire/dossiers-medicaux",
    title: "Dossiers médicaux",
    icon: "ni ni-folder-17 text-yellow",
    class: "",
  },
  {
    path: "/secretaire/archive-dossiers",
    title: "Archive Dossiers",
    icon: "fas fa-archive text-brown",
    class: "",
  },
  {
    path: "/secretaire/rendez-vous/demandes/aujourdhui",
    title: "Demandes rendez-vous",
    icon: "fas fa-clipboard-list text-purple",
    class: "",
  },
  {
    path: "/secretaire/profil",
    title: "Paramètres du compte",
    icon: "fas fa-cogs text-cyan",
    class: "",
  }
];

@Component({
  selector: 'app-secretary-sidebar',
  templateUrl: './secretary-sidebar.component.html',
  styleUrls: ['./secretary-sidebar.component.scss']
})

export class SecretarySidebarComponent implements OnInit {

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
