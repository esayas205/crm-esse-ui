import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadsService } from '../../services/leads.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss']
})
export class LeadFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private leadsService = inject(LeadsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);

  leadForm: FormGroup;
  isEditMode = signal(false);
  loading = signal(false);
  submitting = signal(false);
  leadId: number | null = null;

  constructor() {
    this.leadForm = this.fb.group({
      company: ['', Validators.required],
      contactName: ['', Validators.required],
      email: [''],
      phone: [''],
      source: [''],
      status: [''],
      ownerUser: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'create') {
      this.leadId = Number(id);
      this.isEditMode.set(true);
      this.loadLead(this.leadId);
    }
  }

  loadLead(id: number) {
    this.loading.set(true);
    this.leadsService.getLead(id).subscribe({
      next: (lead) => {
        this.leadForm.patchValue(lead);
        this.loading.set(false);
      },
      error: () => {
        this.toastService.showError('Failed to load lead');
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const leadData = this.leadForm.value;

    const request = this.isEditMode()
      ? this.leadsService.updateLead(this.leadId!, leadData)
      : this.leadsService.createLead(leadData);

    request.subscribe({
      next: (lead) => {
        this.toastService.showSuccess(
          this.isEditMode() ? 'Lead updated successfully' : 'Lead created successfully'
        );
        this.router.navigate(['/leads', lead.id]);
      },
      error: () => {
        this.toastService.showError(
          this.isEditMode() ? 'Failed to update lead' : 'Failed to create lead'
        );
        this.submitting.set(false);
      }
    });
  }

  onCancel() {
    if (this.isEditMode()) {
      this.router.navigate(['/leads', this.leadId]);
    } else {
      this.router.navigate(['/leads']);
    }
  }
}
