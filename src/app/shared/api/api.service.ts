import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      headers: {
        Authorization: 'Bearer ' + this.auth.token,
      },
    });
  }

  public post<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, data, {
      headers: {
        ...headers,
        Authorization: 'Bearer ' + this.auth.token,
      },
    });
  }
  public patch<T>(url: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${url}`, data, {
      headers: {
        Authorization: 'Bearer ' + this.auth.token,
      },
    });
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, {
      headers: {
        Authorization: 'Bearer ' + this.auth.token,
      },
    });
  }
}
