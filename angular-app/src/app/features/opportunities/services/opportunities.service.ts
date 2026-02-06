import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Opportunity, OpportunityListResponse, PageResponse, Activity } from '../models/opportunity.model';

@Injectable({
  providedIn: 'root'
})
export class OpportunitiesService {
  private http = inject(HttpClient);

  getOpportunities(
    stage = '',
    accountId = '',
    startDate = '',
    endDate = '',
    minAmount = '',
    maxAmount = '',
    page = 0,
    size = 20
  ): Observable<OpportunityListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (stage) params = params.set('stage', stage);
    if (accountId) params = params.set('accountId', accountId);
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (minAmount) params = params.set('minAmount', minAmount);
    if (maxAmount) params = params.set('maxAmount', maxAmount);

    return this.http.get<OpportunityListResponse>('/api/opportunities', { params });
  }

  getOpportunity(id: number): Observable<Opportunity> {
    return this.http.get<Opportunity>(`/api/opportunities/${id}`);
  }

  createOpportunity(opportunity: Opportunity): Observable<Opportunity> {
    return this.http.post<Opportunity>('/api/opportunities', opportunity);
  }

  updateOpportunity(id: number, opportunity: Opportunity): Observable<Opportunity> {
    return this.http.put<Opportunity>(`/api/opportunities/${id}`, opportunity);
  }

  deleteOpportunity(id: number): Observable<void> {
    return this.http.delete<void>(`/api/opportunities/${id}`);
  }

  updateStage(id: number, stage: string): Observable<Opportunity> {
    const params = new HttpParams().set('stage', stage);
    return this.http.patch<Opportunity>(`/api/opportunities/${id}/stage`, {}, { params });
  }

  getOpportunityActivities(id: number, type?: string, completed?: boolean, page = 0, size = 20): Observable<PageResponse<Activity>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (type) {
      params = params.set('type', type);
    }
    if (completed !== undefined) {
      params = params.set('completed', completed.toString());
    }

    return this.http.get<PageResponse<Activity>>(`/api/opportunities/${id}/activities`, { params });
  }
}
