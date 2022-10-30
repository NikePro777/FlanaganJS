// 8.7 Свойства, методы и конструкторы функций
// 8.7.1 length - указывает арность функции ( количество аргументов)
// 8.7.2 name - имя функции)
// 8.7.3 prototype - когда функция создается с помощью конструктора, вновь созданный обьект наследует все свойства прототипа

// 8.7.4 Метода call() и apply()
// Позволяют вызывать функцию, как если бы она была методом другого обьекта. Аргумент - обьект на котором должна вызываться функция, он же контекст он же this
// дальнейшие аргументы - значения, которые передаются вызываемой функции. У apply аналогично, только эти значения передаются в виде массива a.apply(o,[1,2])
// Заменяет метод имени м обьекта о версией, которая записывает в журнал сообщения до и после вызова исходного метода
function trace(o, m) {
  let original = o[m]; // Запомнить исходный метод в замыкании
  o[m] = function (...args) {
    // Определяем новый метод
    console.log(new Date(), "Entering:", m); // Записать сообщение
    let result = original.apply(this, args); // вызвать исходный метод
    console.log(new Date(), "Exiting:", m); // Записать сообщение
    return result; // Return result.
  };
}

// 8.7.5 Метод bind()
// основная цель - привязка функции к обьекту. в результате вызова на функции f и передача обьекта о возвращается новая функция. Вызов новой функции
// приводит к вызову f как методу о. Любые аргументы, передаваемые новой функции - передаются исходной
let x = 1;
function f1(y) {
  console.log(this);
  return this.x + y;
} // Этой функции необходима привязка
let o = { x: 1 }; // Обьект, к которому будет осуществлена привязка
let g = f1.bind(o); // вызов g приводит к вызову f1 на о
console.log(g(2)); //3
let p = { x: 10, g }; // Вызов g() как метода обьекта this
console.log(p.g(2)); // 3 g по прежнему привязан к о, а не к p

// Стрелочные функции наследуют значение this от среды, в которой определяются, и не могут быть переопределены bind
// но bind обеспечивает так же частиное применение - любые аргументы после первого передаются наравне с this. Частичное применение - каррирование
let sum = (x, y) => x + y;
let succ = sum.bind(null, 1); // привязывает первый аргумент к 1, т.е. x=1 теперь
console.log(succ(2)); // 3 х=1 (привязали выше) а для у мы передаи 2

function f(y, z) {
  return this.x + y + z;
}
g = f.bind({ x: 1 }, 2); // привязали this и y
console.log(g(3)); // 6 т.к. this.x=1 , y=2

// Метод toString()
// возвращает полный исходный код функции. во встроенных функциях возвращает что то типа [native code]

// 8.7.7 Конструктор Function()
// - ожидает любое количество СТРОКОВЫХ аргументов. последний аргумент - тело функции. т.к. имя функции не ожидается, соответственно создает анонимные функции
// - позволяет динамически создавать и компилировать во время выполняения функции js
// - Производит разбор тела функции и создает новый обьект функции каждый раз, когда вызывается ( не оч хорошо в циклах)
// - Создаваемые функции не используют лексическую область видимости. Они компилируются, как если бы были функциями верхнего уровня:
let scope = "глобальная область видимости";
function constructFunction() {
  let scope = "локаольная область видимости";
  return new Function("return scope"); // не захватывает локаольную scope!
}
console.log(constructFunction()()); //глобальная область видимости

// 8.8 Функцинальное программирование
// 8.8.1 Обработка массивов с помощью функций

//Допустим у нас есть массив и мы хотим посчитать сред величину и отклонение. сначала сделаем это  в нефункциональном столе
let data = [1, 1, 3, 5, 5];
let total = 0;
for (let i = 0; i < data.length; i++) total += data[i];
let mean = total / data.length;
console.log(mean); // 3 - среднее значение
// для расчета отклонения мы суммируем квадраты отклонений
total = 0;
for (let i = 0; i < data.length; i++) {
  let deviation = data[i] - mean;
  total += deviation * deviation;
}
let stddev = Math.sqrt(total / (data.length - 1));
console.log(stddev); //2

// Теперь тоже самое но более локанично, в функциональном стиле:
// Сначала определим две простые функции
const sum1 = (x, y) => x + y;
const square = (x) => x * x;
// Затем используем их с методами Array:
data = [1, 1, 3, 5, 5];
mean = data.reduce(sum1) / data.length;
console.log(mean); //3
deviation = data.map((x) => x - mean);
stddev = Math.sqrt(deviation.map(square).reduce(sum1) / (data.length - 1));
console.log(stddev); // 2
// Все еще ООП (map,reduce). Перепишем их функциональные версии
const map = function (a, ...args) {
  return a.map(...args);
};
const reduce = function (a, ...args) {
  return a.reduce(...args);
};
// Теперь когда map и reduce это функции, наш код приобретает следующий вид:
const summ = (x, y) => x + y;
const squaree = (x) => x * x;
data = [1, 1, 3, 5, 5];
mean = reduce(data, summ) / data.length;
deviation = map(data, (x) => x - mean);

