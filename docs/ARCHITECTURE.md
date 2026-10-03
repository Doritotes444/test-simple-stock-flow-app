# Arquitectura Frontend - App React (`test-simple-stock-flow-app`)

## 1. Visión General
Esta aplicación frontend está construida con **React, TypeScript y Tailwind CSS / Vite**, estructurada para desacoplar la interfaz de usuario (UI), el estado de la aplicación y la comunicación con la API REST.

```
src/
├── domain/                  <-- Tipos y contratos del negocio (TypeScript interfaces)
├── infrastructure/          <-- Cliente HTTP Axios y llamadas a endpoints
├── application/             <-- Custom Hooks para gestión de estado y lógica de UI
└── presentation/            <-- Componentes, Páginas y Enrutamiento
```

## 2. Separación de Responsabilidades

### `src/domain/types/`
Define las estructuras de datos que representan el modelo del negocio en el frontend (`Product`, `Sale`, `SaleItem`, `User`, `SalesReport`). No dependen de ninguna librería visual ni de Axios.

### `src/infrastructure/api/`
Encapsula todas las llamadas a la API (`productApi.ts`, `saleApi.ts`, `authApi.ts`). Maneja los interceptores para inyectar el token JWT en las cabeceras `Authorization: Bearer <token>`.

### `src/application/hooks/`
Orquesta el estado local y asíncrono (`useProducts`, `useCart`, `useAuth`). Las páginas y componentes no hacen llamadas directas a Axios; consumen estos hooks.

### `src/presentation/`
- **components/**: Componentes visuales puros y reutilizables (`Navbar`, `StatCard`, `ProductCard`, `CartDrawer`).
- **pages/**: Vistas completas (`LoginPage`, `CatalogPage`, `PosPage`, `ReportsPage`).
- **routes/**: Configuración de rutas y protección de acceso por sesión.
