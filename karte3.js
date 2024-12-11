document.getElementById("csvFile").addEventListener("change", readFile);

// OpenLayers Karte initialisieren
const OSM = new ol.layer.Tile({
    source: new ol.source.OSM(),
});
const map = new ol.Map({
    target: "map", // ID des Containers
    layers: [OSM],

    view: new ol.View({
        center: ol.proj.fromLonLat([10.0, 51.0]), // Mittelpunkt Deutschland
        zoom: 6,
    }),
});

function readFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];
    if (!file) {
        alert("Bitte eine Datei auswählen!");
        return;
    }

    // Datei mit PapaParse einlesen
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        delimiter: ",",
        complete: function (results) {
            const data = results.data;
            addCsvDataToMap(data);
        },
        error: function (err) {
            console.error("Fehler beim Einlesen der Datei:", err);
        },
    });
}


function addCsvDataToMap(data) {
    console.log('ADD DATA TO MAP');
    
    const features = [];

    data.forEach((row) => {
        const lon = parseFloat(row.longitude);
        const lat = parseFloat(row.latitude);
        const name = row.name || "Unbekannt";

        if (!isNaN(lon) && !isNaN(lat)) {
            const feature = new ol.Feature({
                geometry: new ol.geom.Point([lat, lon]),
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
        style: function (feature) {
            const name = feature.get('name');
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 3,
                    fill: new ol.style.Fill({ color: "rgba(0, 153, 255, 0.6)" }),
                    stroke: new ol.style.Stroke({ color: "#0059b3", width: 2 }),
                }),
                text: new ol.style.Text({
                    text: name,
                    scale: 1.2,
                    offsetY: -10,
                    fill: new ol.style.Fill({
                        color: '#0059b3',
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff',
                        width: 3,
                    }),
                }),
            });
        },
    });

    map.addLayer(vectorLayer);

    // Karte auf Punkte zentrieren
    const extent = vectorSource.getExtent();
    if (!ol.extent.isEmpty(extent)) {
        map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 10 });
    }
};
