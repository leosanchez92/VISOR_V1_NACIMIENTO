/*
Script controlador de mapa interactivo
Versión: 2.0
Autor: Nelson Sánchez Alarcón (Geógrafo)
Fecha: Marzo-2024
*/

// =============== Map  =============== //
// === Declarar mapa === //
var map = L.map('map', {zoomControl: false, defaultExtentControl: true, minZoom: 10, maxZoom: 20, zoomSnap: 0.5}).setView([-37.5001,-72.6730], 15);

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
      // Mostrar capa googleSat
      map.addLayer(googleSat);
    }
  });

// =============== CAPAS  =============== //
// Pane's para el ZIndex de las capas del visor 
map.createPane("grifosnac_").style.zIndex = 420;

// === CAPA 1: Grifos === //
// = Íconos = //
// ICONO ESTÁNDAR
var iconoGrifos = L.icon({
  iconUrl: "icon/grifos_.png",
  iconSize: [22,22],
  popupAnchor: [1, -1],
  iconAnchor: [0,0]
});

// ICONO GRANDE (HIGHLIGHT)
var iconoGrifosHigh = L.icon({
  iconUrl: "icon/grifos_.png",
  iconSize: [30,30],
  popupAnchor: [1, -1],
  iconAnchor: [0,0]
});
//

// Función de estilo
function styleGrifos(feature) {
  return{
    pane: "grifosnac_",
}};

// Declara capa grifos_nac
var grifos_nac = L.geoJson(grifosNac, {
  pointToLayer: function (feature, latlong){
    return L.marker(latlong, {icon: iconoGrifos, interactive: true})},
   onEachFeature: onEachGrifos,
   }
);

// Función onEach
function onEachGrifos(feature, layer) {
  var popupContent =  '<table class="table table-responsive table-bordered table-sm table-striped">\
                            <tr>\
                              <th scope="" class="align-top">CÓDIGO</th>\
                              <td>' +  (feature.properties.COD_GRIFO) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">EMPRESA</th>\
                              <td>' +  (feature.properties.EMPRESA) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">DIRECCIÓN</th>\
                              <td>' +  (feature.properties.DIRECCION) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">CATEGORIA RIESGO</th>\
                              <td>' +  (feature.properties.CAT_ZONA_RIESGO) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">AÑO INSTALACIÓN</th>\
                              <td>' +  (feature.properties.ANNO_INSTAL) + '</td>\
                            </tr>\
                            </table>\
                            '
                            ;
      layer.bindPopup(popupContent,{
        maxHeight: 250
      });
  layer.on({
    'mouseover': function(e){
      layer.setIcon(iconoGrifosHigh)
    },
    'mouseout': function(e){
      layer.setIcon(iconoGrifos)
    }
  })
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
};

// ID de input switch para cada capa
const grifosNacID = document.getElementById('capa1'); // ID switch

// Llamar a la función toggleLayer según cada capa/switch
toggleLayer(grifos_nac, grifosNacID); // (Capa declarada, const listener ID)

// =============== TOAST SELECTOR CAPAS =============== //
var toastElement = document.getElementById('miToast');
var toast = new bootstrap.Toast(toastElement);
    toast.show()

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
  grifos_nac
]);

// Control parámetros
var searchControl = new L.Control.Search({
  layer: searchLayers, 
  propertyName: 'DIRECCION', // Valor para búsqueda
  initial: false,
  marker: false,
  //buildTip: function(text, val) {
     // var type = val.layer.feature.properties.DISTRITO; // Declara campo que visualiza la "clase" o descripción de cada entidad según como se utilice ("buildtip")
      //return '<a href="#" class="'+type+'">'+text+'<b>Distrito '+type+'</b></a>';
    //},
  zoom: 19.5,
  textPlaceholder: 'Buscar grifo por direccion',
  textCancel: 'Cancelar',
  textErr: 'No encontrado',
});
     
  searchControl.on('search:locationfound', function(e) {
    e.layer.openPopup();
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
