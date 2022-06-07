import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientSidebarComponent } from './patient-sidebar/patient-sidebar.component';
import { SecretarySidebarComponent } from './secretary-sidebar/secretary-sidebar.component';
import { SupplierSidebarComponent } from './supplier-sidebar/supplier-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PatientSidebarComponent,
    SecretarySidebarComponent,
    SupplierSidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PatientSidebarComponent,
    SecretarySidebarComponent,
    SupplierSidebarComponent
  ]
})
export class ComponentsModule { }
