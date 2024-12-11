// Create a new OpenLayers map instance
const mapOSM = new ol.layer.Tile();
source: new ol.source.OSM();

const map = new ol.Map({
    // Target the map container by its id
    target: "map",
    // Set the view's initial center and zoom level
    view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]), // Center at (0, 0) lon/lat
        zoom: 2, // Initial zoom level
    }),
    // Add a base layer using OpenStreetMap
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
    ],
});

// Funktion zum Hinzufügen eines Tile-Layers
const tileLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: "https://maps.heigit.org/osmlanduse/tiles/osmlanduse:osm_lulc_combined_osm4eo/webmercator/{z}/{x}/{y}.png",
    }),
});

// Karte erstellen und Tile-Layer hinzufügen
const maptwo = new ol.Map({
    target: "maptwo",
    // Set the view's initial center and zoom level
    view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]), // Center at (0, 0) lon/lat
        zoom: 2, // Initial zoom level
    }),
    // Add a base layer using OpenStreetMap
    layers: [tileLayer],
});


