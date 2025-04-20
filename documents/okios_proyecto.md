# OKIOS – SaaS de Gestión Documental Inteligente

**Dominio:** okios.eu  
**Estado:** En desarrollo (fase MVP)  
**Plataforma base:** Supabase + HTML (Tailwind) + futura integración con Qwik  
**Objetivo:** Transformar la gestión documental tradicional en procesos digitales inteligentes, con foco en eficiencia, seguridad y automatización mediante IA.

---

## 🧭 Visión General

OKIOS es una plataforma de gestión documental moderna, diseñada para organizaciones que buscan eficiencia operativa, trazabilidad completa, y flujos de trabajo inteligentes sin papel.

Dirigido a **organismos públicos y privados**, ofrece funcionalidades avanzadas como clasificación automática, flujos de aprobación por rol/suplencia y análisis con inteligencia artificial.

---

## 🌐 Landing Page (actualmente en construcción)

- HTML + Tailwind CSS (versión MVP rápida)
- Diseño moderno, profesional, oscuro y elegante
- Objetivo: captación de leads y primeras instituciones interesadas

### Estructura:
- Hero con claim + llamada a la acción
- Beneficios principales
- Flujo paso a paso de funcionamiento
- Sección dedicada a Inteligencia Artificial
- CTA final y footer legal
- Responsive + base SEO

---

## 🧠 Backend / Infraestructura

**Base:** Supabase (PostgreSQL + Auth + API REST)  
**Características actuales:**

- Registro automático de usuarios desde `auth.users` a `public.users`
- RLS (Row-Level Security) activo
- Migración prevista a Qwik en frontend

### Tablas principales:
- `entities`: gestión de entidades independientes
- `organizations`: departamentos/unidades internas
- `users`: datos de usuario vinculados a entidad y organización
- `roles`, `permissions`, `user_roles`
- Triggers automáticos para sincronización

---

## 🧩 Módulos del sistema (previstos)

### 📁 Gestión Documental
- Subida, organización, control de versiones
- Permisos por rol y organización
- Historial y trazabilidad

### 🔁 Flujos de Aprobación
- Rutas de aprobación configurables
- Suplencias y escalado automático
- Control por tiempo y rol

### 🧠 Inteligencia Artificial
- Clasificación automática de documentos
- Redacción y mejora de contenido
- Búsqueda semántica (por significado, no solo por título)
- Análisis de cumplimiento normativo

### ⚙️ Configuración Flexible
- Adaptación completa por entidad
- Roles, permisos y flujos definidos a medida
- Multi-tenant listo para escalar

---

## 🎯 Objetivos a corto plazo

- Finalizar la **landing page profesional**
- Lanzar una primera beta cerrada
- Establecer base sólida para desarrollo del sistema completo (Qwik + Supabase + IA)

---

## 🛠️ Consideraciones técnicas

- Hosting previsto: Vercel o similar (serverless)
- Dominio ya adquirido: `okios.eu`
- Diseño orientado a velocidad, claridad y seguridad
- Enfoque escalable desde el diseño
