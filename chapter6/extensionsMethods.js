// 6.7 Расширение обьектов
let target = { x: 1 },
  source = { y: 2, z: 3 };
for (let key of Object.keys(source)) {
  target[key] = source[key];
}
console.log(target); // Вот это все делает Object.assign(куда, откуда, откуда2...)
let o = Object.assign({}, target); // первый аргумент пустой, так как мы создали новый обьект
console.log(o);
// Чтобы пропускать те свойства, которые итак есть в обьекте:
function merge(target, ...sources) {
  for (let source of sources) {
    for (let key of Object.keys(source)) {
      if (!(key in target)) {
        //Этим и отличается от Object.assign
        target[key] = source[key];
      }
    }
  }
  return target;
}
console.log(Object.assign({ x: 1 }, { x: 2, y: 2 }, { y: 3, z: 4 })); //{x: 2, y: 3, z: 4}
console.log(merge({ x: 1 }, { x: 2, y: 2 }, { y: 3, z: 4 })); //{x: 1, y: 2, z: 4}
// 6.8 Сериализация обьектов - процесс преобразования обьекта в строку, с возможностью восстановления
o = { x: 1, y: { z: [false, null, ""] } }; // исходник
console.log(o);
let s = JSON.stringify(o); // преобразовали в строку
console.log(s);
let p = JSON.parse(s); // восстановили
console.log(p);
// JSON поддерживает сериализацию практически всего, только:
// NaN, Infinity, -infinity => null
//Date - сериализуется в строки (ISO) но обратно не восстановятся
// function, RegExp, undefined, Error - не могут сериализоваться
// JSON сериализует только перечисляемые собственные свойства обьекта, остальные опускает

// 6.9 Методы Object
// 6.9.1 toString() - преобразует обьектв строку.
s = { x: 1, y: 1 }.toString();
console.log(s); //[object Object]
// toString сам по себе не оч информативен, поэтому классы определяют собственные версии toString. Например у массива каждый эл-т записывается в строку.
// а у функции в строку записывается исходный код
let point = {
  x: 1,
  y: 2,
  toString: function () {
    return `(${this.x}, ${this.y})`;
  },
};
console.log(String(point));
console.log(
  String(function () {
    return `(${this.x}, ${this.y})`;
  })
);
