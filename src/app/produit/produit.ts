import { Component,input } from '@angular/core';
import { Watch } from '../services/watch';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink,],
  selector: 'app-produit',
  styleUrl: './produit.css',
  templateUrl: './produit.html',
})
export class Produit {
  watch=input.required<Watch>();
}
