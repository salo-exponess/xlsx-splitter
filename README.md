# Excel Splitter

Esta herramienta permite dividir un archivo Excel de entrada (`input.xlsx`) en múltiples archivos más pequeños, cada uno con un número específico de filas.

## Características

- Divide un archivo Excel grande en múltiples archivos más pequeños
- Mantiene la fila de encabezado en cada archivo generado
- Configurable para especificar la cantidad de filas por archivo
- Genera archivos de salida con nombres secuenciales en una carpeta `output`

## Requisitos

- Node.js instalado
- Dependencias:
  - `xlsx` (para manipulación de archivos Excel)

## Instalación

1. Clona o descarga este repositorio
2. Instala las dependencias:

```bash
npm install xlsx
```

## Uso

1. Coloca tu archivo Excel con el nombre `input.xlsx` en la carpeta del proyecto
2. Ejecuta el script:

```bash
node index.js [número_de_filas]
```

Donde `[número_de_filas]` es un parámetro opcional que indica cuántas filas debe contener cada archivo de salida (por defecto: 500).

## Ejemplo

```bash
node index.js 1000
```

Este comando dividirá `input.xlsx` en múltiples archivos, cada uno con 1000 filas (más la fila de encabezado).

## Salida

Los archivos generados se guardarán en la carpeta `output` con nombres secuenciales como:
- `01_output.xlsx`
- `02_output.xlsx`
- etc.

## Funcionamiento

- La herramienta lee el archivo `input.xlsx` completo
- Extrae la primera fila como encabezado
- Divide el resto de los datos en bloques del tamaño especificado
- Crea un nuevo archivo para cada bloque, incluyendo el encabezado
- Guarda cada archivo en la carpeta `output`

## Notas

- Asegúrate de que el archivo `input.xlsx` exista en la carpeta del proyecto
- La carpeta `output` se creará automáticamente si no existe