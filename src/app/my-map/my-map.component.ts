import { Component, OnInit, AfterViewInit } from '@angular/core';

// LOAD AF LEAFLET-KOMPONENTER:
import * as L from 'leaflet'
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import * as awesome from './dist/leaflet.awesome-markers.js' // Hvordan får jeg egentligt det script ind i dette script?

import * as db from '../../assets/db.coords.service';               // LOAD AF JSON GENNEM SERVICE
import {markerIcon, greenIcon, redIcon, orangeIcon} from "./icons"  // LOAD AF MARKERS

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss'],
  providers: [Geolocation],
})

export class MyMapComponent implements OnInit, AfterViewInit {
  private DB: any = db.default.PersonsDB // Database med koordinater på personer 
  
  private map: L.Map
  private centerZoom: L.LatLngExpression = [55.9138504, 11.2703595] // Hele Danmark
  
  private currentPosition // definer
  private myMarker // definer
  

  public options = { // Fra Mads' løsning
    layers: [
        L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: '...' })
        // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }) // Org. Leaflet-kort
    ],
    maxZoom: 18,
    zoom: 7, // 7 = hele Danmark
    // center: L.latLng(55.9138504, 11.2703595), // Midten af Danmark; Hvis denne er aktiv, overskrives geolocation.
    zoomControl: false // tilføjer en zoom +- på kortet.
  };
  
  public layersControl = {baseLayers: {}, overlays: {}}; // Fra Mads' løsning. Ukendt funktion

  // private initMap(): void {
  //   this.map = L.map('map', { // 'map' er nok div-id'et???
  //     center: this.centerZoom,
  //     zoom: 17
  //   });

  //   const tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     minZoom: 10,
  //     attribution: 'Lasse was here'
  //   });

  //   tiles.addTo(this.map)
  // }

  // ngAfterViewInit(): void {
    //   this.initMap()
  // }
  
  constructor(private geolocation: Geolocation) { }
  
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.map = new L.Map('map') // Den her manglede sidst!! Den laver et nyt map.
    L.Marker.prototype.options.icon = markerIcon // Definerer en default marker.
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
    // L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(this.map)
    
    // Get geolocation (Fra mads)
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentPosition = resp.coords;
      console.log('NOTE: GeoLocation (resp):\n',resp)

      let radius = resp.coords.accuracy;
      let myPos: any = [resp.coords.latitude, resp.coords.longitude];
      
      if(this.map){
        L.circle(myPos, { // Laver en cirkel om 'myPos'
          color: 'red',
          fillColor: 'red',
          fillOpacity: 0.5,
          radius
        }).addTo(this.map);
        this.map.locate({setView: true, maxZoom: 16})
      }
       
      // LOCATION KUNNE GODT FINDES! TING SKER:

      // KLIK PÅ KORT:
      this.map.on('click', e => { // Hvis der klikkes på kortet:
        if (this.myMarker) {this.map.removeLayer(this.myMarker)}; // Fjern tidligere hjemmelavede punkt.
        console.log("NOTE, klik (e):",e)
        
        let pointDistance = 24 // Math.round(this.map.distance(myPos,e.latlng)) // Afstand til nyt punkt
          // 'Error: property latlng does not exist on LeafletEvent'
          // Men det virker. Man skal bruge latlng med lille L - ikke stort L.
        // this.myMarker = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(this.map) // Lav en marker
          // .bindPopup("Du har ca. " + pointDistance + " m herhen.").openPopup(); // Pop-up på marker. (Åbner automatisk)
      });


      let pointDistance = Math.round(this.map.distance(myPos,[55.704, 12.587])) // Distance i meter mellem to punkter.

      // Tilføj marker med popup-bind
      let marker1 = new L.Marker([55.704, 12.587],{draggable: true}) // Marstalsgade
                        .bindPopup("Der er omrking " + pointDistance + " m herhen.").openPopup()
      let marker2 = new L.Marker([55.707, 12.580], {icon: greenIcon}) // Korsørgade
                        .bindPopup("You are within " + radius + " meters from this point").openPopup()
      
      this.map.addLayer(marker1);
      this.map.addLayer(marker2);

      // Tilføj markers fra DB:
      this.DB.forEach(element => {
        // Afstand til punkterne:
        let localPosition: any = [element.position.lat, element.position.lng]
        let dist = Math.round(this.map.distance(myPos,localPosition))
        let sf = dist > 1000 ? " km" : " m"
        dist = dist > 1000 ? Math.round(dist/1000) : dist

        // Indtegn punkterne som markers:
        this.map.addLayer(
          new L.Marker(localPosition, {icon: redIcon})
          .bindPopup(element.besked + "\nDu har " + dist+sf +  " herhen.")
        )
      });

      // Controls til map
      let scaleVar = L.control.scale({imperial: false}).addTo(this.map) // scale i venstre hjørne, kun i meter.



    }).catch((error) => { // Error på location
      console.log('Error getting location\n', error.message);
      // alert(error.message)
      this.currentPosition = [55.7 , 12.58]
      // window.history.back() // Brugeren senndes tilbage, hvis location ikke kan findes.
    });
    // End of geolocation(!?)


  } // End of ngOnInit
  
  
  
////// Nedenfor virker fint

gotocountry(c: any){
    console.log('funktion virker: '+c)

     if(c=='af')
   this.map.setView(new L.LatLng(34.5333, 69.1333), 6); // Afghanistan
   if(c=='tn')
   this.map.setView(new L.LatLng(34,9), 6);
  return;

  // Denne funktion må kunne bruges til at finde div. punkter på listen (af forespørgsler).
}

onMapReady(kort: L.Map) {
    this.map = kort;
}

centerMe(){
    this.map.panTo(new L.LatLng(this.currentPosition.latitude, this.currentPosition.longitude));
    this.map.setZoom(16)
  // NOTE: Husk at tage højde for, hvis postion IKKE kan findes. (evt. bare fjern knappen?)
}

roskilde(){
    this.map.panTo(new L.LatLng(55.6168676066129, 12.075702025405377));
  this.map.setZoom(14)
  // NOTE: Husk at tage højde for, hvis postion IKKE kan findes. (evt. bare fjern knappen?)
}


}