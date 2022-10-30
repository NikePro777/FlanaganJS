// 9.5 Классы и подклассы
// Предположим что нужно определить подкласс span класса Range
// Тупо копируем из 9.2
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  static parse(s) {
    let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
    if (!matches) {
      // Не удается разобрать диапазон
      throw new TypeError(`Cannot parse Range from '${s}'.`);
    }
    return new Range(parseInt(matches[1]), parseInt(matches[2]));
  }
  includes(x) {
    return this.from <= x && x <= this.to;
  }
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
  }
  toString() {
    return `(${this.from}...${this.to})`;
  }
}
// Span  работать будет так же как Range но только не начало и конец, а начало и промежуток будем задавать
// Ну и естественно он наследует все методы

// Функция конструктор для нашего подкласса
function Span(start, span) {
  if (span >= 0) {
    this.from = start;
    this.to = start + span;
  } else {
    this.to = start;
    this.from = start + span;
  }
}

// показываем, что прототип наследуется от Range
Span.prototype = Object.create(Range.prototype);
// Так как конструктор не хотим наследовать - определяем свой
Span.prototype.constructor = Span;
// Так как мы определяем метод toString() то спан его переопределит, иначе бы тупо унаследовал.
Span.prototype.toString = function () {
  return `(${this.from}... +${this.to - this.from})`;
};

// 9.5.2 Создание подклассов с использованием extends и super
// Cоздадим подклас от Array и добавим методы получения первого и последнего элементов
class EZArray extends Array {
  get first() {
    return this[0];
  }
  last() {
    return this[this.length - 1];
  }
} // т.е. мы полностью наследуем все свойства array и при этом у нас есть два своих
let a = new EZArray();
console.log(a instanceof EZArray); // true
console.log(a instanceof Array); // true
a.push(1, 2, 3, 4);
console.log(a.length); //4 т.е. мы используем все методы унаследованные от Array
a.pop();
console.log(a);
console.log(a.first);
console.log(a.last()); // ну и естественно работают наши
console.log(Array.isArray(a)); // true действительно является массивом
console.log(EZArray.isArray(a)); // true подкласс наследует и статические методы

//9.6 Теперь сделаем более сложный пример унаследуем класс от Map:
class TypedMap extends Map {
  constructor(keyType, valueType, entries) {
    // если entries есть, то определим их типы:
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Неправильный тип для записи [${k}, ${v}]`);
        }
      }
    }
    // Инициализируем суперкласс начальными записями (с проверенными типами)
    super(entries);
    // инициализируем класс this сохранив типы
    this.keyType = keyType;
    this.valueType = valueType;
  }

  // Теперь переопределим метод set() добавив проверку типов для любых новых записей, добавляемых к отображению
  set(key, value) {
    // Генерируем ошибку если ключ или значение имеют неправильный тип
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} не относится к типу ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} не относится к типу ${this.valueType}`);
    }

    // Если все корректно, вызываем версию метода set из суперкласса для фактическкогто добавление записи в отображение
    // мф возвращаем то, что возвращает метод суперкласса
    return super.set(key, value); // тут очень важно, мы используем super, т.е. вызываем метод set не который мы переопределили, а который есть у нашего суперкласса Map
  }
}

// Использование super() в конструкторах
// если мы определяем класс с ключевым словом extends тогда super() обязательно должно быть для вызова конструктора суперкласса
// если мы не определили конструктор, то он будет автоматически определен
// мы не можем использовать this в конструкторе пока не вызовем конструткор суперкласса методом super()
// new.target является ссылкой на вызванный конструктор. Говоря по русски когда применяется метод super конструктор суперкласса видит это как new.target
// п о хорошему суперкласс не должен знать создаются ли из него подклассы, но иногда полезно применять new.target.name

// 9.5.3 Дилегирование вместо наследования
//  МОжно конечно всегда создавать подклассы, с extends это легко. Но проще создать новый экземпляр класса и дилегировать ему часть работы(компонуя их, это и есть композиыия)
// Допустим нас интерисует класс Histogram. Мы хотим чтобы он считал сколько раз значение добавилось. А он отслеживает просто
// реализуя класс count мы понимаем что он похож на Map чем на Set. т.к. ему нужно поддерживать отображение между значениями и количеством их добавлений
// Таким образом вместо создания подкласса Set мы определяем API интерфейс но лелигируем методу Map:

