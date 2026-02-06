import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastComponent } from '../shared/components/toast.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive, ToastComponent],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>CRM</h2>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <span>Dashboard</span>
          </a>
          <a routerLink="/accounts" routerLinkActive="active" class="nav-item">
            <span>Accounts</span>
          </a>
          <a routerLink="/contacts" routerLinkActive="active" class="nav-item">
            <span>Contacts</span>
          </a>
          <a routerLink="/leads" routerLinkActive="active" class="nav-item">
            <span>Leads</span>
          </a>
          <a routerLink="/opportunities" routerLinkActive="active" class="nav-item">
            <span>Opportunities</span>
          </a>
          <a routerLink="/activities" routerLinkActive="active" class="nav-item">
            <span>Activities</span>
          </a>
          <a routerLink="/settings" routerLinkActive="active" class="nav-item">
            <span>Settings</span>
          </a>
        </nav>
      </aside>
      <main class="main-content">
        <router-outlet />
      </main>
      <app-toast />
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .sidebar {
      width: 250px;
      background: #1e293b;
      color: white;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }

    .sidebar-header {
      padding: 24px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: white;
    }

    .sidebar-nav {
      flex: 1;
      padding: 16px 0;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #cbd5e1;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: white;
    }

    .nav-item.active {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      border-left-color: #3b82f6;
    }

    .nav-item span {
      font-size: 14px;
      font-weight: 500;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background: #f8fafc;
    }
  `]
})
export class MainLayoutComponent {}
