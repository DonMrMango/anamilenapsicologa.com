# Ana Milena Psicóloga - Sitio Web Profesional

Este es el sitio web profesional de Ana Milena Mejía Ochoa, psicóloga con enfoque sistémico especializada en terapia individual, de pareja y familiar.

## 🚀 Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones
- **Sanity.io** - CMS headless
- **Vercel** - Hosting y deployment

## 📋 Configuración inicial

### 1. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu_sanity_token

# Resend (para emails)
RESEND_API_KEY=tu_resend_api_key

# Upstash Redis (para rate limiting)
UPSTASH_REDIS_REST_URL=tu_upstash_url
UPSTASH_REDIS_REST_TOKEN=tu_upstash_token

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=tu_ga_id

# Cloudflare Turnstile (CAPTCHA)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=tu_turnstile_site_key
TURNSTILE_SECRET_KEY=tu_turnstile_secret_key
```

### 2. Configurar Sanity

1. Ve a [sanity.io](https://sanity.io) y crea una cuenta
2. Crea un nuevo proyecto
3. Copia el Project ID y actualiza las variables de entorno
4. Ejecuta el setup de Sanity:

```bash
npx sanity init --env
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📁 Estructura del proyecto

```
├── app/
│   ├── (site)/          # Páginas del sitio principal
│   ├── admin/           # Panel administrativo de Sanity
│   └── api/            # API routes
├── components/
│   ├── ui/             # Componentes base reutilizables
│   ├── sections/       # Secciones específicas del sitio
│   └── admin/          # Componentes del panel admin
├── lib/
│   ├── sanity/         # Configuración y utilidades de Sanity
│   ├── analytics/      # Configuración de analytics
│   └── utils/          # Utilidades generales
├── sanity/
│   ├── schemas/        # Schemas de contenido
│   └── studio/         # Configuración del Studio
└── public/             # Archivos estáticos
```

## 🎨 Paleta de colores

El sitio utiliza una paleta de colores cálida y profesional:

- **Primario**: `#C17767` (Terracota suave)
- **Secundario**: `#7C9885` (Verde salvia)
- **Neutros**: Escala de grises cálidos
- **Acentos**: Oro `#D4A574` y Rosa `#E4B5B0`

## 🔧 Panel Administrativo

Accede al panel administrativo en `/admin` donde podrás:

- Gestionar entradas del blog
- Administrar testimonios
- Configurar información del sitio
- Revisar mensajes de contacto

## 📱 Responsive Design

El sitio está completamente optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard
3. Deploy automático con cada push a main

### Variables de entorno en producción

Asegúrate de configurar todas las variables de entorno en tu plataforma de deployment.

## 📞 Soporte

Para soporte técnico o modificaciones, contacta al desarrollador del proyecto.

## 📄 Licencia

Este proyecto es propietario y está desarrollado específicamente para Ana Milena Mejía Ochoa.
