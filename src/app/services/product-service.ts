import {  inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Watch } from './watch';
import { Observable, tap } from 'rxjs';

const URL = 'http://localhost:3000/products';

@Service()
export class ProductService {
  searchNom = signal('');
  searchCategorie = signal('');

  private readonly http = inject(HttpClient);
  private readonly _watches = signal<Watch[]>([]);
  watches = this._watches.asReadonly();

  getWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(URL).pipe(
      tap(watches => this._watches.set(watches))
    );
  }

  getWatchById(id: string): Observable<Watch> {
    return this.http.get<Watch>(`${URL}/${id}`);
  }

  addWatch(watch: Omit<Watch, 'id'>): Observable<Watch> {
    return this.http.post<Watch>(URL, watch).pipe(
      tap(newWatch => this._watches.update(watches => [...watches, newWatch]))
    );
  }

  updateWatch(id: string, watch: Watch): Observable<Watch> {
    return this.http.put<Watch>(`${URL}/${id}`, watch).pipe();
  }

  deleteWatch(id: string): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`).pipe(
      tap(() => 
        this._watches.update(watches =>
        watches.filter(watch => watch.id !== id)
      ))
    );
  }
}
