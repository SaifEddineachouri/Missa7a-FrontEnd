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
    path: "/fournisseur/tableau-de-bord",
    title: "Tableau de bord",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/fournisseur/stock/produit",
    title: "Stock",
    icon: "ni ni-box-2 text-purple",
    class: "",
  },
  {
    path: "/fournisseur/profil",
    title: "Paramètres du compte",
    icon: "fas fa-cogs text-cyan",
    class: "",
  }
];

@Component({
  selector: 'app-supplier-sidebar',
  templateUrl: './supplier-sidebar.component.html',
  styleUrls: ['./supplier-sidebar.component.scss']
})
export class SupplierSidebarComponent implements OnInit {

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
