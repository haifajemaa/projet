import { Routes } from '@angular/router';
import { DetailProduit } from './detail-produit/detail-produit';
import { ListeProduits } from './liste-produits/liste-produits';
import { About } from './about/about';
import { Login } from './admin/login/login';
import { Dashboard } from './admin/dashboard/dashboard';
import { Ajouter } from './admin/dashboard/ajouter/ajouter';
import { Modifier } from './admin/dashboard/modifier/modifier';
import { Supprimer } from './admin/dashboard/supprimer/supprimer';
import { Rechercher } from './admin/dashboard/rechercher/rechercher';
import { ModifieMDP } from './admin/dashboard/modifie-mdp/modifie-mdp';

export const routes: Routes = [

  {
    path: 'admin/dashboard',
    children: [
      { path: '', component: Dashboard },
      { path: 'ajouter', component: Ajouter },
      { path: 'supprimer', component: Supprimer },
      { path: 'modifier', component: Modifier },
      { path: 'rechercher', component: Rechercher },
      { path: 'modifier-mdp', component: ModifieMDP }
    ]
  },

  { path: 'admin/login', component: Login },
  { path: 'produits', component: ListeProduits },
  { path: 'produit/:idP', component: DetailProduit },
  { path: 'about', component: About },
  { path: '', redirectTo: 'produits', pathMatch: 'full' }

];