# Movie Search App

Una aplicación web moderna para buscar y explorar películas usando la API de TMDB (The Movie Database). Construida con React, TypeScript, y Tailwind CSS.

[Movie Search App]()

## Características

- 🎬 Muestra las películas más populares
- 🔍 Búsqueda en tiempo real
- 📱 Diseño responsivo
- 🎨 Interfaz moderna y minimalista
- 🔄 Carga infinita para películas populares
- 📝 Detalles completos de cada película
- 🌙 Soporte para modo oscuro
- 🌐 Soporte multilenguaje (Español)

## Tecnologías

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- TMDB API
- Vite

## Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/yourusername/movie-search-app.git

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
  ├── components/     # Componentes React
  │   ├── ui/        # Componentes de UI reutilizables
  │   ├── MovieCard  # Tarjeta de película
  │   └── MovieDetails # Detalles de película
  ├── hooks/         # Hooks personalizados
  ├── lib/          # Utilidades y configuración
  └── App.tsx       # Componente principal
```

## Variables de Entorno

```env
VITE_TMDB_API_KEY=your_api_key_here
```

## API

La aplicación utiliza la API de TMDB para obtener datos de películas. Las principales endpoints utilizados son:

- `/movie/popular` - Obtener películas populares
- `/search/movie` - Buscar películas
- `/movie/{id}` - Obtener detalles de una película

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Créditos

- Datos de películas proporcionados por [TMDB](https://www.themoviedb.org/)
- UI Components por [shadcn/ui](https://ui.shadcn.com/)
- Iconos por [Lucide](https://lucide.dev/)