import { Service ,inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from './admin';
import { Observable, map } from 'rxjs';
const URL = 'http://localhost:3001/admins';
@Service()

export class AdminService {

    private readonly _http = inject(HttpClient);

    private readonly _user = signal<Admin[]>([]);
    user = this._user.asReadonly();

    verifierAdmin(username: string, password: string): Observable<Admin[]> {

        return this._http.get<Admin[]>(URL).pipe(
            map(admins => admins.filter(a =>
                a.username === username &&
                a.password === password
            ))
        );
    }
    updateAdmin(nouveau: string): Observable<Admin> {

    return this._http.patch<Admin>(`${URL}/1`, {
      password: nouveau
    });
  }
}