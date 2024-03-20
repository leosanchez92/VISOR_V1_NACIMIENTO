
/* Declarar mapa */
var map = L.map('map', {zoomControl: false, minZoom: 10, maxZoom: 18, zoomSnap: 0.5}).setView([-37.4998284,-72.6782892], 14.5);

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



L.control.custom({
    position: 'topright',
    content : 
              '<button type="button" class="btn btn-success">'+
              '    <i class="fa fa-layer-group"></i>'+
              '</button>',
    classes : 'btn-group-vertical btn-group-sm',
    style   :
    {   top: '70px',
        margin: '14px',
        padding: '0px 0 0 0',
        cursor: 'pointer',
    },
    datas   :
    {
        'foo': 'bar',
    },
    events:
    {
        click: function(data)
        {   if(sidebar.isVisible()){
            sidebar.hide()
            } else {sidebar.show()}
        }
    }
})
.addTo(map);


// Define el control de la barra lateral
var sidebar = L.control.sidebar('sidebar', {
    position: 'right'
}).addTo(map);

/*setTimeout(function () {
    sidebar.show();
}, 500);*/