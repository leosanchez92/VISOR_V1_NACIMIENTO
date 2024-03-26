
/* Declarar mapa */
var map = L.map('map', {zoomControl: false, minZoom: 10, maxZoom: 18, zoomSnap: 0.5}).setView([-37.4998284,-72.6782892], 13.5);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    opacity: 1.0,
    minZoom: 10,
    maxZoom: 18,
    minNativeZoom: 0,
    maxNativeZoom: 18,
    zIndex: 402,
}).addTo(map);

var ESRIsat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '©<a href="http://www.esri.com/"> Esri</a>',
    opacity: 1.0,
    minZoom: 10,
    maxZoom: 17,
    minNativeZoom: 0,
    maxNativeZoom: 18,
    zIndex: 399,
});

var openTopo = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'TopOSM was created by User:Ahlzen, with contributions from several others, including Ian Dees, Nick Thompson and Phil Gold.',
    opacity: 1.0,
    minZoom: 10,
    maxZoom: 18,
    minNativeZoom: 0,
    maxNativeZoom: 18,
    zIndex: 397,
});

/* Selector de capa mapa base */

const osmRadio = document.getElementById('osmRadio');
const esriSatRadio = document.getElementById('esriSatRadio');

osmRadio.addEventListener('change', function() {
    if (this.checked) {
      // Ocultar capa ESRIsat
      map.removeLayer(ESRIsat);
      // Mostrar capa osm
      map.addLayer(osm);
    }
  });
  
  esriSatRadio.addEventListener('change', function() {
    if (this.checked) {
      // Ocultar capa osm
      map.removeLayer(osm);
      // Mostrar capa ESRIsat
      map.addLayer(ESRIsat);
    }
  });

// CAPAS
// PANES PARA ZINDEX DE CAPAS

map.createPane("lunac_").style.zIndex = 450;
map.createPane("prc_").style.zIndex = 420;

// PRC NACIMIENTO

function getColor(d) {
    return  d == "ZAM" ? '#FF9F7F' :
            d == "ZAMAP" ? '#CCCC66' :
            d == "ZAP" ? '#990099' :
            d == "ZCC" ? '#FF7F00' :
            d == "ZEC" ? '#C0C0C0' :
            d == "ZED" ? '#BFFF00' :
            d == "ZexAP" ? '#FF7FFF' :
            d == "ZexR" ? '#CCB266' :
            d == "ZexR 1" ? '#CCB266' :
            d == "ZexR 2" ? '#FF7F7F' :
            d == "ZM 1" ? '#FF7F9F' :
            d == "ZM 2" ? '#FF7F9F' :
            d == "ZMC" ? '#FF3F00' :
            d == "ZPR 1" ? '#7FFFBF' :
            d == "ZPR 2" ? '#7FFF00' :
            d == "ZPR 3" ? '#009900' :
            d == "ZPR 4" ? '#99CC66' :
            d == "ZPR 5" ? '#DFFF7F' :
            d == "ZR" ? '#FFFF7F' :
            d == "ZR 1" ? '#FFFF7F' :
            d == "ZR 2" ? '#FFFF7F' :
            d == "ZR 4" ? '#FFFF7F' :
            d == "ZRC" ? '#FFFF00' :
            d == "ZRC 1" ? '#FFFF00' :
            d == "ZRC 2" ? '#FFFF00' :
            d == "ZRM 1" ? '#FFBF00' :
            d == "ZRM 2" ? '#FFBF00' :
            d == "ZST" ? '#99CC00' :
                            '#db3c7c';
}

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
    fillColor: getColor(feature.properties.NUMZON), // campo en el cual se basa getColor para asociar un color
    interactive: true,
}};

function onEachFeaturePRC(feature, layer) {
    var popupContent =  '<table class="table table-responsive table-bordered table-sm table-striped">\
                            <tr>\
                              <th scope="" class="align-top">ZONA</th>\
                              <td>' +  (feature.properties.NUMZON) + '</td>\
                            </tr>\
                            <tr>\
                              <th scope="" class="align-top">GLOSA</th>\
                              <td>' +  (feature.properties.GLOSA_ZONA) + '</td>\
                            </tr>\
                            </table>\
                            '
                            ;
      layer.bindPopup(popupContent,{
        maxHeight: 200,
        maxWidth: 350
      });
  }

  var prc_zonas = L.geoJson(prcZonas, {
    style: stylePRC,
    onEachFeature: onEachFeaturePRC,
    zIndex: 500
  }).addTo(map);

// LU NACIMIENTO

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

var lu_nac = L.geoJson(limiteUrbano, {
    style: styleLimite,
    zIndex: 505
  }).addTo(map);

/* SELECTOR CAPAS 2.0 */

// Función para agregar o quitar una capa según el estado del switch
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
const lunac = document.getElementById('luNac'); // ID switch
const prcZona = document.getElementById('zonPRC'); // ID switch

// Llamar a la función toggleLayer para cada capa/switch
toggleLayer(lu_nac, lunac);
toggleLayer(prc_zonas, prcZona);

/* TOAST */

var toastElement = document.getElementById('miToast');
var toast = new bootstrap.Toast(toastElement);
    toast.show()

/* CONTROL */
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

//ZOOM CONTROL
var zoom = L.control.zoom({
    zoomInTitle: 'Acercar',
    zoomOutTitle: 'Alejar'
}).addTo(map);

/* SELECTOR DE CAPAS BRUTO

const lunac = document.getElementById('luNac'); // getElement: el ID del input switch
  
lunac.addEventListener('change', function() {
  if (this.checked) {
      // Acción cuando el switch activo está marcado
      map.addLayer(lu_nac);
  } else {
      // Acción cuando el switch activo no está marcado 
      map.removeLayer(lu_nac);
  }
});

const prcZona = document.getElementById('zonPRC');

prcZona.addEventListener('change', function() {
  if (this.checked) {
      // Acción cuando el switch activo está marcado 
      map.addLayer(prc_zonas); // var de capa llamada 
  } else {
      // Acción cuando el switch activo no está marcado
      map.removeLayer(prc_zonas); //var de capa llamada
  }
});

*/