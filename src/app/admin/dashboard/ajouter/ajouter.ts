import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { FormField, form, FormRoot, min } from '@angular/forms/signals';
import { Watch } from '../../../services/watch';

@Component({
  imports: [RouterLink, FormRoot, FormField],
  selector: 'app-ajouter',
  styleUrl: './ajouter.css',
  templateUrl: './ajouter.html',
})
export class Ajouter {

  readonly productService = inject(ProductService);

  watches = this.productService.watches;

  readonly watchModel = signal<Watch>({
    id: '',
    nom: '',
    photo: '',
    prix: 0,
    marque: '',
    quantite: 0,
    categorie: '',
    disponible: false,
    dateAjout: new Date(),
    caracteristiques: [
      {
        nom: '',
        valeur: ''
      }
    ]
  });

 readonly watchForm = form(this.watchModel, (path) => {
  min(path.quantite, 1, {
    message: 'La quantité doit être supérieure à 0'
  });

  min(path.prix, 50.01, {
    message: 'Le prix doit être supérieur à 50 DT'
  });
});
  ajouterCaracteristique() {
    this.watchModel.update(w => ({
      ...w,
      caracteristiques: [
        ...w.caracteristiques,
        {
          nom: '',
          valeur: ''
        }
      ]
    }));
  }

  onSubmit() {
    if (!this.watchForm().valid()) {
      return;
    }

    let w = this.watchForm().value();

    this.productService.addWatch(w).subscribe({
      next: () => {
        console.log('Montre ajoutée avec succès');
        this.resetForm();
      },
      error: (err) => {
        console.log('Erreur lors de l’ajout', err);
      }
    });
  }

  resetForm() {
    this.watchModel.set({
      id: '',
      nom: '',
      photo: '',
      prix: 0,
      marque: '',
      quantite: 0,
      categorie: '',
      disponible: false,
      dateAjout: new Date(),
      caracteristiques: [
        {
          nom: '',
          valeur: ''
        }
      ]
    });
  }
}