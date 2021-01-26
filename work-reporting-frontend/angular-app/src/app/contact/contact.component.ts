import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  latitude: number = 50.2887005;
  longitude: number = 18.67733;

  map: any;

  ngOnInit() {
    const iconRetinaUrl = 'assets/room-black-48dp.svg';
    const iconUrl = 'assets/room-black-48dp.svg';
    const shadowUrl = '';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [40, 56], //25 41 [40, 56]
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    var map = L.map('mapid').setView([50.2887005, 18.67733], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([50.2887005, 18.67733]).addTo(map);
  }
}

