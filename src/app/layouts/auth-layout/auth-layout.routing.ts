
import { Routes } from '@angular/router';


import { LoginComponent } from './../../pages/login/login.component';
import { RegisterComponent } from './../../pages/register/register.component';
import { ResetpasswordComponent } from './../../pages/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './../../pages/forgotpassword/forgotpassword.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'connexion',          component: LoginComponent },
    { path: 'inscription',       component: RegisterComponent },
    { path: 'resetpassword/:resetToken', component :ResetpasswordComponent },
    { path: 'forgotpassword', component : ForgotpasswordComponent}
];
