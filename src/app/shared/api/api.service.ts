import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../env/environment';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../components/snackbar/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private auth = inject(AuthService);
  private http = inject(HttpClient);
  private snackbar = inject(SnackbarService);
  public get<T>(url: string): Observable<T> {
    return new Observable((observer) => {
      this.http
        .get<T>(`${this.baseUrl}/${url}`, {
          headers: {
            Authorization: 'Bearer ' + this.auth.token,
          },
        })
        .subscribe({
          next: (response) => {
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            const { code, message } = error.error;
            this.snackbar.open(`${code}: ${message}`, 'bg-red-500');
            observer.error(error);
          },
        });
    });
  }

  public post<T>(url: string, data: any, headers?: any): Observable<T> {
    return new Observable((observer) => {
      this.http
        .post<T>(`${this.baseUrl}/${url}`, data, {
          headers: {
            ...headers,
            Authorization: 'Bearer ' + this.auth.token,
          },
        })
        .subscribe({
          next: (response) => {
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            const { code, message } = error.error;
            this.snackbar.open(`${code}: ${message}`, 'bg-red-500');
            observer.error(error);
          },
        });
    });
  }
  public patch<T>(url: string, data: any): Observable<T> {
    return new Observable((observer) => {
      this.http
        .patch<T>(`${this.baseUrl}/${url}`, data, {
          headers: {
            Authorization: 'Bearer ' + this.auth.token,
          },
        })
        .subscribe({
          next: (response) => {
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            const { code, message } = error.error;
            this.snackbar.open(`${code}: ${message}`, 'bg-red-500');
            observer.error(error);
          },
        });
    });
  }

  public delete<T>(url: string): Observable<T> {
    return new Observable((observer) => {
      this.http
        .delete<T>(`${this.baseUrl}/${url}`, {
          headers: {
            Authorization: 'Bearer ' + this.auth.token,
          },
        })
        .subscribe({
          next: (response) => {
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            const { code, message } = error.error;
            this.snackbar.open(`${code}: ${message}`, 'bg-red-500');
            observer.error(error);
          },
        });
    });
  }
}
