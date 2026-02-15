import { Routes } from '@angular/router';
import {AppLayoutComponent} from './shared/layout/app-layout/app-layout.component';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'accounts',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/accounts/components/accounts-list/accounts-list.component').then(m => m.AccountsListComponent)
      },
      {
        path: 'accounts/create',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/accounts/components/account-form/account-form.component').then(m => m.AccountFormComponent)
      },
      {
        path: 'accounts/:id',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/accounts/components/account-detail/account-detail.component').then(m => m.AccountDetailComponent)
      },
      {
        path: 'accounts/:id/edit',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/accounts/components/account-form/account-form.component').then(m => m.AccountFormComponent)
      },
      {
        path: 'leads',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/leads/components/leads-list/leads-list.component').then(m => m.LeadsListComponent)
      },
      {
        path: 'leads/create',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/leads/components/lead-form/lead-form.component').then(m => m.LeadFormComponent)
      },
      {
        path: 'leads/:id',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/leads/components/lead-detail/lead-detail.component').then(m => m.LeadDetailComponent)
      },
      {
        path: 'leads/:id/edit',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/leads/components/lead-form/lead-form.component').then(m => m.LeadFormComponent)
      },
      {
        path: 'opportunities',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/opportunities/components/opportunities-list/opportunities-list.component').then(m => m.OpportunitiesListComponent)
      },
      {
        path: 'contacts',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'activities',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/settings/components/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./features/auth/components/sign-in/sign-in.component').then(m => m.SignInComponent)
  }
];
