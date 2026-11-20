import { Component, inject, OnInit, computed } from '@angular/core';
import { ProductService } from '../services/product-service';
import { Produit } from '../produit/produit';

@Component({
  imports: [Produit],
  selector: 'app-liste-produits',
  styleUrl: './liste-produits.css',
  templateUrl: './liste-produits.html',
})
export class ListeProduits implements OnInit {

  private readonly watchesservice = inject(ProductService);

  watches = this.watchesservice.watches;

  produitsFiltres = computed(() => {
    return this.watches().filter(w => {

      const nomValide = w.nom.toLowerCase()
        .startsWith(this.watchesservice.searchNom().trim().toLowerCase());

      const categorieValide =
        this.watchesservice.searchCategorie() === '' ||
        w.categorie.toLowerCase() ===
        this.watchesservice.searchCategorie().toLowerCase();

      return nomValide && categorieValide;
    });
  });

  ngOnInit(): void {
    this.watchesservice.getWatches().subscribe();
  }
}