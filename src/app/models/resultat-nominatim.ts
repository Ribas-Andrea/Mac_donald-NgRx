export interface ResultatNominatim {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  address: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    quarter?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    postcode?: string;
    country?: string;
  }
};