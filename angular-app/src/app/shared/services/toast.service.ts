import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastIdCounter = 0;
  toasts = signal<Toast[]>([]);

  showSuccess(message: string) {
    this.addToast(message, 'success');
  }

  showError(message: string) {
    this.addToast(message, 'error');
  }

  showInfo(message: string) {
    this.addToast(message, 'info');
  }

  private addToast(message: string, type: 'success' | 'error' | 'info') {
    const id = this.toastIdCounter++;
    const toast: Toast = { id, message, type };
    this.toasts.update(toasts => [...toasts, toast]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      this.removeToast(id);
    }, 5000);
  }

  removeToast(id: number) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
}
