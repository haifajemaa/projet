import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { FormField, form, FormRoot, min, required } from '@angular/forms/signals';
import { Watch } from '../../../services/watch';

@Component({
  imports: [RouterLink, FormRoot, FormField],
  selector: 'app-ajouter',
  styleUrl: './ajouter.css',
  templateUrl: './ajouter.html',
})
export class Ajouter {
  readonly productService = inject(ProductService);

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
    caracteristiques: [{ nom: '', valeur: '' }]
  });

  readonly watchForm = form(this.watchModel, path => {
    required(path.nom, { message: 'Le nom est obligatoire' });
    required(path.photo, { message: 'La photo est obligatoire' });
    required(path.marque, { message: 'La marque est obligatoire' });
    required(path.categorie, { message: 'La catégorie est obligatoire' });
    min(path.prix, 50.00, { message: 'Le prix doit être supérieur à 50 DT' });
    min(path.quantite, 0, { message: 'La quantité ne peut pas être négative' });
  });

  ajouterCaracteristique(): void {
    this.watchModel.update(watch => ({
      ...watch,
      caracteristiques: [...watch.caracteristiques, { nom: '', valeur: '' }]
    }));
  }

  onSubmit(): void {
    if (!this.watchForm().valid()) return;

    const { id, ...newWatch } = this.watchForm().value();
    newWatch.disponible = newWatch.quantite > 0;

    this.productService.addWatch(newWatch).subscribe();
    this.resetForm();
  }

  resetForm(){
    this.watchModel.set({
      id: '', nom: '', photo: '', prix: 0, marque: '', quantite: 0,
      categorie: '', disponible: false, dateAjout: new Date(),
      caracteristiques: [{ nom: '', valeur: '' }]
    });
  }
}
