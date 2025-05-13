import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'system-admin',
    loadChildren: () =>
      import('./Modules/system-admin/system-admin.module').then(
        (m) => m.SystemAdminModule
      ),
  },
  {
    path: 'house-farmer',
    loadChildren: () =>
      import('./Modules/house-farmer/house-farmer.module').then(
        (m) => m.HouseFarmerModule
      ),
  },
  {
    path: 'house-owner',
    loadChildren: () =>
      import('./Modules/house-owner/house-owner.module').then(
        (m) => m.HouseOwnerModule
      ),
      title: 'Green Sync - House Owner',
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  }, // Default route
  {
    path: 'login',
    loadComponent : () =>
      import('./Components/system-login/system-login.component')
      .then( c => c.SystemLoginComponent),
    title: 'Green Sync - Login',
  },
];
