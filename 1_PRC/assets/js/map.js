
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
      fillOpacity: 0.8,
      fillColor: 'rgba(229,182,54,0.0)',
      interactive: false,
  }}

var lu_nac = L.geoJson(limiteUrbano, {
    style: styleLimite,
  }).addTo(map);

  /* SELECTOR CAPAS NORMALES */

  const lunac = document.getElementById('luNac');
  
  lunac.addEventListener('change', function() {
    if (this.checked) {
        // Acción cuando el switch activo está marcado (por ejemplo, activar la capa en tu mapa Leaflet)
        // Suponiendo que 'mapa' es tu objeto de mapa en Leaflet y 'lu_nac' es la capa que deseas activar
        map.addLayer(lu_nac);
    } else {
        // Acción cuando el switch activo no está marcado (por ejemplo, desactivar la capa en tu mapa Leaflet)
        // Suponiendo que 'mapa' es tu objeto de mapa en Leaflet y 'lu_nac' es la capa que deseas desactivar
        map.removeLayer(lu_nac);
    }
  });
  
  
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

