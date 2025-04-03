const { argv } = require('node:process')
const fs = require('node:fs')
const XLSX = require('xlsx')

// Genera una carpeta de salida si no existe
fs.mkdirSync('output', {recursive: true})

// El primer argumento es la cantidad de filas por archivo -> 500 por defecto
const rows = Math.ceil(argv[2]) || 500

const wb = XLSX.readFile('input.xlsx')
const sheets = wb.SheetNames
const ws = wb.Sheets[sheets[0]]

// Se obtiene la primera fila como encabezado
const header = XLSX.utils.sheet_to_json(ws, {header: 1})[0]

// El resto de las filas se utilizan como datos
const items = XLSX.utils.sheet_to_json(ws, {header: 1, range: 1})

// Se calcula la cantidad de archivos necesarios
const files = Math.ceil(items.length / rows)

console.log(`Se generarán ${files} archivos con ${rows} filas cada uno`)
// Se hace un ciclo para crear los archivos
for (let index = 0; index < files; index++) {
  // Se genera los nombres de los archivos de salida
  const outputFile = `${(index + 1).toString().padStart(2, '0')}_output.xlsx`

  // Se calcula el rango de filas para cada archivo
  const start = index * rows
  const end = start + rows

  console.log(`Creando ${outputFile} con filas de ${start + 1} a ${end}`)

  // Se obtienen los datos para cada archivo
  const data = items.slice(start, end)

  // Se crea el archivo de salida
  var newSheet = XLSX.utils.aoa_to_sheet([header, ...data])
  var newWorkbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Hoja1')
  XLSX.writeFile(newWorkbook, 'output/' + outputFile)

  // Eliminar las referencias a los objetos para liberar memoria
  newSheet = null
  newWorkbook = null
}
