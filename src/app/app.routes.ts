import { Routes } from '@angular/router';
import { SystemLoginComponent } from './Components/system-login/system-login.component';

export const routes: Routes = [
  { path: 'system-admin', loadChildren: () => import('./Modules/system-admin/system-admin.module').then(m => m.SystemAdminModule) },
  { path: 'house-farmer', loadChildren: () => import('./Modules/house-farmer/house-farmer.module').then(m => m.HouseFarmerModule) },
  { path: 'house-owner', loadChildren: () => import('./Modules/house-owner/house-owner.module').then(m => m.HouseOwnerModule) },
  { path: 'login', component: SystemLoginComponent}, // Default route
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
];
