# 🤝 Business 95 (Frontend)

Sistema Web para el Control y la Gestión de Inversiones

**Business 95** es una aplicación web diseñada para facilitar la gestión de inversiones y promover la transparencia entre los socios. A través de esta interfaz, los usuarios pueden consultar, registrar y analizar información financiera proveniente de la API del sistema, optimizando la visualización y toma de decisiones.

## 🧩 Descripción del repositorio

Este repositorio contiene el **frontend** de _Business 95_, desarrollado con **Vue 3**, **Vite** y **TypeScript**.  
Se conecta a la API del backend (Spring Boot) para ofrecer una experiencia moderna, rápida y modular en la gestión de inversiones y socios.

## 📦 Alcance del Frontend

- Integración con la API REST de _Business 95_.
- Validaciones de formularios con `Yup` y `Vee-Validate`.
- Manejo de estado y datos con `@tanstack/vue-query` y `Pinia`.

## 🗂️ Estructura del Proyecto

```
src
├── api                     # Módulos de comunicación con la API (axios)
│
├── assets                  # Archivos estáticos y estilos
│
├── common
│   ├── interfaces          # Tipos e interfaces globales
│   ├── utils               # Funciones reutilizables
│   ├── components          # Componentes globales
│   ├── composables         # Lógica reutilizable basada en Composition API
│   └── config              # Configuraciones globales (ej. Yup)
│
├── modules                 # Módulos funcionales del sistema
│   ├── views               # Vistas/páginas principales del módulo
│   ├── components          # Componentes propios del módulo
│   ├── interfaces          # Tipos e interfaces específicas del módulo
│   ├── stores              # Estados locales (Pinia)
│   └── services            # Servicios específicos del módulo
|
├── views                   # Vistas globales (ej. NotFound.vue)
│
├── router
│   └── index.ts            # Definición de rutas
│
├── App.vue
├── main.ts
└── env.d.ts
```

# ⚙️ Variables de entorno

Las variables de entorno están definidas en el archivo `.env` (y documentadas en `.env.template`):

```env
VITE_STAGE=dev
VITE_B95_API_URL=http://localhost:8082/api/v1
```

Estas permiten configurar el entorno y la URL base de la API utilizada por Axios.

# 🌐 Configuración de Axios

El cliente HTTP se define en `src/api/b95.ts`:

```ts
import axios from 'axios';

const b95Api = axios.create({
  baseURL: import.meta.env.VITE_B95_API_URL,
});

export { b95Api };
```

Esto permite realizar peticiones centralizadas a la API Backend usando la URL configurada en `.env`.

# 🧪 Tecnologías utilizadas

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Vee-Validate](https://vee-validate.logaretm.com/) + [Yup](https://github.com/jquense/yup)
- [TanStack Vue Query](https://tanstack.com/query/latest/docs/framework/vue/overview)
- [Pinia](https://pinia.vuejs.org/)
- [Axios](https://axios-http.com/)

# Clonar Repositorio

```
git clone git@github.com:MiltonDiazCO/business95-front.git
git clone https://github.com/MiltonDiazCO/business95-front.git
```

# 🚀 Project Setup

## Instalar dependencias

```sh
npm install
```

## Compilar y recargar automáticamente para desarrollo

```sh
npm run dev
```

## Verificar tipos, compilar y minificar para producción

```sh
npm run build
```

## Lint con [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

# 🧭 Scripts disponibles

| Comando              | Descripción                                 |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Inicia el servidor de desarrollo            |
| `npm run build`      | Compila el proyecto para producción         |
| `npm run preview`    | Ejecuta la build localmente                 |
| `npm run type-check` | Verifica los tipos con TypeScript           |
| `npm run lint`       | Ejecuta ESLint con correcciones automáticas |
| `npm run format`     | Formatea el código con Prettier             |

---

# 💡 Requisitos

- Node.js **20.19.0 o superior**
- npm **9.0+**

© 2025 – Equipo de Desarrollo Business 95
