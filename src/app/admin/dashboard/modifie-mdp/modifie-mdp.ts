import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin-service';
import {
  form,
  FormRoot,
  FormField,
  required
} from '@angular/forms/signals';

@Component({
  imports: [RouterLink, FormRoot, FormField],
  selector: 'app-modifie-mdp',
  styleUrl: './modifie-mdp.css',
  templateUrl: './modifie-mdp.html',
})
export class ModifieMDP {

  private service = inject(AdminService);

  passwordModel = signal({
    ancienPassword: '',
    nouveauPassword: '',
    confirmPassword: ''
  });

  readonly passwordForm = form(this.passwordModel, (path) => {
    required(path.ancienPassword, {
      message: 'L’ancien mot de passe est obligatoire'
    });

    required(path.nouveauPassword, {
      message: 'Le nouveau mot de passe est obligatoire'
    });

    required(path.confirmPassword, {
      message: 'La confirmation du mot de passe est obligatoire'
    });
  });

  onSubmit(): void {
    const ancien = this.passwordModel().ancienPassword;
    const nouveau = this.passwordModel().nouveauPassword;
    const confirmation = this.passwordModel().confirmPassword;
    this.service.verifierAdmin('admin', ancien).subscribe({
      next: (admins) => {
        if (admins.length === 0) {
          alert('Ancien mot de passe incorrect');
          return;
        }

        const admin = admins[0];

        this.service.updateAdmin(admin, nouveau).subscribe();
        this.resetForm();
         
      
        
      },
      error: () => {
        alert('Erreur lors de la vérification');
      }
    });
  }

  resetForm(): void {
    this.passwordModel.set({
      ancienPassword: '',
      nouveauPassword: '',
      confirmPassword: ''
    });
  }
}