import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, AccountListResponse, PageResponse, Contact, Activity } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private http = inject(HttpClient);

  getAccounts(searchTerm = '', page = 0, size = 20, sort = 'accountName,asc'): Observable<AccountListResponse> {
    let params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<AccountListResponse>('/api/accounts', { params });
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`/api/accounts/${id}`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>('/api/accounts', account);
  }

  updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`/api/accounts/${id}`, account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`/api/accounts/${id}`);
  }

  getAccountContacts(id: number, page = 0, size = 20): Observable<PageResponse<Contact>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<Contact>>(`/api/accounts/${id}/contacts`, { params });
  }

  getAccountActivities(id: number, type?: string, completed?: boolean, page = 0, size = 20): Observable<PageResponse<Activity>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (type) {
      params = params.set('type', type);
    }
    if (completed !== undefined) {
      params = params.set('completed', completed.toString());
    }

    return this.http.get<PageResponse<Activity>>(`/api/accounts/${id}/activities`, { params });
  }
}
