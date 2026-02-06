export interface Account {
  id?: number;
  accountName: string;
  industry?: string;
  website?: string;
  phone?: string;
  billingAddress?: string;
  shippingAddress?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AccountListResponse {
  content: Account[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  accountId?: number;
  isPrimaryContact?: boolean;
}

export interface Activity {
  id: number;
  type: string;
  subject: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  outcome?: string;
  leadId?: number;
  contactId?: number;
  accountId?: number;
  opportunityId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
