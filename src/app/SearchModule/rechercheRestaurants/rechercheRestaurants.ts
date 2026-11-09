import { Component, inject, Input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { chargerRestaurants } from '../../NgRx-Store/recherche.action';
import { selectRestaurant, selectVille } from '../../NgRx-Store/recherche.selectors';
import { Nominatim } from '../../services/nominatim';

@Component({
  imports: [],
  selector: 'app-rechercheRestaurants',
  styleUrl: './rechercheRestaurants.css',
  templateUrl: './rechercheRestaurants.html',
})


export class RechercheRestaurants {

  ville = '';

  // Latitude et longitude reçue du composant parent(page-recherche)
  @Input() latitude = 45.750000;
  @Input() longitude = -0.633330;


  // Restaurant Selectionné : 
  restaurantSelectionne = signal<string | null>(null);

  // Coordonnées du restaurant selectionné : 
  restaurantLatitude = signal<number | undefined>(undefined);
  restaurantLongitude = signal<number | undefined>(undefined);
  
  // Service Nominatim : 
  private nominatim = inject(Nominatim);

  // Service NgRx Store : 
  private store = inject(Store);

  restaurants = this.store.select(selectRestaurant).subscribe((data) => {
    this.restaurantSelectionne.set(data);
  });

  titrePopup: string | null = "";

  constructor() {
    this.store.select(selectVille).subscribe((ville) => {
      this.ville = ville ?? '';
      if (this.ville) {
        this.chercherRestaurants();
      }
    });
  }

  chercherRestaurants(){
    this.nominatim
    .rechercherRestaurants(this.ville, this.latitude, this.longitude)
    .subscribe((restaurants) => {
      this.store.dispatch(
        chargerRestaurants({ restaurants: restaurants })
      );
      const restaurant = restaurants[0];
      if (restaurant) {
        this.restaurantLatitude.set(restaurant.lat);
        this.restaurantLongitude.set(restaurant.lon);
      }
    });
  }
}