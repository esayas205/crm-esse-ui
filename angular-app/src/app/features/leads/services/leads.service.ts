import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead, LeadListResponse, PageResponse, Activity, ConvertLeadResponse } from '../models/lead.model';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private http = inject(HttpClient);

  getLeads(
    status = '',
    source = '',
    searchTerm = '',
    ownerUser = '',
    page = 0,
    size = 20
  ): Observable<LeadListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status) params = params.set('status', status);
    if (source) params = params.set('source', source);
    if (searchTerm) params = params.set('searchTerm', searchTerm);
    if (ownerUser) params = params.set('ownerUser', ownerUser);

    return this.http.get<LeadListResponse>('/api/leads', { params });
  }

  getLead(id: number): Observable<Lead> {
    return this.http.get<Lead>(`/api/leads/${id}`);
  }

  createLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>('/api/leads', lead);
  }

  updateLead(id: number, lead: Lead): Observable<Lead> {
    return this.http.put<Lead>(`/api/leads/${id}`, lead);
  }

  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`/api/leads/${id}`);
  }

  convertLead(id: number): Observable<ConvertLeadResponse> {
    return this.http.post<ConvertLeadResponse>(`/api/leads/${id}/convert`, {});
  }

  getLeadActivities(id: number, type?: string, completed?: boolean, page = 0, size = 20): Observable<PageResponse<Activity>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (type) {
      params = params.set('type', type);
    }
    if (completed !== undefined) {
      params = params.set('completed', completed.toString());
    }

    return this.http.get<PageResponse<Activity>>(`/api/leads/${id}/activities`, { params });
  }
}
