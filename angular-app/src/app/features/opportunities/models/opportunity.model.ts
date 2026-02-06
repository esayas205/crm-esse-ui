export interface Opportunity {
  id?: number;
  name: string;
  stage?: string;
  amount?: number;
  closeDate?: string;
  probability?: number;
  accountId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface OpportunityListResponse {
  content: Opportunity[];
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
