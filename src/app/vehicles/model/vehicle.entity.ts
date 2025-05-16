/**
 * Vehicle entity
 * @class Vehicle
 * @description
 * This class is used to represent a vehicle.
 * It contains the following properties:
 * @property id: string - The ID of the vehicle.
 * @property name: string - The name of the vehicle.
 * @property type: string - The type of the vehicle.
 * @property year: string - The year of the vehicle.
 * @property priceSell: number - The sale price of the vehicle.
 * @property priceRent: number - The rental price of the vehicle.
 * @property description: string - The description of the vehicle.
 * @property imageUrl: string - The imageUrl of the vehicle.
 * @property lat: number - The latitude of the vehicle.
 * @property lng: number - The longitude of the vehicle.
 */


export class Vehicle {
  id: number;
  type: string;
  name: string;
  year: number;
  review: number;
  priceRent: number;
  priceSell: number;
  isAvailable: boolean;
  imageUrl: string;
  lat: number;
  lng: number;
  description: string;


  constructor(vehicle:{
    id?: number,
    type?: string,
    name?: string,
    year?: number,
    review?: number;
    priceRent?: number,
    priceSell?: number,
    isAvailable?: boolean,
    imageUrl?: string,
    lat?: number,
    lng?: number
    description?: string;
    studentId?: number
  }){
    this.id = vehicle.id || 0;
    this.name = vehicle.name || '';
    this.type = vehicle.type || '';
    this.year = vehicle.year || 0;
    this.review = vehicle.review || 0;
    this.priceSell = vehicle.priceSell || 0;
    this.priceRent = vehicle.priceRent || 0;
    this.priceRent = vehicle.priceRent || 0;
    this.isAvailable = vehicle.isAvailable || true;
    this.imageUrl = vehicle.imageUrl || "";
    this.lat = vehicle.lat || 0;
    this.lng = vehicle.lng || 0;
    this.description = vehicle.description || "";
  }
}
