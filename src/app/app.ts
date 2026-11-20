import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ProductService } from './services/product-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private productService = inject(ProductService);
  private router = inject(Router);

  searchNom = signal('');
  searchCategorie = signal('');

  rechercher() {
    this.productService.searchNom.set(this.searchNom().trim());
    this.productService.searchCategorie.set(this.searchCategorie());

    this.router.navigate(['/produits']);
  }
  reinitialiser(nom: HTMLInputElement, categorie: HTMLSelectElement) {

  nom.value = '';
  categorie.value = '';

  this.searchNom.set('');
  this.searchCategorie.set('');
  

}
}