/*
Класс подобен Set , отслеживает сколько раз добавлялось значение
есть методы add() and remove() и можно использовать count() чтобы узнать сколько раз добавлялось значение
 Используйте entries() чтобы пройтись по парам [value, count]
 */
class Histogram {
  // Создаем Map при инициализации, чтобы делигировать ему выполнение работы
  constructor() {
    this.map = new Map();
  }

  //Для любого заданного ключа счетчик - это значение Map, ну или ноль если нету его
  count(key) {
    return this.map.get(key) || 0;
  }

  // has возвращает try в ненулевом счетчике
  has(key) {
    return this.count(key) > 0;
  }

  // Размер гистограммы - значение записей в Map
  get size() {
    return this.map.size;
  }

  // Чтобы добавить ключ, достаточно инкрементировать Map
  add(key) {
    this.map.set(key, this.count(key) + 1);
  }

  // Удаление сложнее, так как мы должны удалять ключ , если счетчик становится нулевым:
  delete(key) {
    let count = this.count(key);
    if (count === 1) {
      this.map.delete(key);
    } else if (count > 1) {
      this.map.set(key, count - 1);
    }
  }

  // при проходе по обьекту Гистограмм - просто возвращаются ключи:
  [Symbol.iterator]() {
    return this.map.keys();
  }

  // Остальные методы делигируют работу Map
  keys() {
    return this.map.keys();
  }
  values() {
    return this.map.values();
  }
  entries() {
    return this.map.entries();
  }
}
// Итого мы просто создали обьект Мэп, так как большинство методов состоят из одной строки
// Так как мы применяем делигирование, то обьект гистограмм не является экземпляром Map или Set. Однако импользует из методы.

// 9.5.4 Иерархии классов и абстрактные классы
// В предыдущем примере мы создали подкласс мэп а сейчас - делегируем работу мэп, фактически не создавая подкласс чего либо.

// Итак создали класс AbstractSet в котором содержится единственный метод has()

class AbstractSet {
  // Генерируем ошибку, чтобы заставить подклассы определять собственную работающую версию этого метода
  has(x) {
    throw new Error("Abstract method");
  }
}

/**
 * NotSet это подкласс нашего AbstractSet.
 * Все члены нашего множества являются значениями, которые не будут членами к-л другого множества. Из за определения в терминах другого множества класс не допускает запись, а из за наличия бесконечного количества членов -  перечисления. Все что мы можем сделать - проверять на предмет членства и преобразовывать в строку, используя математическую запись
 * set -  это и есть наше множество
 */
class NotSet extends AbstractSet {
  constructor(set) {
    super();
    this.set = set;
  }
  // наша реализация унследованного абстрактного метода
  has(x) {
    return !this.set.has(x);
  }
  // и так же переопределим метод из tostring из objectа
  toString() {
    return `{ x| x ∉ ${this.set.toString()} }`;
  }
}
/**
 * Rangeset конкретный подкласс AbstractSet. Все его члены - конкретные значения которые находятся в диапазоне от  from до to включительно.Поскольку его членами могут быть числа с плавающей точкой, то он не поддерживает перечисление и не имеет значащего размера
 */
class RangeSet extends AbstractSet {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }

  has(x) {
    return x >= this.from && x <= this.to;
  }
  toString() {
    return `{ x| ${this.from} ≤ x ≤ ${this.to} }`;
  }
}

/*
 * AbstractEnumerableSet абстрактный подкласс AbstractSet.  Он определяет абстрактный метод получения, который возвращает размер множества, а также определяет абстрактный итератор. Затем он реализует конкретные методы isEmpty(), toString(), и equals(). Подклассы которые реализует итератор, метод получения размера и метод has() Свободно получают эти конкретные методы
 */
class AbstractEnumerableSet extends AbstractSet {
  get size() {
    throw new Error("Абстрактный метод");
  }
  [Symbol.iterator]() {
    throw new Error("Абстрактный метод");
  }

