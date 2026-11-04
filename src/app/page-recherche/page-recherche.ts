import { Component } from '@angular/core';
import { Carte } from '../MapModule/carte/carte';
import { RechercheRestaurants } from '../SearchModule/rechercheRestaurants/rechercheRestaurants';
import { RechercheVilles } from '../SearchModule/rechercheVilles/rechercheVilles';


@Component({
  imports: [RechercheVilles, RechercheRestaurants, Carte],
  selector: 'app-page-recherche',
  styleUrl: './page-recherche.css',
  templateUrl: './page-recherche.html',
})

export class PageRecherche {

  latitude = 45.750000;
  longitude = -0.633330;

}
