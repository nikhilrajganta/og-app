import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemoverviewComponent } from './itemoverview/itemoverview.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { PnfComponent } from './pnf/pnf.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  { path: 'items', component: DashboardComponent },
  { path: 'overview/:id', component: ItemoverviewComponent },
  { path: 'edit/:id', component: EditItemComponent },
  { path: 'add', component: AddItemComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '**',
    component: PnfComponent,
  },
];
