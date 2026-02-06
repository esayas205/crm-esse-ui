import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AccountsService } from '../../services/accounts.service';
import { Account } from '../../models/account.model';
import { PaginationComponent } from '../../../../shared/components/pagination.component';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  private accountsService = inject(AccountsService);
  private router = inject(Router);

  searchControl = new FormControl('');
  accounts = signal<Account[]>([]);
  loading = signal(false);
  error = signal('');
  currentPage = signal(0);
  pageSize = signal(20);
  totalElements = signal(0);
  sortField = signal('accountName');
  sortDirection = signal<'asc' | 'desc'>('asc');

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.currentPage.set(0);
        this.loadAccounts();
      });

    this.loadAccounts();
  }

  loadAccounts() {
    this.loading.set(true);
    this.error.set('');

    const sort = `${this.sortField()},${this.sortDirection()}`;

    this.accountsService
      .getAccounts(this.searchControl.value || '', this.currentPage(), this.pageSize(), sort)
      .subscribe({
        next: (response) => {
          this.accounts.set(response.content);
          this.totalElements.set(response.totalElements);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load accounts');
          this.loading.set(false);
        }
      });
  }

  toggleSort(field: string) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
    this.loadAccounts();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadAccounts();
  }

  onSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
    this.loadAccounts();
  }

  viewAccount(id: number) {
    this.router.navigate(['/accounts', id]);
  }

  createAccount() {
    this.router.navigate(['/accounts/create']);
  }
}
