import { Service ,inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Watch } from './watch';
import { Observable, tap } from 'rxjs';
const URL = 'http://localhost:3000/products';
@Service()
export class ProductService {
    searchNom = signal('');
    searchCategorie = signal('');
    private readonly _http=inject(HttpClient);
    private _watches = signal<Watch[]>([]);
    watches = this._watches.asReadonly();
    getWatches():Observable< Watch[]> {
        return this._http.get<Watch[]>(URL).pipe(
            tap(allwatches=> this._watches.set(allwatches))
        );
    }
    getWatchById(idP: string): Observable<Watch> {
        return this._http.get<Watch>(`${URL}/${idP}`);
    }
    addWatch(w: Watch): Observable<Watch> {
        return this._http.post<Watch>(URL, w).pipe(
        tap(watch =>
        this._watches.update(watches => [...watches, watch])
    )
  );
}
updateWatch(id: string, w: Watch) {
  return this._http.put<Watch>(`${URL}/${id}`, w);
}
deleteWatch(id: string) {
  return this._http.delete(`${URL}/${id}`).pipe(
    tap(() => {
      this._watches.update(watches =>
        watches.filter(w => w.id !== id)
      );
    })
  );
}


    }

