import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  Prenom: "";
  Nom: "";
  Cin: "";
  avatar: "";
  email: "";
  role: "";

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private AuthService: AuthService,
    private toast: NgToastService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);

    this.getMe();
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Tableau de bord";
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
      this.Prenom = res.data.Prenom;
      this.Nom = res.data.Nom;
      this.Cin = res.data.cin;
      this.avatar = res.data.avatar;
      this.email = res.data.email;
    });
  }
}
