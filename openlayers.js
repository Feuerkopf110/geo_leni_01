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

// Karte initialisieren
const karte = new ol.layer.Tile({
    target: "karte",
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([10.0, 51.0]), // Zentrum: Deutschland
        zoom: 6,
    }),
});
document.getElementById("csvFile").addEventListener("change", function (event) {
    if (!file) {
        alert("Bitte eine Datei auswählen!");
        return;
    }

    // Datei mit PapaParse einlesen
    Papa.parse(file, {
        header: true, // Erste Zeile als Header interpretieren
        skipEmptyLines: true,
        complete: function (results) {
            const data = results.data; // Array mit CSV-Daten
            addCsvDataToMap(data);
        },
        error: function (err) {
            console.error("Fehler beim Einlesen der Datei:", err);
        },
    });
}),
    function addCsvDataToMap(data) {
        const features = [];

        data.forEach((row) => {
            const lon = parseFloat(row.longitude);
            const lat = parseFloat(row.latitude);
            const name = row.name || "Unbekannt";

            if (!isNaN(lon) && !isNaN(lat)) {
                const feature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
                    name: name,
                });

                features.push(feature);
            }
        });

        // Quelle und Layer erstellen
        const vectorSource = new ol.source.Vector({
            features: features,
        });

        const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({ color: "rgba(0, 153, 255, 0.6)" }),
                    stroke: new ol.style.Stroke({ color: "#0059b3", width: 2 }),
                }),
            }),
        });

        map.addLayer(vectorLayer);
    };
