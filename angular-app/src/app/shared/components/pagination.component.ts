import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination">
      <div class="pagination-info">
        Showing {{ startItem() }} to {{ endItem() }} of {{ totalElements() }} items
      </div>
      <div class="pagination-controls">
        <button
          (click)="onPageChange(currentPage() - 1)"
          [disabled]="currentPage() === 0"
          class="pagination-btn">
          Previous
        </button>

        @for (page of visiblePages(); track page) {
          <button
            (click)="onPageChange(page)"
            [class.active]="page === currentPage()"
            class="pagination-btn">
            {{ page + 1 }}
          </button>
        }

        <button
          (click)="onPageChange(currentPage() + 1)"
          [disabled]="currentPage() >= totalPages() - 1"
          class="pagination-btn">
          Next
        </button>
      </div>
      <div class="pagination-size">
        <label>
          Items per page:
          <select [value]="pageSize()" (change)="onSizeChange($event)">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-top: 1px solid #e0e0e0;
      flex-wrap: wrap;
      gap: 16px;
    }

    .pagination-info {
      color: #666;
      font-size: 14px;
    }

    .pagination-controls {
      display: flex;
      gap: 4px;
    }

    .pagination-btn {
      padding: 8px 12px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
    }

    .pagination-btn:hover:not(:disabled) {
      background: #f5f5f5;
    }

    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-btn.active {
      background: #1976d2;
      color: white;
      border-color: #1976d2;
    }

    .pagination-size label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666;
    }

    .pagination-size select {
      padding: 6px 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
  `]
})
export class PaginationComponent {
  currentPage = input.required<number>();
  pageSize = input.required<number>();
  totalElements = input.required<number>();

  pageChange = output<number>();
  sizeChange = output<number>();

  totalPages() {
    return Math.ceil(this.totalElements() / this.pageSize());
  }

  startItem() {
    return this.totalElements() === 0 ? 0 : this.currentPage() * this.pageSize() + 1;
  }

  endItem() {
    const end = (this.currentPage() + 1) * this.pageSize();
    return Math.min(end, this.totalElements());
  }

  visiblePages() {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    let start = Math.max(0, current - 2);
    let end = Math.min(total - 1, current + 2);

    if (end - start < 4) {
      if (start === 0) {
        end = Math.min(total - 1, 4);
      } else if (end === total - 1) {
        start = Math.max(0, total - 5);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  onSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sizeChange.emit(Number(select.value));
  }
}
