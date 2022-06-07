import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./error.interceptor";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPrintModule } from 'ngx-print';
import { HttpRequestInterceptor } from "./http-request.interceptor";
import { NgToastModule } from "ng-angular-popup";
import { AppComponent } from "./app.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { SecretaryLayoutComponent } from './layouts/secretary-layout/secretary-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { SupplierLayoutComponent } from './layouts/supplier-layout/supplier-layout.component';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgToastModule,
    NgxPrintModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule

  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, SecretaryLayoutComponent, PatientLayoutComponent, SupplierLayoutComponent],
  providers: [
    // Http Interceptor(s) -  adds with Client Credentials
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true,
      },
       {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,
      },
    ],
    {provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
