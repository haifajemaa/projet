import {  Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from './admin';
import { Observable, map, tap } from 'rxjs';

const URL = 'http://localhost:3000/admins';

@Service()
export class AdminService {
  private readonly http = inject(HttpClient);
  

  verifierAdmin(username: string, password: string): Observable<Admin[]> {
    return this.http.get<Admin[]>(URL).pipe(
      map(admins => admins.filter(admin =>
        admin.username === username && admin.password === password
      ))
    );
  }

 updateAdmin(admin: Admin, nouveau: string): Observable<Admin> {
  return this.http.patch<Admin>(`${URL}/${admin.id}`, {
    password: nouveau
  });
}
  }

  

