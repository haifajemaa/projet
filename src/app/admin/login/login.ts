import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin-service';
import { form, FormRoot, FormField } from '@angular/forms/signals';
import { Admin } from '../../services/admin';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField, FormRoot],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private service = inject(AdminService);
  private router = inject(Router);

  adminModel = signal<Admin>({
    id: 0,
    username: '',
    password: ''
  });

  readonly adminForm = form(this.adminModel);

  onsubmit() {

    const username = this.adminModel().username;
    const password = this.adminModel().password;

    this.service.verifierAdmin(username, password).subscribe({

      next: (admins) => {

        if (admins.length > 0) {
          this.router.navigate(['/admin/dashboard']);
        }
        else {
          alert('Nom utilisateur ou mot de passe incorrect');
        }

      }

    });
  }
}