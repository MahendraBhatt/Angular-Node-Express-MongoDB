import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfListComponent } from './components/rf-list/rf-list.component';
import { AddRfComponent } from './components/add-rf/add-rf.component';

const routes: Routes = [
  { path: '', redirectTo: 'rf', pathMatch: 'full' },
  { path: 'rf', component: RfListComponent },
  { path: 'rf/:id', component: AddRfComponent },
  { path: 'add', component: AddRfComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
