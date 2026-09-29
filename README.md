# Visor Territorial Nacimiento

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)

> 📜 **Nota arqueológica**
>
> Este proyecto fue construido hace varios años, cuando la asistencia para programar era buscar soluciones en foros de StackOverflow a las 2 a.m., y reparar el código a prueba y error. Cada función acá fue pensada, escrita y depurada a mano. Hecho con cariño y pocas horas de sueño.

Visor geográfico interactivo construido con [Leaflet](https://leafletjs.com/) y [Bootstrap](https://getbootstrap.com/) para la comuna de Nacimiento. Cuenta con una página de inicio y seis visores temáticos independientes.

## Páginas disponibles

| Página | Ruta | Contenido |
|---|---|---|
| Inicio | `index.html` | Portada de acceso al visor. |
| Zonificación PRC | `1_PRC/index.html` | Zonificación del plan regulador vigente y límite urbano. |
| Territorio comunal | `2_LIMITE/index.html` | Límite comunal y localidades censales rurales. |
| Propiedad fiscal administrada | `3_PROP/index.html` | Propiedad fiscal administrada de la comuna. |
| Manzanas censales urbanas | `4_MZN/index.html` | Manzanas urbanas con información censal. |
| Grifos | `5_GRIFOS/index.html` | Grifos activos del área urbana. |
| Servicios | `6_SERVICIOS/index.html` | Establecimientos de salud y educación. |

## Estructura del proyecto

```
├── index.html          # Página de inicio
├── assets/              # Librerías y estilos comunes
├── img/                  # Imágenes, logos y fondo
├── 1_PRC/                # Visor de zonificación PRC (assets/data/img propios)
├── 2_LIMITE/             # Visor de territorio comunal
├── 3_PROP/               # Visor de propiedad fiscal administrada
├── 4_MZN/                # Visor de manzanas censales urbanas
├── 5_GRIFOS/             # Visor de grifos
└── 6_SERVICIOS/          # Visor de servicios (salud y educación)
```

Cada carpeta de visor incluye sus propios `assets/`, `data/` e `img/`.

## Uso local

Al ser un sitio estático, basta con servir la carpeta del proyecto con cualquier servidor HTTP simple, por ejemplo:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en tu navegador.
