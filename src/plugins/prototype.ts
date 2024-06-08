// // Поиск значение
// Object.prototype.findValue = function (path: string[]): any {
//     return path.reduce((acc: any, key: any) => {
//         if (typeof acc === 'object' && acc !== null && key.startsWith('[') && key.endsWith(']')) {
//             const index = parseInt(key.slice(1, -1), 10)
//             return acc[index]
//         }
//         return acc && acc[key]
//     }, this)
// }

// // Разница объектов
// Object.prototype.differences = function (obj: any): any {
//     const main: any = this
//     const differences: any = {}

//     for (const key in main) {
//         if (obj[key] !== main[key]) differences[key] = main[key]
//     }

//     return differences
// }

// // Отчистки объекта
// Object.prototype.clears = function (): any {
//     const obj: any = this
//     const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

//     for (const key of ownKeys) {
//         if (obj[key] && typeof obj[key] !== 'object') {
//             obj[key] = null
//         } else {
//             obj[key] = obj[key].clears()
//         }
//     }

//     return obj
// }

// // Cозадет Query параметр
// Object.prototype.getQuery = function (isEmpty: boolean): any {
//     let url = ''

//     const obj: any = this
//     const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

//     for (const key of ownKeys) {
//         if (obj[key] && typeof obj[key] !== 'object') {
//             url += `${url ? '&' : isEmpty ? '' : '?'}${key}=${obj[key]}`
//         }
//     }

//     return url
// }

// // Вывода не пустых ключей объекта
// Object.prototype.notEmpty = function (): any {
//     let newObj: any = {}
//     const obj: any = this
//     const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

//     for (const key of ownKeys) {
//         if (obj[key] && typeof obj[key] !== 'object') {
//             newObj[key] = obj[key]
//         }

//         if (obj[key] && typeof obj[key] == 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key])?.length) {
//             newObj[key] = obj[key].notEmpty()
//         }
//     }

//     return newObj
// }

// // Проверки на не пустoту
// Object.prototype.isNotEmpty = function (): boolean {
//     const obj: any = this
//     const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

//     for (const key of ownKeys) {
//         if (obj[key] && typeof obj[key] !== 'object') {
//             return true
//         }

//         if (obj[key] && typeof obj[key] == 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key])?.length) {
//             return obj[key].isNotEmpty()
//         }
//     }

//     return false
// }

// // Глубокое копирование объекта
// Object.prototype.copy = function (data: any): any {
//     if (typeof data !== 'object' || data === null) return

//     const deepCopy = (source: any, target: any) => {
//         for (const key in source) {
//             if (Object.prototype.hasOwnProperty.call(source, key)) {
//                 if (typeof source[key] === 'object' && source[key] !== null) {
//                     target[key] = deepCopy(source[key], Array.isArray(source[key]) ? [] : {})
//                 } else {
//                     target[key] = source[key]
//                 }
//             }
//         }
//         return target
//     }

//     deepCopy(data, this)
// }

