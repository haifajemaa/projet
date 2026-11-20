import { Caracteristique } from "./caracteristique";
export interface Watch {
    id:string;
    nom:string;
    photo:string;
    prix:number;
    marque:string;
    quantite:number;
    categorie:string;
    disponible:boolean;
    dateAjout:Date;
    caracteristiques:Caracteristique[];
    
}
