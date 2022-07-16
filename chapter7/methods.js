// 7.8 Методы массивов
// Все методы принимают функцию в своем аргументе (обычно стрелочную), которая применяется для каждого элемента массива (пропуская undefined)
// функция же может принимать 3 аргумента: Значение элемента; индекс элемента; массив (2 и 3 необязательны)

// for Each()
let data = [1, 2, 3, 4, 5],
  sum = 0;
data.forEach((value) => {
  // вычисляем сумму элементов массива
  sum += value;
});
console.log(sum); //15
// а теперь инкрементируем каждый элемент массива
data.forEach(function (v, i, a) {
  a[i] = v + 1;
});
console.log(data); // [2, 3, 4, 5, 6]

// map - тоже самое что forEach но только все элементы возвращаются в новый массив. Поэтому функция должна что то возвращать

a = [1, 2, , 3];
console.log(a.map((x) => x * x)); //[1, 4, empty, 9] при этом исходный массив - неизменный

// filter() если элемент удовлетворяет условиям функции - он возратится
// функция предикат - функция возвращающая true или false

a = [1, 2, 3, 4, 5];
console.log(a.filter((x) => x < 3)); // [1, 2]
console.log(a.filter((x, i) => i % 2 === 0)); // [1, 3, 5]
let sparse = [, , , undefined, null, 0, 2, 4];
let dance = sparse.filter(() => true); // чтобы убрать бреши в массиве
console.log(dance); // [undefined, null, 0, 2, 4]
let dance2 = sparse.filter((x) => x !== undefined && x !== null); // чтобы убрать бреши в массиве и удалить пустые и неизвестные элементы
console.log(dance2); // [0, 2, 4]

// find() и findIndex() - как и фильтер - ищут элементы, которые подходят по условию, но как только находят - заканчивают перебор всего. find возвращает элемент
// а findIndex возвращает индекс. Если не находят то find возвращает undefined, а findIndex возвращает -1

a = [1, 2, 3, 4, 5];
console.log(a.findIndex((x) => x === 3)); // 2
console.log(a.findIndex((x) => x < 0)); // -1
console.log(a.find((x) => x % 5 === 0)); // 5
console.log(a.find((x) => x % 7 === 0)); // undefined (числа кратные 7 в массиве отсутствуют)

// every() и some() - предикаты массивов - пременяют к вашим элементам указанную функцию и возвращают true или false

// every - ~'для всех' - вернет true только если ВСЕ элементы удовлетворяют условию
a = [1, 2, 3, 4, 5];
console.log(a.every((x) => x % 2 === 0)); // false
console.log(a.every((x) => x < 10)); // true
// some - наоборот, если хотя бы один элемент удовлетворит - true, иначе false
console.log(a.some((x) => x % 2 === 0)); // true - содержит несколько четных
console.log(a.some(isNaN)); // false - не содержит "не числа"
// тут как в кз - как только ясно что вернем true или false - остальные элементы не проверяем
let s = [];
// Кроме того на пустом массиве принято:
console.log(s.some((x) => x)); // false
console.log(s.every((x) => x)); // true

// reduse() и reduseRigth()
