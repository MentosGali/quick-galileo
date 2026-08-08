# 🎨 quick-galileo

> **Pixel Art & Animation Tool for x86 Assembly / DOS**

**quick-galileo** is a web-based pixel art and animation editor designed for retro development workflows using **VGA graphics and x86 Assembly under DOS**.

It allows you to create graphical and text-mode resources and export them directly into `.asm` files that can be integrated into Assembly projects.

**Status:** 🟢 **Actively developed**

---

## 📖 Description

**quick-galileo** is a web-based pixel art and animation tool designed for retro development using **VGA graphics and x86 Assembly**.

The project allows users to create graphical resources through a visual interface and automatically export them as `.asm` files, making them easier to integrate into DOS Assembly programs.

It provides two main environments:

* 🖼️ **Video Mode:** graphical editing at VGA 320×200 resolution.
* 💻 **Text Mode:** BIOS 80×25 text-mode editing.

The application runs entirely in the browser and requires no backend, framework, or build process.

---

## ✨ Features

### 🖼️ Video Mode — 320×200

* Pixel art editor
* Layer-based workflow
* Rectangle tool
* Pixel tool
* Stamp tool
* Selection tool
* Grid toggle
* Onion skinning
* Layer clearing
* Animation-oriented workflow
* 256-color VGA palette

### 💻 Text Mode — BIOS 80×25

* Text-mode canvas
* Color attribute support
* Box drawing tools
* Text input
* Selection and movement
* BIOS terminal-style visual editing

### 📦 Export System

* Export resources as `.asm`
* Layer-based resource generation
* Multiple files exported at once
* Automatic `.zip` packaging
* JSZip integration
* Automatic generation of Assembly resources and macro usage
* `.bat` file included to automate assembly and linking

---

## 🛠️ Technologies

| Technology             | Usage                                                |
| ---------------------- | ---------------------------------------------------- |
| **HTML5**              | Application structure and UI                         |
| **CSS3**               | Styling, responsive layout and dark theme            |
| **Vanilla JavaScript** | Application logic, rendering, interaction and export |
| **Canvas API**         | Pixel art and graphical rendering                    |
| **JSZip**              | `.zip` generation                                    |
| **Google Fonts**       | Outfit & JetBrains Mono                              |
| **Borland TASM**       | x86 Assembly                                         |
| **Borland TLINK**      | Linking Assembly programs                            |
| **DOSBox**             | DOS environment                                      |

### Architecture

The application is designed to run directly from static files.

---

## 📁 Repository Structure

```text
quick-galileo/
│
├── index.html
│   └── UI layout and components
│
├── style.css
│   └── Global styles, components, variables and dark theme
│
└── app.js
    └── Application logic, rendering, interaction and export
```

---

## 🚀 Getting Started

Since the project is completely static, **no installation or build process is required**.

### 1. Clone the repository

```bash
git clone <repository-url>
cd quick-galileo
```

### 2. Run

The simplest option is to open:

```text
index.html
```

directly in your browser.

You can also use a static server such as:

```bash
npx serve
```

or the **Live Server** extension for Visual Studio Code.

---

# 🖥️ DOSBox & Assembly Workflow

quick-galileo is designed to work alongside the classic **Borland x86 Assembly toolchain**.

The exported resources can be assembled using:

```text
TASM.EXE
TLINK.EXE
```

Because these tools were designed for DOS environments, **DOSBox** is used to provide the required environment on modern Windows systems.

---

## ⚙️ 1. Prepare the DOSBox Environment

Install **DOSBox** and create the following folder on your Windows system:

```text
C:\ENS
```

Place the required Assembly tools and libraries inside it:

```text
C:\ENS
│
├── TASM.EXE
├── TLINK.EXE
├── LIB.LIB
├── LIBRO.LIB
└── LIBROS.LIB
```

Open DOSBox and mount the directory:

```dos
mount c: c:\ENS
c:
```

You should now be working inside:

```text
C:\ENS
```

No separate directory is required for every project. However, additional folders can be created if project separation is desired:

```text
C:\ENS
C:\ENS2
C:\ENS3
```

---

## 📦 2. Export a Project

Inside quick-galileo:

1. Create your resource using **Video Mode** or **Text Mode**.
2. Export the project.
3. quick-galileo generates a `.zip` file.
4. Extract the `.zip`.
5. Copy the extracted files into:

```text
C:\ENS
```

The exported package automatically contains the necessary `.asm` resources and macro references.

You **do not need to manually write or call**:

```text
LIB.LIB
LIBRO.LIB
LIBROS.LIB
```

The export workflow handles this automatically.

---

## 🔨 3. Assemble and Run

The exported project includes a `.bat` script that automates the assembly and linking process.

Inside DOSBox, navigate to the project directory and execute:

```dos
nombre_del_archivo.bat
```

The script automatically executes the required **TASM** and **TLINK** commands.

The resulting executable is generated and can then be executed inside DOSBox.

### Workflow

```text
┌───────────────────────┐
│      quick-galileo    │
│                       │
│  Video Mode / Text    │
│         Mode          │
└───────────┬───────────┘
            │
            │ Export
            ▼
┌───────────────────────┐
│       Project.zip     │
└───────────┬───────────┘
            │
            │ Extract
            ▼
┌───────────────────────┐
│       C:\ENS          │
│                       │
│  .ASM + .LIB + .BAT   │
└───────────┬───────────┘
            │
            │ DOSBox
            ▼
┌───────────────────────┐
│       TASM.EXE        │
│          ↓            │
│       TLINK.EXE       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│       program.exe     │
│                       │
│     DOS executable    │
└───────────────────────┘
```

---

## 🎯 Project Goals

quick-galileo aims to simplify the creation of graphical resources for educational and experimental **x86 Assembly** projects.

Instead of manually creating every graphical resource directly in Assembly code, the tool provides a visual workflow connecting:

```text
Pixel Art
     ↓
VGA / Text Mode
     ↓
x86 Assembly
     ↓
DOS / DOSBox
```

---

## 🧪 Development Status

**🟢 Active Development**

The project is currently under active development.

New features, improvements, optimizations, and workflow enhancements are continuously being added.

---

## 🗺️ Roadmap

Potential future improvements include:

* [ ] More drawing tools
* [ ] Improved animation workflow
* [ ] More export formats
* [ ] Additional VGA-related utilities
* [ ] Improved Assembly resource generation
* [ ] More advanced layer management
* [ ] Additional Text Mode features
* [ ] Improved project management
* [ ] Documentation improvements

---

## 🤝 Contributing

Contributions, suggestions, bug reports, and feature requests are welcome.

If you find a problem or have an idea for improving quick-galileo, feel free to open an **Issue** or submit a **Pull Request**.

---

## 📄 License

Add your project license here.


```text
MIT License
```

---

## 👨‍💻 Author

**MentosGali - Gamaliel**

Built as an experimental tool for combining modern web technologies with classic **x86 Assembly / DOS development workflows**.

---

# 🇪🇸 Español

> **Herramienta de Pixel Art y Animación para x86 Assembly / DOS**

**quick-galileo** es un editor web de pixel art y animación diseñado para flujos de desarrollo retro utilizando **gráficos VGA y Assembly x86 sobre DOS**.

Permite crear recursos gráficos y de modo texto y exportarlos directamente como archivos `.asm` que pueden integrarse en proyectos de Assembly.

**Estado:** 🟢 **En desarrollo activo**

---

## 📖 Descripción

**quick-galileo** es una herramienta web de pixel art y animación orientada al desarrollo retro con **VGA y Assembly x86**.

El proyecto permite crear recursos gráficos mediante una interfaz visual y exportarlos automáticamente como archivos `.asm`, facilitando su integración en programas de Assembly para DOS.

Incluye dos entornos principales:

