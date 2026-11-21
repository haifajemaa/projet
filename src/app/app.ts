import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ProductService } from './services/product-service';
import { AdminService } from './services/admin-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  readonly adminService = inject(AdminService);

  searchNom = signal('');
  searchCategorie = signal('');

  rechercher(): void {
    this.productService.searchNom.set(this.searchNom().trim());
    this.productService.searchCategorie.set(this.searchCategorie());
    
  }

  reinitialiser(nom: HTMLInputElement, categorie: HTMLSelectElement): void {
    nom.value = '';
    categorie.value = '';
    this.searchNom.set('');
    this.searchCategorie.set('');
    this.productService.searchNom.set('');
    this.productService.searchCategorie.set('');
    
  }

  
}
