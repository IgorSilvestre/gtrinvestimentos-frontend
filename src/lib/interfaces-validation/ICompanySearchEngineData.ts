export interface ICompanySearchEngineData {
  business_id: string;
  google_id: string;
  place_id: string;
  google_mid: string;
  phone_number: string | null;
  name: string;
  latitude: number;
  longitude: number;
  full_address: string;
  review_count: number;
  rating: number | null;
  timezone: string;
  working_hours: string | null;
  website: string;
  verified: boolean;
  place_link: string;
  cid: string;
  reviews_link: string | null;
  owner_id: string;
  owner_link: string;
  owner_name: string;
  booking_link: string | null;
  reservations_link: string | null;
  business_status: string;
  type: string;
  subtypes: string[];
  photos_sample: IPhoto[];
  reviews_per_rating: Record<string, number> | null;
  photo_count: number;
  about: {
    summary: string | null;
    details: {
      Acessibilidade: {
        "Entrada com acessibilidade": boolean;
        "Estacionamento com acessibilidade": boolean;
      };
    };
  };
  address: string;
  order_link: string | null;
  price_level: number | null;
  district: string;
  street_address: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
}

interface IPhoto {
  photo_id: string;
  photo_url: string;
  photo_url_large: string | null;
  video_thumbnail_url: string | null;
  latitude: number;
  longitude: number;
  type: string;
  photo_datetime_utc: string;
  photo_timestamp: number;
}
