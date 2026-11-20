
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { Watch } from '../../../services/watch';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [FormsModule ,RouterLink],
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

    this.productService.getWatchById(this.idRecherche).subscribe(w => {

  this.selectedWatch = w;
  this.champSelectionne = '';
  this.nouvelleValeur = '';

});
  }
  modifierWatch() {

    if (!this.selectedWatch || !this.champSelectionne) {
      return;
    }

    let valeur: any = this.nouvelleValeur;
    if (this.champSelectionne === 'prix' ||
        this.champSelectionne === 'quantite') {
      valeur = Number(valeur);
    }
    const watchModifiee = {
      ...this.selectedWatch,
      [this.champSelectionne]: valeur
    };

    this.productService.updateWatch(
  this.selectedWatch.id,
  watchModifiee
).subscribe(() => {

  

  this.selectedWatch = watchModifiee;
  this.champSelectionne = '';
  this.nouvelleValeur = '';

});
  }

}
