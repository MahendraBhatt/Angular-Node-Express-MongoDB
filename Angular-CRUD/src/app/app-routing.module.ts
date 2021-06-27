import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfListComponent } from './components/rf-list/rf-list.component';
import { AddRfComponent } from './components/add-rf/add-rf.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: RfListComponent },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'rf', canActivate: [AuthGuard], component: RfListComponent },
  { path: 'rf/:id', canActivate: [AuthGuard], component: AddRfComponent },
  { path: 'add', canActivate: [AuthGuard], component: AddRfComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
