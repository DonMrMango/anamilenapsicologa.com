# Especificación para Rediseño del Blog

## Visión General

El objetivo es transformar la sección de blog actual en un espacio de expresión personal para Ana Milena, inspirado en el paradigma de redes sociales como Facebook e Instagram. Este enfoque busca crear una experiencia familiar e intuitiva tanto para Ana como para sus visitantes.

## Requisitos Funcionales

### 1. Diseño de Interfaz tipo Red Social

- **Muro de Publicaciones**:
  - Formato similar a un feed de red social con publicaciones en orden cronológico invertido
  - Capacidad de ordenar por diferentes criterios (recientes, populares, destacados)
  - Vista en forma de grid similar a Instagram como alternativa
  - Diseño responsive que se adapte a todos los dispositivos

- **Perfil Principal**:
  - Cabecera con foto de perfil, información destacada y botón de contacto
  - Sección de descripción/bio personalizable
  - Estadísticas visibles (número de publicaciones, categorías)

### 2. Integración con TikTok

- **Embebido de Videos**:
  - Capacidad para integrar videos de TikTok mediante URL o código de embebido
  - Vista previa del video dentro del feed
  - Reproducción in-place sin redireccionar al usuario
  - Conteo de reproducciones sincronizado con TikTok (las vistas suman a las del perfil original)

- **Interfaz de Carga Simplificada**:
  - Panel simple para que Ana pueda pegar URL de TikTok y añadir descripción
  - Previsualización antes de publicar
  - Almacenamiento solo de referencia (no del video) para evitar problemas de derechos

### 3. Historias Destacadas

- **Funcionalidad de Destacados**:
  - Sección superior del perfil con círculos estilo Instagram para historias destacadas
  - Agrupación de contenido por temas o categorías personalizables
  - Persistentes (no desaparecen con el tiempo como las historias regulares)
  - Thumbnail personalizable para cada colección

- **Gestión de Destacados**:
  - Interfaz para crear/editar/eliminar colecciones
  - Capacidad para añadir contenido existente a las colecciones
  - Reordenamiento mediante drag & drop

### 4. Sistema de Publicaciones Mejorado

- **Tipos de Contenido**:
  - Texto (artículos, reflexiones)
  - Imágenes (fotografías, infografías)
  - Videos (TikTok, YouTube)
  - Mixto (combinaciones de los anteriores)

- **Características**:
  - Opción para fijar publicaciones importantes
  - Etiquetado con hashtags para mejorar búsqueda
  - Opción para destacar visualmente ciertas publicaciones
  - Vista previa antes de publicar

### 5. Sistema de Configuración para Ana

- **Panel de Preferencias**:
  - Configuración de visualización (grid vs feed)
  - Orden predeterminado de publicaciones (recientes, populares, destacados)
  - Personalización de categorías y etiquetas
  - Gestión de elementos fijados

- **Analíticas**:
  - Métricas básicas de visualizaciones por publicación
  - Estadísticas de interacción (tiempo de lectura, reproducciones)
  - Información sobre dispositivos y fuentes de tráfico

### 6. Interacción de Usuarios

- **Funcionalidades Sociales**:
  - Sistema de "Me gusta" o "Corazones"
  - Comentarios (con moderación)
  - Compartir en redes sociales
  - Envío de mensaje directo a Ana

## Especificaciones Técnicas

### Backend (Sanity.io)

- **Schemas Nuevos o Modificados**:
  - `Post` (ampliado para incluir nuevos tipos y características)
  - `TikTokVideo` (referencia a videos con metadatos)
  - `HighlightCollection` (para historias destacadas)
  - `UserPreferences` (configuración de Ana)

- **Queries Específicas**:
  - Filtrado por tipo de contenido
  - Ordenamiento personalizable
  - Búsqueda por hashtags

### Frontend

- **Componentes Principales**:
  - `SocialFeed` (vista principal tipo muro)
  - `GridGallery` (vista alternativa tipo Instagram)
  - `HighlightStories` (sección de historias destacadas)
  - `TikTokEmbed` (componente para videos de TikTok)
  - `ConfigPanel` (panel de configuración para Ana)

- **Tecnologías**:
  - Framer Motion para animaciones fluidas
  - React Context para gestión de preferencias
  - React Query para carga eficiente de datos
  - TikTok Embed API para integración de videos

## Consideraciones de Experiencia de Usuario

- **Para Ana (administradora)**:
  - Interfaces intuitivas con guías visuales
  - Flujos de trabajo simplificados para publicar y organizar contenido
  - Ayuda contextual y tooltips explicativos
  - Vista previa antes de publicar

- **Para Visitantes**:
  - Experiencia familiar basada en paradigmas de redes sociales
  - Navegación fluida entre diferentes tipos de contenido
  - Funcionalidades de filtrado y búsqueda accesibles
  - Optimización para dispositivos móviles

## Fase de Implementación

### Etapa 1: Fundamentos
- Modificación de schemas de Sanity
- Implementación del feed básico
- Integración simple con TikTok

### Etapa 2: Características Sociales
- Sistema de "Me gusta" y comentarios
- Historias destacadas
- Vista de grid

### Etapa 3: Panel de Configuración
- Preferencias de visualización
- Gestión de contenido destacado
- Analíticas básicas

### Etapa 4: Refinamiento
- Optimización de rendimiento
- Pruebas de usabilidad
- Ajustes visuales finales

## Criterios de Éxito

- Ana puede publicar contenido variado sin asistencia técnica
- Los visitantes pueden consumir el contenido de manera intuitiva
- El sistema se integra correctamente con TikTok
- El rendimiento es óptimo en dispositivos móviles
- La navegación y organización del contenido es clara y eficiente