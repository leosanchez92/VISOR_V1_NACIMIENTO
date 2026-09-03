/*
Script controlador de mapa interactivo
Versión: 2.0
Autor: Nelson Sánchez Alarcón (Geógrafo)
Fecha: Marzo-2024
*/

// =============== Map  =============== //
// === Declarar mapa === //
var map = L.map('map', {zoomControl: false, defaultExtentControl: true, minZoom: 10, maxZoom: 20, zoomSnap: 0.5}).setView([-37.4986,-72.6576], 14);

// === Hash (URL dinámica coord) === //
var hash = new L.Hash(map);

// =============== BaseMap  =============== //
// === Declarar basemaps === //
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    opacity: 1.0,
    minZoom: 10,
    maxZoom: 20,
    minNativeZoom: 0,
    maxNativeZoom: 20,
    zIndex: 202,
}).addTo(map);

var ESRIsat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '©<a href="http://www.esri.com/"> Esri</a>',
    opacity: 1.0,
    minZoom: 10,
    maxZoom: 20,
    minNativeZoom: 0,
    maxNativeZoom: 18,
    zIndex: 199,
});

var googleSat = L.tileLayer('http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  attribution: '©<a href="http://www.google.com/"> Google</a>',
    opacity: 1.0,
    minZoom: 10,
    maxZoom: 20,
    minNativeZoom: 0,
    maxNativeZoom: 20,
    zIndex: 197,
});

// === Selector de capa mapa base === //
const osmRadio = document.getElementById('osmRadio');
const esriSatRadio = document.getElementById('esriSatRadio');
const googleSatRadio = document.getElementById('googleSatRadio');

osmRadio.addEventListener('change', function() {
    if (this.checked) {
      // Ocultar capa ESRIsat
      map.removeLayer(ESRIsat);
      map.removeLayer(googleSat)
      // Mostrar capa osm
      map.addLayer(osm);
    }
  });
  
  esriSatRadio.addEventListener('change', function() {
    if (this.checked) {
      // Ocultar capa osm
      map.removeLayer(osm);
      map.removeLayer(googleSat)
      // Mostrar capa ESRIsat
      map.addLayer(ESRIsat);
    }
  });

  googleSatRadio.addEventListener('change', function() {
    if (this.checked) {
      // Ocultar capa osm
      map.removeLayer(osm);
      map.removeLayer(ESRIsat)
      // Mostrar capa GoogleSat
      map.addLayer(googleSat);
    }
  });

// =============== CAPAS  =============== //
// Pane's para el ZIndex de las capas del visor 
map.createPane("mznnac_").style.zIndex = 399;

// Highlight feature global para polígonos 
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 2,
    fillOpacity: 0.7,
    fillColor: 'blue',
  });
};

// === CAPA 1: Manzanas censales === //
// Declara capa prc_zonas
var mzn_nac = L.geoJson(mznNac, {
  style: styleMzn,
  onEachFeature: onEachFeatureMzn,
  zIndex: 500
}).addTo(map);

// Función de estilo 
function styleMzn(feature) {
  return{
    opacity: 1,
    color: 'rgba(34,24,24,1.0)',
    //dashArray: '10,5', (Línea punteada, mayor valor menos segmentos)
    lineCap: 'butt',  
    lineJoin: 'round',  //(Uniones, redondeadas o rectas)
    weight: 2,
    fill: true,
    pane: "mznnac_",
    fillOpacity: 0.3,
    fillColor: '#FDFF65',
    interactive: true,
}};

// Función reset highlight
function resetHighlightMzn(e) {
  mzn_nac.resetStyle(e.target);
};

// Función onEach
function onEachFeatureMzn(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightMzn,

  });

    var popupContent =  '<table class="table table-responsive table-bordered table-sm table-striped">\
                            <tr>\
                              <th scope="" class="align-top">COD MANZENT INE</th>\
                              <td>' +  (feature.properties.MANZENT_I) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">TOTAL PERSONAS (2017)</th>\
                              <td>' +  (feature.properties.TOTAL_PERS) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">TOTAL VIVIENDAS (2017)</th>\
                              <td>' +  (feature.properties.TOTAL_VIVI) + '</td>\
                            </tr>\
                            </table>\
                            '
                            ;
      layer.bindPopup(popupContent,{
        maxHeight: 250
      });
};

// =============== SELECTOR DE CAPAS =============== //
// Función toggleLayer para agregar o quitar una capa según el estado del switch (on-off)
function toggleLayer(layer, switchElement) {
    switchElement.addEventListener('change', function() {
        if (this.checked) {
            map.addLayer(layer);
        } else {
            map.removeLayer(layer);
        }
    });
}

// ID de input switch para cada capa
const mznNacID = document.getElementById('capa1'); // ID switch

// Llamar a la función toggleLayer para cada capa/switch
toggleLayer(mzn_nac, mznNacID); // (Capa declarada, const listener ID)

// =============== TOAST SELECTOR CAPAS =============== //
var toastElement = document.getElementById('miToast');
var toast = new bootstrap.Toast(toastElement);
    toast.show();

// === Botón para selector === //
var controlLayer = L.control.custom({
    position: 'topright',
    content: '<button id="mostrarToastBtn" type="button" class="btn btn-success">' +
        '<i class="fa fa-layer-group"></i>' +
        '</button>',
    classes: 'btn-group-vertical btn-group-sm',
    style: {
        top: '0px',
        margin: '8px',
        padding: '0px 0 0 0',
        cursor: 'pointer',
    },
    datas: {
        'foo': 'bar',
    },
    events: {
        click: function (data) {
            if (toastElement.classList.contains('toast') && toastElement.classList.contains('fade') && toastElement.classList.contains('show')) {
                toast.hide(); // Ocultar el toast si está visible
            } else {
                toast.show(); // Mostrar el toast si no está visible
            }
           
            }
        }
    }
).addTo(map);

// =============== OTROS COMPONENTES =============== //
// === Control zoom === //
var zoom = L.control.zoom({
    zoomInTitle: 'Acercar',
    zoomOutTitle: 'Alejar'
}).addTo(map);

// === Control de búsqueda === //
// Layergroup para el control de búsqueda
var searchLayers = L.layerGroup([
  mzn_nac
]);

// Control parámetros
var searchControl = new L.Control.Search({
  layer: searchLayers, 
  propertyName: 'MANZENT_I', // Valor para búsqueda
  initial: false,
  marker: false,
  //buildTip: function(text, val) {
    //  var type = val.layer.feature.properties.DISTRITO; // Declara campo que visualiza la "clase" o descripción de cada entidad según como se utilice ("buildtip")
      //return '<a href="#" class="'+type+'">'+text+'<b>Distrito '+type+'</b></a>';
    //},
  zoom: 16,
  textPlaceholder: 'Buscar manzent',
  textCancel: 'Cancelar',
  textErr: 'No encontrado',
});
     
searchControl.on('search:locationfound', function(e) {
    e.layer.setStyle({fillColor: '#25c5f5', color: '#25c5f5', weight: 5, fillOpacity: 0.8});
    if(e.layer._popup)
      e.layer.openPopup();
  }).on('search:collapsed', function(e) {
    mzn_zonas.eachLayer(function(layer) {	//restaurar color
      mzn_zonas.resetStyle(layer);
    });
  });

map.addControl(searchControl);

// === MEDICION DE DISTANCIAS (SOLO PC) === //
var measureControl = new L.Control.Measure({
	position: 'topleft',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: 'hectares',
  activeColor: '#ff4564',
});

if (screen.width >= 500) {
  measureControl.addTo(map);
};