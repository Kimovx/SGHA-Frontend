import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./Components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Green Sync - Dashboard'
  },
  {
    path: 'control-panel',
    loadComponent: () => import('./Components/control-panel/control-panel.component').then(m => m.ControlPanelComponent),
    title: 'Green Sync - Control Panel'
  },
  {
    path: 'users',
    loadComponent: () => import('./Components/users/users.component').then(m => m.UsersComponent),
    title: 'Green Sync - Users'
  },
  {
    path: 'alerts',
    loadComponent: () => import('./Components/alerts/alerts.component').then(m => m.AlertsComponent),
    title: 'Green Sync - System Alerts'
  },
  {
    path: 'visuals',
    loadComponent: () => import('./Components/visuals/visuals.component').then(m => m.VisualsComponent),
    title: 'Green Sync - System Visuals'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseOwnerRoutingModule { }
