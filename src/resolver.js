export function objectPathResolver(path, obj) {           // функция для выбора свойства объекта
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : undefined
    }, obj || self)
}
