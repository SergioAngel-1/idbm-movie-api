# Buscador de Películas

Una aplicación web moderna para buscar y explorar películas utilizando la API de OMDB. Construida con React, TypeScript y Tailwind CSS.

[Movie Search App](https://moviesearchibdm.netlify.app/)

## Características

- 🎬 Muestra películas populares del 2024
- 🔍 Búsqueda en tiempo real con debouncing
- 📱 Diseño totalmente responsive
- 🎨 Interfaz moderna y minimalista
- 🔄 Funcionalidad de "Cargar más películas"
- 📝 Modal detallado de información
- 🌙 Soporte para tema claro/oscuro
- 🎯 Protección con Error Boundary
- ⚡ Rendimiento rápido y optimizado

## Tecnologías

- React 18
- TypeScript
- Tailwind CSS
- Componentes shadcn/ui
- API de OMDB
- Vite
- Iconos de Lucide React

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Estructura del Proyecto

```
src/
  ├── components/        # Componentes React
  │   ├── ui/           # Componentes de shadcn/ui
  │   ├── MovieCard     # Componente de tarjeta de película
  │   ├── MovieDetails  # Diálogo de detalles de película
  │   ├── ThemeToggle   # Selector de tema
  │   ├── ThemeProvider # Proveedor de contexto para tema
  │   └── ErrorBoundary # Componente de manejo de errores
  ├── hooks/            # Hooks personalizados
  │   ├── use-debounce  # Debouncing para búsqueda
  │   └── use-toast     # Notificaciones toast
  ├── lib/              # Utilidades y APIs
  │   ├── omdb.ts       # Integración con API OMDB
  │   └── utils.ts      # Funciones auxiliares
  └── App.tsx           # Componente principal
```

## Integración con API

La aplicación utiliza la API de OMDB (Open Movie Database) para obtener datos de películas. Principales endpoints:

- Búsqueda de películas por título
- Obtención de información detallada
- Exploración de películas por año

Nota: La clave de API está actualmente hardcodeada en la aplicación con fines demostrativos. En un entorno de producción, debería moverse a variables de entorno.

## Características en Detalle

- **Búsqueda en Tiempo Real**: Implementa debouncing para optimizar llamadas a la API
- **Carga Infinita**: Funcionalidad de "Cargar más" para explorar películas
- **Diseño Responsive**: Optimizado para todos los tamaños de pantalla
- **Soporte de Temas**: Modo claro/oscuro con detección automática del sistema
- **Manejo de Errores**: Recuperación elegante con error boundaries
- **Accesibilidad**: Construido pensando en la accesibilidad usando componentes shadcn/ui

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Créditos

- Datos de películas proporcionados por [OMDB API](http://www.omdbapi.com/)
- Componentes UI por [shadcn/ui](https://ui.shadcn.com/)
- Iconos por [Lucide React](https://lucide.dev/)