import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type">
          <span>{{ toast.message }}</span>
          <button (click)="toastService.removeToast(toast.id)" class="toast-close">&times;</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .toast {
      min-width: 300px;
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-success {
      background-color: #4caf50;
      color: white;
    }

    .toast-error {
      background-color: #f44336;
      color: white;
    }

    .toast-info {
      background-color: #2196f3;
      color: white;
    }

    .toast-close {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      margin-left: 16px;
      line-height: 1;
    }

    .toast-close:hover {
      opacity: 0.8;
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
