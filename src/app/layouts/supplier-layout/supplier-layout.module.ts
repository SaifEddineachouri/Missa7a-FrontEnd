import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { SupplierLayoutRoutes } from './supplier-layout.routing';

import { SupplierDashboardComponent } from '../../pages/supplier-interface/supplier-dashboard/supplier-dashboard.component';
import { UserProfileComponent } from './../../pages/user-profile/supplier/user-profile/user-profile.component';
import { UpdatePasswordComponent } from './../../pages/user-profile/supplier/update-password/update-password.component';
import { CategoryComponent } from "src/app/pages/supplier-interface/inventory/category/category.component";
import { CreateCategoryComponent } from "src/app/pages/supplier-interface/inventory/category/create-category/create-category.component";
import { CreateProductComponent } from "src/app/pages/supplier-interface/inventory/product/create-product/create-product.component";
import { CreateStockComponent } from "src/app/pages/supplier-interface/inventory/stock/create-stock/create-stock.component";
import { DeleteProductComponent } from "src/app/pages/supplier-interface/inventory/product/delete-product/delete-product.component";
import { DeleteCategoryComponent } from "src/app/pages/supplier-interface/inventory/category/delete-category/delete-category.component";
import { DeleteStockComponent } from "src/app/pages/supplier-interface/inventory/stock/delete-stock/delete-stock.component";
import { EditCategoryComponent } from "src/app/pages/supplier-interface/inventory/category/edit-category/edit-category.component";
import { EditProductComponent } from "src/app/pages/supplier-interface/inventory/product/edit-product/edit-product.component";
import { EditStockComponent } from "src/app/pages/supplier-interface/inventory/stock/edit-stock/edit-stock.component";
import { StockComponent } from "src/app/pages/supplier-interface/inventory/stock/stock.component";
import { InventoryComponent } from "src/app/pages/supplier-interface/inventory/inventory.component";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectFilterModule } from 'mat-select-filter';


// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SupplierLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatSelectFilterModule
  ],
  declarations: [
    SupplierDashboardComponent,
    InventoryComponent,
    CategoryComponent,
    StockComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    CreateProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    CreateStockComponent,
    EditStockComponent,
    DeleteStockComponent,
    UserProfileComponent,
    UpdatePasswordComponent
  ],
  providers: [
  ],
})
export class SupplierLayoutModule {}
