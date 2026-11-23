import { Component, inject, signal } from '@angular/core';
import { FormField, form, FormRoot } from '@angular/forms/signals';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../services/product-service';
import { Watch } from '../../../services/watch';
import { PipeprixPipe } from '../../../pipe/pipeprix-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rechercher',
  imports: [FormRoot, FormField, DatePipe, PipeprixPipe,RouterLink],
  templateUrl: './rechercher.html',
  styleUrl: './rechercher.css',
})
export class Rechercher {

  readonly productService = inject(ProductService);
  readonly watchModel = signal({
    id: ''
  });
  readonly watchForm = form(this.watchModel);

  selectedWatch = signal<Watch | undefined>(undefined);
  rechercheEffectuee = signal(false);

  rechercherWatch() {
    const id = this.watchForm().value().id;
    this.selectedWatch.set(undefined);
    this.rechercheEffectuee.set(false);
    if (id) {
      this.productService.getWatchById(id).subscribe(
        w => {
          this.selectedWatch.set(w);
          this.rechercheEffectuee.set(true);
        }
      );
    }
  }
}