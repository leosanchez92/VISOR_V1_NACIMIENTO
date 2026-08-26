# Visor Territorial Nacimiento

> 📜 **Nota arqueológica**
>
> Este proyecto fue construido hace varios años, cuando la asistencia para programar era buscar soluciones en foros de StackOverflow a las 2 a.m., y reparar el código a prueba y error. Cada función acá fue pensada, escrita y depurada a mano. Hecho con cariño y pocas horas de sueño.

Visor geográfico interactivo construido con [Leaflet](https://leafletjs.com/) y [Bootstrap](https://getbootstrap.com/) para la comuna de Nacimiento. Cuenta con una página de inicio y un visor temático del Plan Regulador Comunal (PRC).

## Páginas disponibles

| Página | Ruta | Contenido |
|---|---|---|
| Inicio | `index.html` | Portada de acceso al visor. |
| Plan Regulador Comunal (PRC) | `1_PRC/index.html` | Zonificación e instrumentos de planificación. |

## Estructura del proyecto

```
├── index.html          # Página de inicio
├── assets/               # Librerías y estilos comunes
├── img/                    # Imágenes, logos y fondo
└── 1_PRC/                    # Visor del Plan Regulador Comunal (assets/data/img propios)
```

## Uso local

Al ser un sitio estático, basta con servir la carpeta del proyecto con cualquier servidor HTTP simple, por ejemplo:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en tu navegador.
