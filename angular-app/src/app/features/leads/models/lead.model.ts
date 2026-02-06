export interface Lead {
  id?: number;
  company: string;
  contactName: string;
  email?: string;
  phone?: string;
  source?: string;
  status?: string;
  ownerUser?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadListResponse {
  content: Lead[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
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

export interface ConvertLeadResponse {
  accountId?: number;
  contactId?: number;
  opportunityId?: number;
}
