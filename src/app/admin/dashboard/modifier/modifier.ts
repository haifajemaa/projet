
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { Watch } from '../../../services/watch';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './modifier.html',
  styleUrl: './modifier.css'
})
export class Modifier {

  productService = inject(ProductService);

  idRecherche = '';
  selectedWatch: Watch | null = null;
  champSelectionne = '';
  nouvelleValeur: any = '';

  rechercherWatch() {
    this.productService.getWatchById(this.idRecherche)
      .subscribe(w => {
        this.selectedWatch = w;
      });
  }

  modifierWatch() {
    if (this.selectedWatch) {

      if (this.champSelectionne === 'nom')
        this.selectedWatch.nom = this.nouvelleValeur;

      else if (this.champSelectionne === 'photo')
        this.selectedWatch.photo = this.nouvelleValeur;

      else if (this.champSelectionne === 'prix')
        this.selectedWatch.prix = Number(this.nouvelleValeur);

      else if (this.champSelectionne === 'marque')
        this.selectedWatch.marque = this.nouvelleValeur;

      else if (this.champSelectionne === 'quantite')
        this.selectedWatch.quantite = Number(this.nouvelleValeur);

      else if (this.champSelectionne === 'categorie')
        this.selectedWatch.categorie = this.nouvelleValeur;

      this.selectedWatch.disponible = this.selectedWatch.quantite > 0;

      this.productService.updateWatch(
        this.selectedWatch.id,
        this.selectedWatch
      ).subscribe();
    }
  }
}
