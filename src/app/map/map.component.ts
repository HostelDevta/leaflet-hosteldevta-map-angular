import { Component, AfterViewInit } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { GeoSearchControl} from 'leaflet-geosearch';
import { MarkerService } from '../marker.service';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/location.png';
const iconUrl = 'assets/location.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [25, 25]
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})

export class MapComponent implements AfterViewInit{
  
private map:any;
marker2: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 20.5937, 78.9629 ],
      zoom: 9
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.hosteldevta.com/">HostelDevta</a>'
    }).addTo(this.map);
    L.control.scale().addTo(this.map);

  }
  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    //initialize map
    this.initMap();

    // this.markerService.makeMarkers(this.map);
    
    // add search control
    let provider:any = new OpenStreetMapProvider();
    this.map.addControl(
      GeoSearchControl({
        provider:provider,
        marker : L.marker
      })
    );

    
    // hostel wale ko select krne ke liye
    let lat : any;
    let marker:any;
    this.map.on("click", (e:any) => {
      console.log(e.latlng); // get the coordinates
      lat = e.latlng;
      if(marker && this.map.hasLayer(marker)){
        this.map.removeLayer(marker);
      }
      marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map); // add the marker onclick
      this.marker2 = marker;
    });
    
  }
}
