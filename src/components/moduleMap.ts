import L from 'leaflet';

export const stationIcon: L.Icon = L.icon({
  iconUrl: '/assets/img/pin.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, 55]
});


export const stationHighlightIcon: L.Icon = L.icon({
  iconUrl: '/assets/img/highlight-pin.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
});


export const defaultMapSettings = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  zoom: 4,
  maxZoom: 16,
  minZoom: 2
}


export interface MapSettings {
  url: string,
  zoom: number,
  maxZoom: number,
  minZoom: number,

}