* 🖼️ **Modo Video:** edición gráfica en resolución VGA 320×200.
* 💻 **Modo Texto:** edición basada en el modo texto BIOS 80×25.

La aplicación funciona completamente en el navegador y no requiere backend, frameworks ni procesos de compilación.

---

## ✨ Características

### 🖼️ Modo Video — 320×200

* Editor de pixel art
* Flujo de trabajo por capas
* Herramienta de rectángulo
* Herramienta de píxel
* Herramienta de stamp
* Herramienta de selección
* Activación/desactivación de grid
* Onion skinning
* Limpieza de capas
* Flujo orientado a animación
* Paleta VGA de 256 colores

### 💻 Modo Texto — BIOS 80×25

* Pizarra en modo texto
* Soporte para atributos de color
* Herramientas para dibujar cuadros
* Entrada de texto
* Selección y movimiento
* Edición visual estilo terminal BIOS

### 📦 Sistema de Exportación

* Exportación de recursos como `.asm`
* Generación de recursos por capas
* Exportación de múltiples archivos
* Empaquetado automático en `.zip`
* Integración con JSZip
* Generación automática de recursos Assembly y uso de macros
* Archivo `.bat` incluido para automatizar el ensamblado y enlazado

---

## 🛠️ Tecnologías

| Tecnología             | Uso                                            |
| ---------------------- | ---------------------------------------------- |
| **HTML5**              | Estructura y UI                                |
| **CSS3**               | Estilos, layout responsive y tema oscuro       |
| **Vanilla JavaScript** | Lógica, renderizado, interacción y exportación |
| **Canvas API**         | Pixel art y renderizado gráfico                |
| **JSZip**              | Generación de `.zip`                           |
| **Google Fonts**       | Outfit & JetBrains Mono                        |
| **Borland TASM**       | Assembly x86                                   |
| **Borland TLINK**      | Enlazado de programas Assembly                 |
| **DOSBox**             | Entorno DOS                                    |

### Arquitectura

quick-galileo utiliza intencionalmente una arquitectura estática sencilla:

La aplicación está diseñada para ejecutarse directamente a partir de archivos estáticos.

---

## 📁 Estructura del repositorio

```text
quick-galileo/
│
├── index.html
│   └── Layout y componentes de la UI
│
├── style.css
│   └── Estilos globales, componentes, variables y tema oscuro
│
└── app.js
    └── Lógica, renderizado, interacción y exportación
```

---

## 🚀 Cómo ejecutar

Al ser un proyecto completamente estático, **no requiere instalación ni proceso de build**.

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd quick-galileo
```

### 2. Ejecutar

La opción más sencilla es abrir:

```text
index.html
```

directamente en el navegador.

También puedes utilizar un servidor estático como:

```bash
npx serve
```

o la extensión **Live Server** de Visual Studio Code.

---

# 🖥️ Flujo de trabajo con DOSBox y Assembly

quick-galileo está diseñado para trabajar junto con el **toolchain clásico de Borland para Assembly x86**.

Los recursos exportados pueden ensamblarse utilizando:

```text
TASM.EXE
TLINK.EXE
```

Debido a que estas herramientas fueron diseñadas para entornos DOS, se utiliza **DOSBox** para proporcionar el entorno necesario en sistemas Windows modernos.

---

## ⚙️ 1. Preparar el entorno de DOSBox

Instala **DOSBox** y crea la siguiente carpeta en Windows:

```text
C:\ENS
```

Coloca dentro las herramientas y librerías necesarias:

```text
C:\ENS
│
├── TASM.EXE
├── TLINK.EXE
├── LIB.LIB
├── LIBRO.LIB
└── LIBROS.LIB
```

Abre DOSBox y monta la carpeta:

```dos
mount c: c:\ENS
c:
```

Ahora deberías encontrarte dentro de:

```text
C:\ENS
```

No es necesario crear una carpeta independiente para cada proyecto. Sin embargo, pueden crearse carpetas adicionales si se desea separar proyectos:

```text
C:\ENS
C:\ENS2
C:\ENS3
```

---

## 📦 2. Exportar un proyecto

Dentro de quick-galileo:

1. Crea tu recurso utilizando **Modo Video** o **Modo Texto**.
2. Exporta el proyecto.
3. quick-galileo generará un archivo `.zip`.
4. Descomprime el `.zip`.
5. Copia los archivos descomprimidos dentro de:

```text
C:\ENS
```

El paquete exportado contiene automáticamente los recursos `.asm` y las referencias a las macros necesarias.

**No es necesario escribir o llamar manualmente**:

```text
LIB.LIB
LIBRO.LIB
LIBROS.LIB
```

El flujo de exportación se encarga de esto automáticamente.

---

## 🔨 3. Ensamblar y ejecutar

El proyecto exportado incluye un script `.bat` que automatiza el proceso de ensamblado y enlazado.

Dentro de DOSBox, navega hasta el directorio del proyecto y ejecuta:

```dos
nombre_del_archivo.bat
```

El script ejecutará automáticamente los comandos necesarios de **TASM** y **TLINK**.

El ejecutable resultante será generado y podrá ejecutarse directamente dentro de DOSBox.

### Flujo

```text
┌───────────────────────┐
│      quick-galileo    │
│                       │
│  Modo Video / Texto   │
└───────────┬───────────┘
            │
            │ Exportar
            ▼
