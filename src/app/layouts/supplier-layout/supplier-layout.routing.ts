import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./../../auth.guard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SupplierDashboardComponent } from '../../pages/supplier-interface/supplier-dashboard/supplier-dashboard.component';
import { UserProfileComponent } from "../../pages/user-profile/supplier/user-profile/user-profile.component";
import { UpdatePasswordComponent } from "../../pages/user-profile/supplier/update-password/update-password.component";
import { InventoryComponent } from "src/app/pages/supplier-interface/inventory/inventory.component";
import { CategoryComponent } from "src/app/pages/supplier-interface/inventory/category/category.component";
import { StockComponent } from "src/app/pages/supplier-interface/inventory/stock/stock.component";

export const SupplierLayoutRoutes: Routes = [
  {
    path: "fournisseur/tableau-de-bord",
    component: SupplierDashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "fournisseur/stock/produit", component: InventoryComponent },
  { path: "fournisseur/stock/categorie", component : CategoryComponent},
  { path: "fournisseur/stock" , component :StockComponent},
  { path: "fournisseur/profil", component: UserProfileComponent },
  { path: "fournisseur/profil/mot-de-passe" , component : UpdatePasswordComponent},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(SupplierLayoutRoutes),
  ],
  exports: [],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
