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