stddev = Math.sqrt(reduce(map(deviation, squaree), summ) / (data.length - 1));
console.log(stddev); //3

// 8.8.2 Функции высшего порядка
// - это функция которая оперирует функциями (принимает функции и возвращает тоже функцию)
function not(f) {
  return function (...args) {
    // console.log(args);
    let result = f.apply(this, args); // Возвратить новую функцию, которая вызывает f
    // console.log(result);
    return !result; // и выполняет логическое отрицание результата
  };
}
let even = (x) => x % 2 === 0; // Функция для определения четное или нечетное число
let odd = not(even); // новая функция которая делает противоположное
console.log([1, 1, 3, 5, 5].every(odd)); // true - каждый элемент массива является нечетным

// Другой пример
// Возвращает функцию, которая ожидает массив и применяет f  к каждому эл-ту массива, возвращая массив врзвращаемых значений
// Contrast this with the map() function from earlier.
function mapper(f) {
  return (a) => map(a, f);
}
let increment = (x) => x + 1;
const incrementAll = mapper(increment);
console.log(incrementAll([1, 2, 3])); // => [2,3,4]

// Еще пример: функция которая принимает две функции и возвращает f(g(...)).
// возвращаемая функция h передает все свои аргументы функции g, потом передает возвращаемое значение функции f и затем возвращает возвращаемое значение....
// Both f and g are invoked with the same this value as h was invoked with.
function compose(f, g) {
  return function (...args) {
    // Используем call для f (там одиночное значение) и apply для g (там массив)
    console.log(g);
    return f.call(this, g.apply(this, args));
  };
}
const sum_ = (x, y) => x + y;
const square_ = (x) => x * x;
compose(square_, sum_)(2, 3); // => 25; квадрат суммы

// Функции с частичным применением
// bind принимает аргументы слева, т.е. аргументы предоставляемые методу bind, помещаются в начало списка аргументов, который передается исходной функции
// но есть возможность частично применять аргументы справа:

// Аргументы этой функции передаются слева
function partialLeft(f, ...outerArgs) {
  return function (...innerArgs) {
    // Возвращает эту функцию
    console.log(outerArgs); //2
    let args = [...outerArgs, ...innerArgs]; // Посмотреть все аргументы
    console.log(args); //2,3,4
    return f.apply(this, args); // вызвать функцию f с этими аргументами
  };
}

// Аргументы этой функции передаются справа
function partialRight(f, ...outerArgs) {
  return function (...innerArgs) {
    // Возвращает эту функцию
    let args = [...innerArgs, ...outerArgs]; // Посмотреть все аргументы
    console.log(args);
    return f.apply(this, args); // ызвать функцию f с этими аргументами
  };
}

// Аргументы этой функции служат шаблоном. Неопределенные значения в списке аргументов заполняются значениями из внутреннего набора
function partial(f, ...outerArgs) {
  return function (...innerArgs) {
    console.log("outerArgs " + outerArgs);
    console.log("innerArgs " + innerArgs);
    let args = [...outerArgs]; // Локальная копия внешних аргументов
    let innerIndex = 0; // какой внутренний аргумент будет следующим
    // Проходим в цикле по аргументам с заполнением неопределенных значений значениями изнутри
    for (let i = 0; i < args.length; i++) {
      if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
    }
    // Присоединяем оставшиеся внутренние аргументы
    args.push(...innerArgs.slice(innerIndex));
    console.log("args= " + args);
    return f.apply(this, args);
  };
}

// Функция с тремя аргументами
f = function (x, y, z) {
  return x * (y - z);
};
// Отличия от трех частичных применений
console.log(partialLeft(f, 2)(3, 4)); // => -2: Привязывает первый аргумент: 2 * (3 - 4)
partialRight(f, 2)(3, 4); // =>  6: Приявязывает последний аргумент: 3 * (4 - 2)
partial(f, undefined, 2)(3, 4); // => -6: Привязали средний аргумент: 3 * (2 - 4)

// Благодаря частичному применению можем по другому использовать функции
increment = partialLeft(sum, 1);
console.log("increment= " + increment);

const cuberoot = partialRight(Math.pow, 1 / 3);
console.log("cuberoot= " + cuberoot);

console.log(cuberoot(increment(26))); // => 3
