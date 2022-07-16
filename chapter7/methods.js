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

// reduse() и reduseRigth() - обьединяют элементы массива для получения единственного значения
a = [1, 2, 3, 4, 5];
console.log(a.reduce((x, y) => x + y, 0));
console.log(a.reduce((x, y) => x * y, 1));
console.log(a.reduce((x, y) => (x > y ? x : y)));
// reduce принимает 2 аргумента. 1ый это функция, которая должна как то сократить
// два значения в одно и возвратить его. второй аргумент (необязательный) начальное значение, для передачи в функции
// Cама же функция reduce принимает не 3 (как forEach,map) а 4 аргумента. Элемент, индекс и массив, становятся 2,3 и 4 аргументами.
// а первый - это накопленный до сих пор результат сокращения. Крч начальное значение нашего аккумулятора
// Если начального значения не будет, или массив будет пустым - то reduce просто возвратит его, не вызывая функцию сокращения

// reduseRigth() - тоже самое, но операцию делает справа налево, т.е. от самого высокого индекса к нулевому
// например 2^(3^4)  в данном случае нам надо возводить справо налево:
a = [2, 3, 4];
console.log(a.reduceRight((acc, val) => Math.pow(val, acc))); // 2.4178516392292583e+24

// 7.8.2 Выравнивание массивов с помощью flat() и flatMap()
// flat() создает и возвращает новый массив, содержащий те же самые элементы, но при этом вложенные в первоначальный массив
// массивы будут "выровнены"
console.log([1, [2, 3]].flat()); //[1, 2, 3]
console.log([1, [2, [3]]].flat()); // [1, 2, Array(1)] === [1, 2,[3]]
// в качестве аргумента принимает количество уровней, на которое надо выравнять (крч сколько раз повторить)
console.log([1, [2, [3]]].flat(2)); // [1, 2, 3]

// flatMap() тоже самое что мэп, но только предварительно выравненный. Дает возможность отобразить входные элементы на пустой массив, который ничего не выравнивает:
console.log([-2, -1, 1, 2].flatMap((x) => (x < 0 ? [] : Math.sqrt(x)))); // [1, 1.4142135623730951]

// 7.8.3 Присоединение массивов с помощью concat()
// concat присоединяет текущий массив к массиву/вам которые приняты в аргументе И выравнивает их на один уровень.
//(элемент или массив с элементами будут следующими элементами исходного массива). Текущий массив НЕ трогает!
a = [1, 2, 3];
console.log(a.concat(4, 5)); //[1, 2, 3, 4, 5]
console.log(a.concat([4, 5], [6, 7])); //[1, 2, 3, 4, 5, 6, 7]
console.log(a.concat(4, [5, [6, 7]])); //[1, 2, 3, 4, 5, Array(2)] === [1, 2, 3, 4, 5,[6, 7]]
console.log(a); // [1, 2, 3] - не изменил текущий массив