┌───────────────────────┐
│       Project.zip     │
└───────────┬───────────┘
            │
            │ Descomprimir
            ▼
┌───────────────────────┐
│       C:\ENS          │
│                       │
│  .ASM + .LIB + .BAT   │
└───────────┬───────────┘
            │
            │ DOSBox
            ▼
┌───────────────────────┐
│       TASM.EXE        │
│          ↓            │
│       TLINK.EXE       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│       program.exe     │
│                       │
│     Ejecutable DOS    │
└───────────────────────┘
```

---

## 🎯 Objetivos del proyecto

quick-galileo busca simplificar la creación de recursos gráficos para proyectos educativos y experimentales de **Assembly x86**.

En lugar de crear manualmente cada recurso gráfico directamente desde código Assembly, la herramienta proporciona un flujo visual que conecta:

```text
Pixel Art
     ↓
VGA / Text Mode
     ↓
Assembly x86
     ↓
DOS / DOSBox
```

---

## 🧪 Estado del desarrollo

**🟢 En desarrollo activo**

El proyecto se encuentra actualmente en desarrollo activo.

Se continúan agregando nuevas funcionalidades, mejoras, optimizaciones y mejoras al flujo de trabajo.

---

## 🗺️ Roadmap

Posibles mejoras futuras:

* [ ] Más herramientas de dibujo
* [ ] Mejoras al flujo de animación
* [ ] Más formatos de exportación
* [ ] Utilidades adicionales relacionadas con VGA
* [ ] Mejoras en la generación de recursos Assembly
* [ ] Gestión avanzada de capas
* [ ] Funciones adicionales para Text Mode
* [ ] Mejor gestión de proyectos
* [ ] Mejoras en la documentación

---

## 🤝 Contribuciones

Las contribuciones, sugerencias, reportes de errores y solicitudes de nuevas funcionalidades son bienvenidas.

Si encuentras un problema o tienes una idea para mejorar quick-galileo, puedes abrir un **Issue** o enviar un **Pull Request**.

---

## 📄 Licencia

Agrega aquí la licencia del proyecto.

```text
MIT License
```

---

## 👨‍💻 Autor

**MentosGali -  Gamaliel**

Proyecto experimental creado para combinar tecnologías web modernas con flujos clásicos de desarrollo utilizando **x86 Assembly / DOS**.

---

> 🎨 Create → 📦 Export → 🔨 Assemble → 🖥️ Run
>
> **quick-galileo — Modern browser tooling for classic Assembly workflows.**
