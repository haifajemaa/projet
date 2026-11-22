import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ProductService } from './services/product-service';
import { AdminService } from './services/admin-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  readonly adminService = inject(AdminService);

  searchNom = '';
  searchCategorie = '';

  rechercher(): void {
    this.productService.searchNom.set(this.searchNom.trim());
    this.productService.searchCategorie.set(this.searchCategorie);
  }
  annuler(): void {
  this.searchNom = '';
  this.searchCategorie = '';

  this.productService.searchNom.set('');
  this.productService.searchCategorie.set('');
}

  

  
}
