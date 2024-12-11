// OpenLayers Karte initialisieren
const OSM = new ol.layer.Tile({
    source: new ol.source.OSM(),
});
const geojson = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: "data/bundeslaender.geojson", // GeoJSON-Datei für Bundesländer
        format: new ol.format.GeoJSON(),
    }),
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: "rgba(0, 123, 255, 0.5)", // Transparente blaue Flächen
        }),
        stroke: new ol.style.Stroke({
            color: "#007bff",
            width: 2,
        }),
    }),
});

// Punkt-Layer für Windkraftanlagen
const pointLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: "data/numberOfWindTurbinesByLand.geojson", // Punktdaten-GeoJSON für Windkraftanlagen
        format: new ol.format.GeoJSON(),
    }),
    style: circles,
});
function circles(feature) {
    const value = feature.getProperties().value; // Wert des Punktes (z. B. Anzahl)
    const radiusMin = 2.2;
    const radiusMax = 20;
    const valueMin = 12; // Minimaler Wert
    const valueMax = 100; // Maximaler Wert

    // Radius proportional zum Wert skalieren
    let radius = radiusMin * Math.sqrt(value / valueMin);

    return new ol.style.Style({
        zIndex: -feature.getProperties().value,
        image: new ol.style.Circle({
            radius: radius,
            fill: new ol.style.Fill({
                color: "rgba(255, 0, 0, 0.7)", // Rote Punkte
            }),
            stroke: new ol.style.Stroke({
                color: "#ff0000",
                width: 1,
            }),
        }),
    });
}
const map = new ol.Map({
    target: "map", // ID des Containers
    layers: [OSM, geojson, pointLayer],

    view: new ol.View({
        center: ol.proj.fromLonLat([10.0, 51.0]), // Mittelpunkt Deutschland
        zoom: 6,
    }),
});