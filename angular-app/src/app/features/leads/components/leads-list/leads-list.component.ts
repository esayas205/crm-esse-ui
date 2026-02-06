import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LeadsService } from '../../services/leads.service';
import { Lead } from '../../models/lead.model';
import { PaginationComponent } from '../../../../shared/components/pagination.component';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss']
})
export class LeadsListComponent implements OnInit {
  private leadsService = inject(LeadsService);
  private router = inject(Router);

  searchControl = new FormControl('');
  statusControl = new FormControl('');
  sourceControl = new FormControl('');
  ownerControl = new FormControl('');

  leads = signal<Lead[]>([]);
  loading = signal(false);
  error = signal('');
  currentPage = signal(0);
  pageSize = signal(20);
  totalElements = signal(0);

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.currentPage.set(0);
        this.loadLeads();
      });

    this.statusControl.valueChanges.subscribe(() => {
      this.currentPage.set(0);
      this.loadLeads();
    });

    this.sourceControl.valueChanges.subscribe(() => {
      this.currentPage.set(0);
      this.loadLeads();
    });

    this.ownerControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.currentPage.set(0);
        this.loadLeads();
      });

    this.loadLeads();
  }

  loadLeads() {
    this.loading.set(true);
    this.error.set('');

    this.leadsService
      .getLeads(
        this.statusControl.value || '',
        this.sourceControl.value || '',
        this.searchControl.value || '',
        this.ownerControl.value || '',
        this.currentPage(),
        this.pageSize()
      )
      .subscribe({
        next: (response) => {
          this.leads.set(response.content);
          this.totalElements.set(response.totalElements);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load leads');
          this.loading.set(false);
        }
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadLeads();
  }

  onSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
    this.loadLeads();
  }

  viewLead(id: number) {
    this.router.navigate(['/leads', id]);
  }

  createLead() {
    this.router.navigate(['/leads/create']);
  }
}
