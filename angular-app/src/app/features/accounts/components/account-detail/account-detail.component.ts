import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { Account, Contact, Activity } from '../../models/account.model';
import { PaginationComponent } from '../../../../shared/components/pagination.component';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  private accountsService = inject(AccountsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);

  account = signal<Account | null>(null);
  loading = signal(false);
  error = signal('');
  activeTab = signal<'contacts' | 'activities'>('contacts');

  contacts = signal<Contact[]>([]);
  loadingContacts = signal(false);
  contactsPage = signal(0);
  contactsSize = signal(20);
  contactsTotal = signal(0);

  activities = signal<Activity[]>([]);
  loadingActivities = signal(false);
  activitiesPage = signal(0);
  activitiesSize = signal(20);
  activitiesTotal = signal(0);
  activityType = signal<string>('');
  activityCompleted = signal<boolean | undefined>(undefined);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadAccount(id);
      this.loadContacts(id);
      this.loadActivities(id);
    }
  }

  loadAccount(id: number) {
    this.loading.set(true);
    this.accountsService.getAccount(id).subscribe({
      next: (account) => {
        this.account.set(account);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load account');
        this.loading.set(false);
      }
    });
  }

  loadContacts(id: number) {
    this.loadingContacts.set(true);
    this.accountsService.getAccountContacts(id, this.contactsPage(), this.contactsSize()).subscribe({
      next: (response) => {
        this.contacts.set(response.content);
        this.contactsTotal.set(response.totalElements);
        this.loadingContacts.set(false);
      },
      error: () => {
        this.loadingContacts.set(false);
      }
    });
  }

  loadActivities(id: number) {
    this.loadingActivities.set(true);
    const type = this.activityType() || undefined;
    const completed = this.activityCompleted();

    this.accountsService.getAccountActivities(id, type, completed, this.activitiesPage(), this.activitiesSize()).subscribe({
      next: (response) => {
        this.activities.set(response.content);
        this.activitiesTotal.set(response.totalElements);
        this.loadingActivities.set(false);
      },
      error: () => {
        this.loadingActivities.set(false);
      }
    });
  }

  onContactsPageChange(page: number) {
    this.contactsPage.set(page);
    this.loadContacts(this.account()!.id!);
  }

  onContactsSizeChange(size: number) {
    this.contactsSize.set(size);
    this.contactsPage.set(0);
    this.loadContacts(this.account()!.id!);
  }

  onActivitiesPageChange(page: number) {
    this.activitiesPage.set(page);
    this.loadActivities(this.account()!.id!);
  }

  onActivitiesSizeChange(size: number) {
    this.activitiesSize.set(size);
    this.activitiesPage.set(0);
    this.loadActivities(this.account()!.id!);
  }

  onActivityTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.activityType.set(select.value);
    this.activitiesPage.set(0);
    this.loadActivities(this.account()!.id!);
  }

  onActivityCompletedChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.activityCompleted.set(select.value === '' ? undefined : select.value === 'true');
    this.activitiesPage.set(0);
    this.loadActivities(this.account()!.id!);
  }

  editAccount() {
    this.router.navigate(['/accounts', this.account()!.id, 'edit']);
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountsService.deleteAccount(this.account()!.id!).subscribe({
        next: () => {
          this.toastService.showSuccess('Account deleted successfully');
          this.router.navigate(['/accounts']);
        },
        error: () => {
          this.toastService.showError('Failed to delete account');
        }
      });
    }
  }
}
