import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) { }
  makeMarkers(map: L.Map): void { 
    const arr = [{lat:78.9629, long: 20.5937}];
    arr.forEach(loc=>{
      const marker = L.marker([loc.lat,loc.long]);
      marker.addTo(map);
    });
    // const lon =  78.9629;
    // const lat = 20.5937;
    
  }
}
