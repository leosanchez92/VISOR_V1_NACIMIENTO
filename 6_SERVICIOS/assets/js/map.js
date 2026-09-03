/*
Script controlador de mapa interactivo
Versión: 2.0
Autor: Nelson Sánchez Alarcón (Geógrafo)
Fecha: Marzo-2024
*/

// =============== Map  =============== //
// === Declarar mapa === //
var map = L.map('map', {zoomControl: false, defaultExtentControl: true, minZoom: 10, maxZoom: 20, zoomSnap: 0.5}).setView([-37.4860,-72.7534], 11.5);

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
});

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
}).addTo(map);

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

// === CAPA 1: Educación === //
// = Íconos = //
// ICONO ESTÁNDAR
var iconoEduc = L.icon({
  iconUrl: "icon/educ.png",
  iconSize: [22,22],
  popupAnchor: [0, 0],
  iconAnchor: [0,0]
});

// ICONO GRANDE (HIGHLIGHT)
var iconoEducHigh = L.icon({
  iconUrl: "icon/educ.png",
  iconSize: [30,30],
  popupAnchor: [0, 0],
  iconAnchor: [0,0]
});
//

// Declara capa grifos_nac
var educ_nac = L.geoJson(educNac, {
  pointToLayer: function (feature, latlong){
    return L.marker(latlong, {icon: iconoEduc, interactive: true})},
   onEachFeature: onEachEduc,
   }
);

// Función onEach
function onEachEduc(feature, layer) {
  var popupContent =  '<table class="table table-responsive table-bordered table-sm table-striped">\
                            <tr>\
                              <th scope="" class="align-top">NOMBRE</th>\
                              <td>' +  (feature.properties.NOMBRE) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">DIRECCION</th>\
                              <td>' +  (feature.properties.DIRECCION) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">Nº</th>\
                              <td>' +  (feature.properties.NUMERO) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">REFERENCIA</th>\
                              <td>' +  (feature.properties.REFERENCIA) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">X</th>\
                              <td>' +  (feature.properties.LONGITUD) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">Y</th>\
                              <td>' +  (feature.properties.LATITUD) + '</td>\
                            </tr>\
                            </table>\
                            '
                            ;
      layer.bindPopup(popupContent,{
        maxHeight: 250
      });
  layer.on({
    'mouseover': function(e){
      layer.setIcon(iconoEducHigh)
    },
    'mouseout': function(e){
      layer.setIcon(iconoEduc)
    }
  })
};

// === CAPA 2: Salud === //
// = Íconos = //
// Función para ícono inicial
function iconoInicial(iconUrl) {
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [22,22],
    popupAnchor: [0, 0],
    iconAnchor: [0,0]
  });
};

// Declara variables con los íconos iniciales para función iconoInicial
var iconoHospital = iconoInicial("icon/hosp.png");
var iconoCecosf = iconoInicial("icon/cecosf.png");
var iconoCentros = iconoInicial("icon/centrosalud.png");
var iconoPSR = iconoInicial("icon/rural.png");
var iconoDental = iconoInicial("icon/dental.png");

// Función para ícono high
function iconoHigh(iconUrl){
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [30,30],
    popupAnchor: [0, 0],
    iconAnchor: [0,0]
  })
};

// Declara variables con los íconos highlight para función iconoHigh
var iconoHospitalHigh = iconoHigh("icon/hosp.png");
var iconoCecosfHigh = iconoHigh("icon/cecosf.png");
var iconoCentrosHigh = iconoHigh("icon/centrosalud.png");
var iconoPSRHigh = iconoHigh("icon/rural.png");
var iconoDentalHigh = iconoHigh("icon/dental.png");

// Función que asigna íconos según clase y atributo
function iconSalud(feature) {
  var icon;
  if (feature.properties.CAT == 'hospital') {icon = iconoHospital;}
  else if (feature.properties.CAT == 'CECOSF') {icon = iconoCecosf;}
  else if (feature.properties.CAT == 'centro_salud') {icon = iconoCentros;}
  else if (feature.properties.CAT == 'PSR') {icon = iconoPSR;}
  else if (feature.properties.CAT == 'dental') {icon = iconoDental;}
  return icon
};

