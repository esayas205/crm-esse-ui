import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountsService = inject(AccountsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);

  accountForm: FormGroup;
  isEditMode = signal(false);
  loading = signal(false);
  submitting = signal(false);
  accountId: number | null = null;

  constructor() {
    this.accountForm = this.fb.group({
      accountName: ['', Validators.required],
      industry: [''],
      website: [''],
      phone: [''],
      billingAddress: [''],
      shippingAddress: [''],
      status: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'create') {
      this.accountId = Number(id);
      this.isEditMode.set(true);
      this.loadAccount(this.accountId);
    }
  }

  loadAccount(id: number) {
    this.loading.set(true);
    this.accountsService.getAccount(id).subscribe({
      next: (account) => {
        this.accountForm.patchValue(account);
        this.loading.set(false);
      },
      error: () => {
        this.toastService.showError('Failed to load account');
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const accountData = this.accountForm.value;

    const request = this.isEditMode()
      ? this.accountsService.updateAccount(this.accountId!, accountData)
      : this.accountsService.createAccount(accountData);

    request.subscribe({
      next: (account) => {
        this.toastService.showSuccess(
          this.isEditMode() ? 'Account updated successfully' : 'Account created successfully'
        );
        this.router.navigate(['/accounts', account.id]);
      },
      error: () => {
        this.toastService.showError(
          this.isEditMode() ? 'Failed to update account' : 'Failed to create account'
        );
        this.submitting.set(false);
      }
    });
  }

  onCancel() {
    if (this.isEditMode()) {
      this.router.navigate(['/accounts', this.accountId]);
    } else {
      this.router.navigate(['/accounts']);
    }
  }
}