  isEmpty() {
    return this.size === 0;
  }
  toString() {
    return `{${Array.from(this).join(", ")}}`;
  }
  equals(set) {
    // Если другое множество не является AbstractEnumerableSet, то оно не равно этому множеству
    if (!(set instanceof AbstractEnumerableSet)) return false;

    // Если множества не имеют одинакового размера то оно не равно
    if (this.size !== set.size) return false;

    // Проход в цикле по элементам этого множества
    for (let element of this) {
      // Если элемент не находится в другом множестве, то они не равны
      if (!set.has(element)) return false;
    }
    // Элементы совпадают, поэтому множества равны
    return true;
  }
}

/*
 * SingletonSet Конкретный подкласс AbstractEnumerableSet.
 * Одноэлементное множество - это множество только для чтения с единственным членом
 */
class SingletonSet extends AbstractEnumerableSet {
  constructor(member) {
    super();
    this.member = member;
  }

  // Мы реализуем следующие 3 метода и унаследуем реализации isEmpty, equals() and toString()
  has(x) {
    return x === this.member;
  }
  get size() {
    return 1;
  }
  *[Symbol.iterator]() {
    yield this.member;
  }
}

/*
AbstractWritableSet абстрактный подкласс AbstractEnumerableSet. Он определяет абстрактные методы insert() and
remove() которые вставляют и удаляют индивидуальные элементы из множества, и реализует конкретные методы add(), subtract(), and intersect(). Здесь наш API-интерфейс отличается от стандартного класса Set в JavaScript.
*/
class AbstractWritableSet extends AbstractEnumerableSet {
  insert(x) {
    throw new Error("Абстрактный метод");
  }
  remove(x) {
    throw new Error("Абстрактный метод");
  }

  add(set) {
    for (let element of set) {
      this.insert(element);
    }
  }

  subtract(set) {
    for (let element of set) {
      this.remove(element);
    }
  }

  intersect(set) {
    for (let element of this) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}

/**
 BitSet конкретный подкласс AbstractWritableSet с эффективной реализацией множества фиксированного размера, предназначенный для множеств, чьи элементы являются неотрицательными целыми числами, которые меньше определенного максимального размера
 */
export default class BitSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max; // Максимальное целое число, которое мы можем хранить.
    this.n = 0; // Сколько целых чисел содержит множество
    this.numBytes = Math.floor(max / 8) + 1; // Как много байт нам надо
    this.data = new Uint8Array(this.numBytes); // The bytes
  }

  // Внутренний метод для проверки, является ли значениедопустимым членом этого множества
  _valid(x) {
    return Number.isInteger(x) && x >= 0 && x <= this.max;
  }

  // Проверяет, установлен ли указанный бит указанного байта в нашем массиве данных. .возвращает  true или false.
  _has(byte, bit) {
    return (this.data[byte] & BitSet.bits[bit]) !== 0;
  }

  // Находится ли значение x в нашем BitSet?
  has(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      return this._has(byte, bit);
    } else {
      return false;
    }
  }

  // Вставляет значение x в BitSet
  insert(x) {
    if (this._valid(x)) {
      // Если значение допустимо
      let byte = Math.floor(x / 8); // переводим байты в биты
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        // Если этот бит еще не установлен
        this.data[byte] |= BitSet.bits[bit]; // тогда установить его
        this.n++; // и инкрементировать размер
      }
    } else {
      throw new TypeError("Недопустимый элемент множества: " + x);
    }
  }

  remove(x) {
    if (this._valid(x)) {
      // Если значение допустимо
      let byte = Math.floor(x / 8); // переводим байты в биты
      let bit = x % 8;
      if (this._has(byte, bit)) {
        // Если бит уже установлен
        this.data[byte] &= BitSet.masks[bit]; // тогда сбрасываем
        this.n--; // и декременируем размер
      }
    } else {
      throw new TypeError("Недопустимый элемент множества: " + x);
    }
  }

  // Геттер возвращающий размер множества
  get size() {
    return this.n;
  }

  // Выполняет итерацию по множеству, просто проверяя каждый бит по очереди (можно было и пооптимизированне выполнить это)
  *[Symbol.iterator]() {
    for (let i = 0; i <= this.max; i++) {
      if (this.has(i)) {
        yield i;
      }
    }
  }
}

// Некоторые заранее расчитанные значения, используемые методами has(), insert() and remove()
BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);
