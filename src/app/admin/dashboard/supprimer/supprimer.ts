
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormField, form, FormRoot } from '@angular/forms/signals';
import { ProductService } from '../../../services/product-service';
import { Watch } from '../../../services/watch';
@Component({
  selector: 'app-supprimer',
  standalone: true,
  imports: [RouterLink, FormRoot, FormField],
  templateUrl: './supprimer.html',
  styleUrl: './supprimer.css'
})
export class Supprimer {

  readonly productService = inject(ProductService);

  readonly watchModel = signal({
    id: ''
  });

  readonly watchForm = form(this.watchModel);

  selectedWatch: Watch | null = null;

  confirmationSuppression = false;

  rechercherWatch() {

    const id = this.watchForm().value().id;

    this.productService.getWatchById(id).subscribe(w => {
      this.selectedWatch = w;
    });

  }

  supprimerWatch() {

    if (this.selectedWatch) {

      this.productService.deleteWatch(this.selectedWatch.id)
        .subscribe();

          

          this.resetForm();

      

    }

  }

  resetForm() {

    this.watchModel.set({
      id: ''
    });

    this.selectedWatch = null;
    this.confirmationSuppression = false;

  }

}
