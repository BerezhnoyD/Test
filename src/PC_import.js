import fetch from 'node-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

export default class PComp {              // создание класса
  data = {};

  constructor() {                         // создание конструктора с методами
    this.fetch()                          // у этого объекта есть метод fetch
      .then(json => this.data = json)     // если все работает - выводим json в переменную data
      .catch(err => this.data = err);     // если нет - выводим ошибку туда же
  }

  async fetch() {                         // асинхронная функция
    try {
      let response = await fetch(pcUrl);
      return await response.json();
    } catch (err) {
      return null
    }
  }

  get attributes() {                      // метод атрибуты выводящий полученную переменную data
    return this.data;
  }

  isEmpty() {                            // метод, определяющий пустой объект
    return Object.keys(this.data).length === 0;
  }
}
