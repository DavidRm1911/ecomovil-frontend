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
  studentId: number;
  // IoT fields
  iotDeviceId: string | null;
  isLocked: boolean;
  fallDetected: boolean;
  lastIotUpdate: string | null;
  speedKmh: number | null;
  panicActive: boolean;
  geofenceCenterLat: number | null;
  geofenceCenterLng: number | null;
  geofenceRadiusM: number | null;
  geofenceBreached: boolean;

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
    studentId?: number;
    iotDeviceId?: string | null;
    isLocked?: boolean;
    fallDetected?: boolean;
    lastIotUpdate?: string | null;
    speedKmh?: number | null;
    panicActive?: boolean;
    geofenceCenterLat?: number | null;
    geofenceCenterLng?: number | null;
    geofenceRadiusM?: number | null;
    geofenceBreached?: boolean;
  }){
    this.id = vehicle.id || 0;
    this.name = vehicle.name || '';
    this.type = vehicle.type || '';
    this.year = vehicle.year || 0;
    this.review = vehicle.review || 0;
    this.priceSell = vehicle.priceSell || 0;
    this.priceRent = vehicle.priceRent || 0;
    this.isAvailable = vehicle.isAvailable || true;
    this.imageUrl = vehicle.imageUrl || "";
    this.lat = vehicle.lat || 0;
    this.lng = vehicle.lng || 0;
    this.description = vehicle.description || "";
    this.studentId = vehicle.studentId || 0;
    this.iotDeviceId = vehicle.iotDeviceId ?? null;
    this.isLocked = vehicle.isLocked ?? false;
    this.fallDetected = vehicle.fallDetected ?? false;
    this.lastIotUpdate = vehicle.lastIotUpdate ?? null;
    this.speedKmh = vehicle.speedKmh ?? null;
    this.panicActive = vehicle.panicActive ?? false;
    this.geofenceCenterLat = vehicle.geofenceCenterLat ?? null;
    this.geofenceCenterLng = vehicle.geofenceCenterLng ?? null;
    this.geofenceRadiusM = vehicle.geofenceRadiusM ?? null;
    this.geofenceBreached = vehicle.geofenceBreached ?? false;
  }
}
