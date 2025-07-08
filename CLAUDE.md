# CLAUDE.md - Guía de Buenas Prácticas de Seguimiento

Este archivo sirve como guía para mantener los más altos estándares de calidad y buenas prácticas en el desarrollo y mantenimiento del sitio web de Ana Milena Psicóloga.

## 🔄 Control de Versiones

### Nomenclatura de Versiones
- **Versión X.Y.Z** (siguiendo Semantic Versioning):
  - **X**: Cambios mayores o rediseños completos
  - **Y**: Nuevas funcionalidades que mantienen compatibilidad
  - **Z**: Correcciones de bugs y mejoras menores

### Convenciones para Commits
1. Usar mensajes descriptivos y concisos que expliquen "qué" y "por qué"
2. Formato recomendado: `[tipo]: descripción concisa`
   - **feat**: Nueva funcionalidad
   - **fix**: Corrección de bug
   - **docs**: Cambios en documentación
   - **style**: Cambios que no afectan el código (formato, espacios, etc.)
   - **refactor**: Cambios de código que no corrigen bugs ni añaden funcionalidades
   - **perf**: Mejoras de rendimiento
   - **test**: Añadir o corregir tests
   - **chore**: Cambios en el proceso de build o herramientas auxiliares

### Ramas
- **main**: Código en producción
- **develop**: Desarrollo activo
- **feature/nombre-funcionalidad**: Para nuevas funcionalidades
- **fix/nombre-problema**: Para correcciones de bugs
- **hotfix/nombre**: Para correcciones urgentes en producción

## 📋 Proceso de Desarrollo

### Antes de Comenzar
1. Siempre hacer `git pull` para obtener los últimos cambios
2. Verificar la rama correcta para el tipo de cambio
3. Crear una nueva rama si es necesario

### Durante el Desarrollo
1. Realizar commits frecuentes y específicos
2. Seguir los estándares de código del proyecto
3. Documentar cambios importantes en el código

### Antes de Push/Merge
1. Ejecutar pruebas locales
2. Validar el código con linters y formatters
3. Verificar que la app funciona en diferentes tamaños de pantalla

## 🧪 Testing y Validación

### Checklist Antes de Despliegue
- [ ] Tests unitarios pasan (cuando estén implementados)
- [ ] Rendimiento aceptable en Lighthouse (mínimo 90 en Performance, 100 en Accessibility)
- [ ] Validación responsiva en dispositivos clave (móvil, tablet, desktop)
- [ ] Funcionalidad cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Formularios funcionan correctamente
- [ ] No hay errores en consola
- [ ] SEO optimizado

## 🚀 Despliegue

### Proceso de Despliegue
1. Merge a `main` solo de código estable y probado
2. Verificar despliegue automático en Vercel
3. Validar el sitio en producción después del despliegue
4. Etiquetar releases importantes con el número de versión

## 📊 Monitoreo

### Herramientas de Monitoreo
- Google Analytics para métricas de uso
- Vercel Analytics para rendimiento
- Revisar logs periódicamente

## 🔧 Comandos Útiles

```bash
# Iniciar entorno de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción local
npm run start

# Ejecutar linting
npm run lint
```

## 🛡️ Seguridad

### Mejores Prácticas
- Nunca subir credenciales o archivos .env al repositorio
- Mantener dependencias actualizadas regularmente
- Revisar y aplicar parches de seguridad
- Implementar rate limiting en endpoints de API

## 📱 Actualización del Blog

### Proceso para Actualizar Blog
1. Usar el panel administrativo en `/admin`
2. Seguir las guías de estilo definidas
3. Optimizar imágenes antes de subirlas
4. Verificar que los enlaces funcionan correctamente

## 🤝 Colaboración

### Proceso de Pull Request
1. Describir claramente los cambios realizados
2. Referenciar issues relacionados si existen
3. Incluir capturas de pantalla para cambios visuales
4. Solicitar revisión a otro desarrollador cuando sea posible

---

*Este documento debe ser revisado y actualizado periódicamente para reflejar las mejores prácticas actuales.*