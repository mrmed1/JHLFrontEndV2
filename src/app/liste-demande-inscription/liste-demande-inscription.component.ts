import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../Model/fournisseur';
import {FournisseurService} from '../Service/fournisseur.service';

@Component({
  selector: 'app-liste-demande-inscription',
  templateUrl: './liste-demande-inscription.component.html',
  styleUrls: ['./liste-demande-inscription.component.css']
})
export class ListeDemandeInscriptionComponent implements OnInit {

  listFournisseurs: Fournisseur[];
  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
    this.fournisseurService.getFournisseurNoActive().subscribe(
      res =>   this.listFournisseurs = res as Fournisseur[]
    );
  }


}