// Variable que asigna ícono normal y high según clase y atributo
var iconos = {
  'hospital': { normal: iconoHospital, high: iconoHospitalHigh },
  'CECOSF': { normal: iconoCecosf, high: iconoCecosfHigh },
  'centro_salud': { normal: iconoCentros, high: iconoCentrosHigh },
  'PSR': { normal: iconoPSR, high: iconoPSRHigh },
  'dental': { normal: iconoDental, high: iconoDentalHigh }
};

// Declara capa salud_nac
var salud_nac = L.geoJson(saludNac, {
  pointToLayer: function (feature, latlong){
    return L.marker(latlong, {icon: iconSalud(feature), interactive: true})},
   onEachFeature: onEachSalud
   }).addTo(map);

// Función onEach
function onEachSalud(feature, layer) {
  var popupContent =  '<table class="table table-responsive table-bordered table-sm table-striped">\
                            <tr>\
                              <th scope="" class="align-top">TIPO</th>\
                              <td>' +  (feature.properties.TIPO) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">NOMBRE</th>\
                              <td>' +  (feature.properties.NOMBRE) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">DIRECCION</th>\
                              <td>' +  (feature.properties.DIRECCION) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">DEPENDENCIA</th>\
                              <td>' +  (feature.properties.DEPEN_A) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">MODALIDAD</th>\
                              <td>' +  (feature.properties.MODALIDAD) + '</td>\
                            </table>\
                            '
                            ;
      layer.bindPopup(popupContent,{
        maxHeight: 250
      });
      layer.on({
        'mouseover': function(e) {
          var icono = iconos[feature.properties.CAT];
          if (icono) {
            layer.setIcon(icono.high);
          }
        },
        'mouseout': function(e) {
          var icono = iconos[feature.properties.CAT];
          if (icono) {
            layer.setIcon(icono.normal);
          }
        }
      });
};

// === CAPA 3: Límite comunal === //
// Declara capa limite_nac
var limite_nac = L.geoJson(limiteNac, {
  style: styleLimite,
  zIndex: 505 
}).addTo(map);

// Función estilo
function styleLimite(feature) {
  return{
    fillOpacity:0,
    opacity: 1,
    color: 'rgba(219,108,58, 1.0)',
    //dashArray: '10,5', (Línea punteada, mayor valor menos segmentos)
    lineCap: 'butt',  
    lineJoin: 'round',  //(Uniones, redondeadas o rectas)
    weight: 4.0,
    fill: false,
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
const educNacID = document.getElementById('capa1'); // ID switch
const saludNacID = document.getElementById('capa3'); // ID switch
const limiteNacID = document.getElementById('capa4'); // ID switch

// Llamar a la función toggleLayer para cada capa/switch
toggleLayer(educ_nac, educNacID); // (Capa declarada, const listener ID)
toggleLayer(salud_nac, saludNacID); 
toggleLayer(limite_nac, limiteNacID); 

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
  educ_nac,
  salud_nac
]);

// Control parámetros
var searchControl = new L.Control.Search({
  layer: searchLayers, 
  propertyName: 'NOMBRE', // Valor para búsqueda
  initial: false,
  marker: false,
  buildTip: function(text, val) {
    var type = val.layer.feature.properties.CLASE; // Declara campo que visualiza la "clase" o descripción de cada entidad según como se utilice ("buildtip")
    return '<a href="#" class="'+type+'">'+text+'<b>'+type+'</b></a>';
  },
  zoom: 19.5,
  textPlaceholder: 'Buscar grifo por direccion',
  textCancel: 'Cancelar',
  textErr: 'No encontrado',
  });
     
  searchControl.on('search:locationfound', function(e) {
    e.layer.openPopup();
    e.layer.setIcon(iconoGrifosSearch)
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
