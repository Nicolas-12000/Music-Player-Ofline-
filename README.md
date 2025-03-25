# 🎵 Music Player Offline

Un reproductor de música offline con gestión de playlists, construido con TypeScript y React.

## 🚀 Características Principales

- **Reproducción Offline**: Almacena canciones directamente en el navegador
- **Playlists Dinámicas**:
  - Creación/Eliminación de playlists
  - Reordenamiento con Drag & Drop
  - Sistema de Likes integrado
- **Persistencia de Datos**:
  - IndexedDB para archivos de audio
  - LocalStorage para metadatos
- **UI Moderna**:
  - Animaciones fluidas con Tailwind CSS
  - Diseño responsivo
  - Modo claro/oscuro automático

## 🛠 Tecnologías Utilizadas

| Categoría           | Tecnologías                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Frontend            | React, TypeScript, Tailwind CSS, react-beautiful-dnd                        |
| Persistencia        | IndexedDB, LocalStorage                                                     |
| Patrones de Diseño  | Singleton, Observer, Strategy, Decorator                                    |
| Herramientas        | Vite, ESLint, Prettier                                                      |

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/music-player-offline.git
```
2. Instala dependencias:
```bash
npm install
```
3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🗂 Estructura del Proyecto
```
src/
├── core/           # Lógica de negocio
│   ├── entities/   # Entidades principales
│   ├── useCases/   # Casos de uso
│   └── strategies/ # Algoritmos de ordenamiento
├── adapters/       # Implementaciones de almacenamiento
├── ports/          # Interfaces de persistencia
└── ui/             # Componentes React
public/             # Archivos estáticos
```

## 🧩 Patrones de Diseño Implementados

| Patrón    | Ubicación                | Propósito                                      |
|-----------|----------------------|---------------------------------|
| Singleton | PlaylistManager.ts   | Gestión centralizada de playlists |
| Observer  | Playlist.ts          | Actualización en tiempo real de la UI |
| Strategy  | SortStrategies.ts    | Ordenamiento dinámico de canciones |
| Adapter   | IndexedDBAdapter.ts  | Conexión con diferentes almacenamientos |

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License © 2024 [Tu Nombre]

