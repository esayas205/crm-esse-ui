import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OpportunitiesService } from '../../services/opportunities.service';
import { Opportunity } from '../../models/opportunity.model';
import { PaginationComponent } from '../../../../shared/components/pagination.component';

@Component({
  selector: 'app-opportunities-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './opportunities-list.component.html',
  styleUrls: ['./opportunities-list.component.scss']
})
export class OpportunitiesListComponent implements OnInit {
  private opportunitiesService = inject(OpportunitiesService);
  private router = inject(Router);

  stageControl = new FormControl('');
  accountIdControl = new FormControl('');
  startDateControl = new FormControl('');
  endDateControl = new FormControl('');
  minAmountControl = new FormControl('');
  maxAmountControl = new FormControl('');

  opportunities = signal<Opportunity[]>([]);
  loading = signal(false);
  error = signal('');
  currentPage = signal(0);
  pageSize = signal(20);
  totalElements = signal(0);

  ngOnInit() {
    [this.stageControl, this.accountIdControl, this.startDateControl, this.endDateControl, this.minAmountControl, this.maxAmountControl].forEach(control => {
      control.valueChanges.subscribe(() => {
        this.currentPage.set(0);
        this.loadOpportunities();
      });
    });
    this.loadOpportunities();
  }

  loadOpportunities() {
    this.loading.set(true);
    this.error.set('');
    this.opportunitiesService.getOpportunities(
      this.stageControl.value || '',
      this.accountIdControl.value || '',
      this.startDateControl.value || '',
      this.endDateControl.value || '',
      this.minAmountControl.value || '',
      this.maxAmountControl.value || '',
      this.currentPage(),
      this.pageSize()
    ).subscribe({
      next: (response) => {
        this.opportunities.set(response.content);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load opportunities');
        this.loading.set(false);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadOpportunities();
  }

  onSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
    this.loadOpportunities();
  }

  viewOpportunity(id: number) {
    this.router.navigate(['/opportunities', id]);
  }

  createOpportunity() {
    this.router.navigate(['/opportunities/create']);
  }
}
