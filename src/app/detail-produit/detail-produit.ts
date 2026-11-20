import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product-service';
import { Watch } from '../services/watch';
import { DatePipe } from '@angular/common';
import { PipeprixPipe } from '../pipe/pipeprix-pipe';

@Component({
  selector: 'app-detail-produit',
    imports: [DatePipe,PipeprixPipe],
  templateUrl: './detail-produit.html',
  styleUrl: './detail-produit.css',
})
export class DetailProduit implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  watch = signal<Watch | undefined>(undefined);

  ngOnInit(): void {

    let idP = this.activatedRoute.snapshot.paramMap.get('idP');

    if (idP) {
      this.productService.getWatchById(idP).subscribe(
        w => this.watch.set(w)
      );
    }

}
}