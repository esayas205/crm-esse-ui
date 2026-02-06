import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadsService } from '../../services/leads.service';
import { Lead, Activity } from '../../models/lead.model';
import { PaginationComponent } from '../../../../shared/components/pagination.component';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.scss']
})
export class LeadDetailComponent implements OnInit {
  private leadsService = inject(LeadsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);

  lead = signal<Lead | null>(null);
  loading = signal(false);
  error = signal('');

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
      this.loadLead(id);
      this.loadActivities(id);
    }
  }

  loadLead(id: number) {
    this.loading.set(true);
    this.leadsService.getLead(id).subscribe({
      next: (lead) => {
        this.lead.set(lead);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load lead');
        this.loading.set(false);
      }
    });
  }

  loadActivities(id: number) {
    this.loadingActivities.set(true);
    const type = this.activityType() || undefined;
    const completed = this.activityCompleted();

    this.leadsService.getLeadActivities(id, type, completed, this.activitiesPage(), this.activitiesSize()).subscribe({
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

  onActivitiesPageChange(page: number) {
    this.activitiesPage.set(page);
    this.loadActivities(this.lead()!.id!);
  }

  onActivitiesSizeChange(size: number) {
    this.activitiesSize.set(size);
    this.activitiesPage.set(0);
    this.loadActivities(this.lead()!.id!);
  }

  onActivityTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.activityType.set(select.value);
    this.activitiesPage.set(0);
    this.loadActivities(this.lead()!.id!);
  }

  onActivityCompletedChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.activityCompleted.set(select.value === '' ? undefined : select.value === 'true');
    this.activitiesPage.set(0);
    this.loadActivities(this.lead()!.id!);
  }

  convertLead() {
    if (confirm('Are you sure you want to convert this lead? This will create an Account, Contact, and optionally an Opportunity.')) {
      this.leadsService.convertLead(this.lead()!.id!).subscribe({
        next: (response) => {
          this.toastService.showSuccess('Lead converted successfully');
          if (response.accountId) {
            this.router.navigate(['/accounts', response.accountId]);
          } else {
            this.router.navigate(['/leads']);
          }
        },
        error: () => {
          this.toastService.showError('Failed to convert lead');
        }
      });
    }
  }

  editLead() {
    this.router.navigate(['/leads', this.lead()!.id, 'edit']);
  }

  deleteLead() {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.leadsService.deleteLead(this.lead()!.id!).subscribe({
        next: () => {
          this.toastService.showSuccess('Lead deleted successfully');
          this.router.navigate(['/leads']);
        },
        error: () => {
          this.toastService.showError('Failed to delete lead');
        }
      });
    }
  }
}
