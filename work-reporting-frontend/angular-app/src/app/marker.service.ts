import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) {
  }

  makeCapitalMarkers(map: L.map): void {
    const lat = 50.2887005;
    const lon = 18.67733;
    const marker = L.marker([lon, lat]).addTo(map);
  }
}
