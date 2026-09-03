/*
Script controlador de mapa interactivo
Versión: 2.0
Autor: Nelson Sánchez Alarcón (Geógrafo)
Fecha: Marzo-2024
*/

// =============== Map  =============== //
// === Declarar mapa === //
var map = L.map('map', {zoomControl: false, defaultExtentControl: true, minZoom: 10, maxZoom: 20, zoomSnap: 0.5}).setView([-37.4998284,-72.6782892], 13.5);

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
const osmRadio = document.getElementById('osmRadio'); // Id de radio input correspondiente
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
      // Mostrar capa Googlesat
      map.addLayer(googleSat);
    }
  });

// =============== CAPAS  =============== //
// Pane's para el ZIndex de las capas del visor 
map.createPane("lunac_").style.zIndex = 399;
map.createPane("prc_").style.zIndex = 398;

// Highlight feature global para polígonos 
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 2,
    fillOpacity: 0.7
  });
};

// === CAPA 1: PRC Nacimiento === //
// Declara capa prc_zonas
var prc_zonas = L.geoJson(prcZonas, {
  style: stylePRC,
  onEachFeature: onEachFeaturePRC,
  zIndex: 500
}).addTo(map);

// GetColor para categorización
function getColor(d) {
    return  d == "ZAM" ? '#FF9F7F' :
            d == "ZAMAP" ? '#CCCC66' :
            d == "ZAP" ? '#990099' :
            d == "ZCC" ? '#FF7F00' :
            d == "ZEC" ? '#C0C0C0' :
            d == "ZED" ? '#BFFF00' :
            d == "ZexAPC" ? '#FF7FFF' :
            d == "ZexR-1" ? '#CCB266' :
            d == "ZexR-2" ? '#FF7F7F' :
            d == "ZM-1" ? '#FF7F9F' :
            d == "ZM-2" ? '#FF7F9F' :
            d == "ZMC" ? '#FF3F00' :
            d == "ZPR-1" ? '#7FFFBF' :
            d == "ZPR-2" ? '#7FFF00' :
            d == "ZPR-3" ? '#009900' :
            d == "ZPR-4" ? '#99CC66' :
            d == "ZPR-5" ? '#DFFF7F' :
            d == "ZR-1" ? '#FFFF7F' :
            d == "ZR-2" ? '#FFFF7F' :
            d == "ZR-3" ? '#FFFF7F' :
            d == "ZR-4" ? '#FFFF7F' :
            d == "ZRC-1" ? '#FFFF00' :
            d == "ZRC-2" ? '#FFFF00' :
            d == "ZRM-1" ? '#FFBF00' :
            d == "ZRM-2" ? '#FFBF00' :
            d == "ZST" ? '#99CC00' :
            d == "ZEP" ? '#9d6793' :
            d == "AGUA" ? '#4359ff' :
            d == "AV" ? '#01ff38' :
                            '#db3c7c';
}

// Función de estilo 
function stylePRC(feature) {
  return{
    opacity: 1,
    color: 'rgb(0, 0, 0)',
    //dashArray: '10,5', (Línea punteada, mayor valor menos segmentos)
    lineCap: 'butt',  
    lineJoin: 'round',  //(Uniones, redondeadas o rectas)
    weight: 0.5,
    fill: true,
    pane: "prc_",
    fillOpacity: 0.6,
    fillColor: getColor(feature.properties.ZONA_NOM), // campo en el cual se basa getColor para asociar un color
    interactive: true,
}};

// Función reset highlight
function resetHighlightPRC(e) {
  prc_zonas.resetStyle(e.target);
};

// Función onEach
function onEachFeaturePRC(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightPRC,

  });

  var popupContent =  '<table class="table table-responsive table-bordered table-sm table-striped">\
                            <tr>\
                              <th scope="" class="align-top">ZONA</th>\
                              <td>' +  (feature.properties.ZONA_NOM) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">GLOSA</th>\
                              <td>' +  (feature.properties.ZONA_GLOSA) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">USOS PERMITIDOS</th>\
                              <td>' +  (feature.properties.USOS_PERMITIDOS) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">USOS_PROHIBIDOS</th>\
                              <td>' +  (feature.properties.USOS_PROHIBIDOS) + '</td>\
                            </tr>\
                            </table>\
                            '
                            ;
      layer.bindPopup(popupContent,{
        maxHeight: 250
  });
};

// === CAPA 2: LU Nacimiento === //
// Declara capa lu_nac
var lu_nac = L.geoJson(limiteUrbano, {
  style: styleLimite,
  zIndex: 505
}).addTo(map);

// Función de estilo
function styleLimite(feature) {
    return{
      fillOpacity:0,
      opacity: 1,
      color: 'rgba(219,58,58, 1.0)',
      //dashArray: '10,5', (Línea punteada, mayor valor menos segmentos)
      lineCap: 'butt',  
      lineJoin: 'round',  //(Uniones, redondeadas o rectas)
      weight: 4.0,
      fill: false,
      pane: "lunac_",
      fillOpacity: 0.8,
      fillColor: 'rgba(229,182,54,0.0)',
      interactive: false,
}};

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
};

// ID de input switch para cada capa
const lunac = document.getElementById('luNac'); // ID switch
const prcZona = document.getElementById('zonPRC'); // ID switch

// Llamar a la función toggleLayer según cada capa/switch
toggleLayer(lu_nac, lunac); // (Capa declarada, const listener ID)
toggleLayer(prc_zonas, prcZona);

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
    prc_zonas
]);

// Control parámetros
var searchControl = new L.Control.Search({
  layer: searchLayers, 
  propertyName: 'ZONA_NOM', // Valor para búsqueda
  initial: false,
  marker: false,
  buildTip: function(text, val) {
      var type = val.layer.feature.properties.ZONA_GLOSA; // Declara campo que visualiza la "clase" o descripción de cada entidad según como se utilice ("buildtip")
      return '<a href="#" class="'+type+'">'+text+'<b>'+type+'</b></a>';
    },
  zoom: 15.5,
  textPlaceholder: 'Buscar zona',
  textCancel: 'Cancelar',
  textErr: 'No encontrado',
  });

searchControl.on('search:locationfound', function(e) {
    e.layer.setStyle({fillColor: '#25c5f5', color: '#25c5f5', weight: 5, fillOpacity: 0.8});
    if(e.layer._popup)
      e.layer.openPopup();
  }).on('search:collapsed', function(e) {
    prc_zonas.eachLayer(function(layer) {	//restaurar color
      prc_zonas.resetStyle(layer);
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