import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin-service';
import { form, FormRoot, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField, FormRoot],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly service = inject(AdminService);
  private readonly router = inject(Router);

  adminModel = signal({ username: '', password: '' });
  message = signal('');

  readonly adminForm = form(this.adminModel, path => {
    required(path.username, { message: 'Le nom utilisateur est obligatoire' });
    required(path.password, { message: 'Le mot de passe est obligatoire' });
  });

  onsubmit(): void {
    const username = this.adminModel().username;
    const password = this.adminModel().password;

    this.message.set('');

    this.service.verifierAdmin(username, password).subscribe({
      next: (admins) => {
        if (admins.length > 0) {
          this.router.navigate(['/admin/dashboard']);
        }
        else{
            this.message.set('Erreur de connexion ');
        }
       
      }
    });
  }
}