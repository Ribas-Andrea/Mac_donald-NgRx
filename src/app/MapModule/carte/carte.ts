import { Component, effect, inject, input } from '@angular/core';
import { LeafletDirective, LeafletLayersDirective } from '@bluehalo/ngx-leaflet';
import { Store } from '@ngrx/store';
import { latLng, Map, marker, tileLayer } from 'leaflet';
import { selectionnerRestaurant } from '../../NgRx-Store/recherche.action';
import { afficheRestaurants } from '../../NgRx-Store/recherche.selectors';

@Component({
  imports: [
    LeafletDirective, 
    LeafletLayersDirective
  ],
  selector: 'app-carte',
  styleUrl: './carte.css',
  templateUrl: './carte.html',
})
export class Carte {

  private map?: Map;

  // Service NgRx Store : 
  private store = inject(Store);
  restaurants = this.store.selectSignal(afficheRestaurants);

  

  // Position de Saintes :
  latitude = input<number>(45.750000);
  longitude = input<number>(-0.633330);


// Position du restaurant : 
  restaurantLatitude = input<number>();
  restaurantLongitude = input<number>();


  
  constructor(){
    effect(() => {
      const lat: number = this.latitude();
      const lon: number = this.longitude();

      const restaurants = this.restaurants();
      this.marqueurs.forEach((marqueur) => {
        marqueur.remove();
      });

      this.marqueurs.length = 0;

      restaurants.forEach((restaurant) => {
        const adresse = restaurant.address;
        const numero = adresse.house_number ? adresse.house_number + ' ' : '';
        const rue = numero + (adresse.road || '');
        const quartier = adresse.neighbourhood || adresse.suburb || adresse.quarter || '';
        const ville = adresse.city || adresse.town || adresse.municipality ||'';
        const marqueur = marker([
          Number(restaurant.lat),
          Number(restaurant.lon)
        ]).bindPopup(`
            <div id="popupContent">
              <strong>${restaurant.name}</strong><br>
              ${rue} <br>
              ${quartier} <br>
              ${ville} <br>
              ${adresse.postcode} <br> <br>
            </div>
            <button id="choisirRestaurant">Choisir</button>
          `);

          marqueur.on('popupopen', (e) => {
            const bouton = e.popup.getElement()?.querySelector('#choisirRestaurant');
            bouton?.addEventListener('click', () => {
              const textPopup: string = e.popup.getElement()?.querySelector('#popupContent')?.textContent!;
              this.store.dispatch(
                selectionnerRestaurant({
                  restaurantSelectionne: textPopup
                })
              )
            });
          });
        this.marqueurs.push(marqueur);
      });

      if (this.map) {
        this.map.setView([lat, lon], 13);
      }
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.setView([
      this.latitude(),
      this.longitude()
    ], 13);
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 5,
    center: latLng(45.750000, -0.633330)
  };
    marqueurs: any[] = [];
    layers = this.marqueurs;
}