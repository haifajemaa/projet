
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

  watchesFiltres = computed(() => {
    return this.watchesservice.watches().filter(watch => {

      const nom = watch.nom.toLowerCase().includes(
        this.watchesservice.searchNom().toLowerCase()
      );

      const categorie =
        this.watchesservice.searchCategorie() === '' ||
        watch.categorie.toLowerCase() ===
        this.watchesservice.searchCategorie().toLowerCase();

      return nom && categorie;
    });
  });

  ngOnInit(): void {
    this.watchesservice.getWatches().subscribe();
  }
}
