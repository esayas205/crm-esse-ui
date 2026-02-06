import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./features/accounts/components/accounts-list/accounts-list.component').then(m => m.AccountsListComponent)
      },
      {
        path: 'accounts/create',
        loadComponent: () => import('./features/accounts/components/account-form/account-form.component').then(m => m.AccountFormComponent)
      },
      {
        path: 'accounts/:id',
        loadComponent: () => import('./features/accounts/components/account-detail/account-detail.component').then(m => m.AccountDetailComponent)
      },
      {
        path: 'accounts/:id/edit',
        loadComponent: () => import('./features/accounts/components/account-form/account-form.component').then(m => m.AccountFormComponent)
      },
      {
        path: 'leads',
        loadComponent: () => import('./features/leads/components/leads-list/leads-list.component').then(m => m.LeadsListComponent)
      },
      {
        path: 'leads/create',
        loadComponent: () => import('./features/leads/components/lead-form/lead-form.component').then(m => m.LeadFormComponent)
      },
      {
        path: 'leads/:id',
        loadComponent: () => import('./features/leads/components/lead-detail/lead-detail.component').then(m => m.LeadDetailComponent)
      },
      {
        path: 'leads/:id/edit',
        loadComponent: () => import('./features/leads/components/lead-form/lead-form.component').then(m => m.LeadFormComponent)
      },
      {
        path: 'opportunities',
        loadComponent: () => import('./features/opportunities/components/opportunities-list/opportunities-list.component').then(m => m.OpportunitiesListComponent)
      },
      {
        path: 'contacts',
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'activities',
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/components/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  }
];
