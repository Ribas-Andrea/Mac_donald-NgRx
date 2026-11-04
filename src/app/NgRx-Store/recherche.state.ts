import { ResultatNominatim } from '../models/resultat-nominatim';

export interface RechercheState {
  villes: ResultatNominatim[];
  villeSelectionne: string | null ;
  restaurants: ResultatNominatim[];
  restaurantSelectionne: string | null;
}