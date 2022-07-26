// 8.3 Аргументы функций
// 8.3.1 Необязательные параметры и стандартные значения
// Если функция принимает меньше параметров чем необходимо, то недостающие заменяются на стандартные (чаще всего undefined)
// лучше писать функции, чтобы аргументы были необязательны:
function getPropertyNames(o, a) {
  a = a || [];
  // if (a === undefined) a = []; // Если а не передали, то создаем пустой массив, куда будем все складывать
  for (let property in o) a.push(property);
  return a;
}

// getPropertyNames() может вызываться с 1 или 2  аргументами:
(o = { x: 1 }), (p = { y: 2, z: 3 });
a = getPropertyNames(o);
console.log(a); // ['x'] - создался пустой массив и туда закинулись свойства обьекта о
getPropertyNames(p, a);
console.log(a); // ['x', 'y', 'z'] - теперь параметр а передали, поэтому к его свойствам все и добавилось
// в ES6 можно задавать стандартные параметры прямо в функции, ждя этого достаточно поставить равно, и он будет использоваться, если аргумент не передадут:
function getPropertyNames2(o, a = []) {
  for (let property in o) a.push(property);
  return a;
}
// Значение предыдущего параметра можно применять при определении стандартных значений которые последуют за ним:

const rectangle = (width, heigth = width * 2) => ({ width, heigth });
console.log(rectangle(1)); // {width: 1, heigth: 2}

// 8.3.2 параметры остатка и списки аргументов переменной длины ( функции когда передали аргументов больше чем ожидали)
function max(first = -Infinity, ...rest) {
  let maxValue = first; // Начинаем с предположения что первый аргумент самый большой, затем проходимся в цикле,в поисках наибольшего
  for (let n of rest) {
    if (n > maxValue) {
      maxValue = n;
    }
  }
  return maxValue;
}
console.log(max(1, 10, 100, 2, 3, 1000, 4, 5, 6)); // 1000
// причем если мы передадим только 1 параметр(или вообще не передадим) то остаток (rest) будет =[] причем он в любом случае будет массивом. Соответственно для него нет смысла определять стандартное значение - оно равно []
// такие функции называеются функции с переменным числом параматров, с переменной арностью или vararg-функциями

// Обьект arguments
// до ES6 параметры остатка записывались в arguments - обьект похожий на массив, который позволяет вытаскивать аргументы по номеру а не по имени:

function max(x) {
  let maxValue = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > maxValue) maxValue = arguments[i];
  }
  return maxValue;
}
console.log(max(1, 10, 100, 2, 3, 1000, 4, 5, 6)); // 1000
// не оптимизируется, поэтому лучше не использовать (в строгом режиме такое слово зарезервировано, поэтому все плохо)

// 8.3.4 Операция распространения для вызова функций
// Операция распространения ... складывает все элементы в массив значений:
let numbers = [5, 2, 1, -1, 100, 34];
console.log(Math.min(...numbers)); //-1
//  в аргументах функции же ... собирает все "лишние" аргументы в массив

// Эта функция принимает функцию и возвращает версию в виде оболочки
function timed(f) {
  return function (...args) {
    // Собираем все аргументы в массив args
    console.log(`Вход в функцию ${f.name}`);
    let startTime = Date.now();
    try {
      // Распространяем все аргументы в функцию-оболочку
      return f(...args); // Spread the args back out again
    } finally {
      // Перед возвратом возвращаемого значения выводим затраченное время
      console.log(`Выход из ${f.name} спустя ${Date.now() - startTime}ms`);
    }
  };
}

// Рассчитать сумму чисел между 1 и n методом грубой силы
function benchmark(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

// Вызываем хронометрическую версию тестовой функции
timed(benchmark, 1000)(1000000); // => 500000500000; this is the sum of the numbers

// 8.3.5 Деструктуризация аргументов функции
// Если мы определили функцию, которая имеет имена параметров внутри [] - то функция ожидает, что ей передадут значение в виде массива
function vectorAdd(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}
console.log(vectorAdd([1, 2], [3, 4])); // [4, 6]
// будет проще если мы деструктуризируем параметры:
function vectorAdd([x1, y1], [x2, y2]) {
  // распаковать 2 аргумента в 4 параметра
  return [x1 + x2, y1 + y2];
}
console.log(vectorAdd([1, 2], [3, 4])); // [4, 6]

// Аналогично можем деструктуризировать и обьекты:
// Умножить вектор {x,y} на скалярное значение
function vectorMultiply({ x, y }, scalar) {
  return { x: x * scalar, y: y * scalar };
}
console.log(vectorMultiply({ x: 1, y: 2 }, 2)); // {x: 2, y: 4}

function vectorAdd2({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  // Распаковываем 1-й обьект в параметры x1,y1 и второй аналогично
  return { x: x1 + x2, y: y1 + y2 };
}
console.log(vectorAdd2({ x: 1, y: 2 }, { x: 3, y: 4 })); // {x: 4, y: 6}

// Обьявляемые переменные или параметры находятся в тех местах, где вы ожидали бы значения в обьектном литерале
//т.о. имена свойств распологаются в левой стороне от двоеточия, а имена параметров(пременных) - в правой
// Умножить вектор {x,y,z} или {x,y} на скалярное значение
function vectorMultiply2({ x, y, z = 0 }, scalar) {
  return { x: x * scalar, y: y * scalar, z: z * scalar };
}
console.log(vectorMultiply2({ x: 1, y: 2 }, 2)); //{x: 2, y: 4, z: 0}

//когда много аргументов и трудно запомнить в каком порядке они идут, то можно сделать так:
// функция копирующая массив с необязательно указанным значением смещения
function arraycopy({
  from,
  to = from,
  n = from.length,
  fromIndex = 0,
  toIndex = 0,
}) {
  let valuesToCopy = from.slice(fromIndex, fromIndex + n);
  to.splice(toIndex, 0, ...valuesToCopy);
  return to;
}
(a = [1, 2, 3, 4, 5]), (b = [9, 8, 7, 6, 5]);
console.log(arraycopy({ from: a, n: 3, to: b, toIndex: 4 })); // => [9,8,7,6,1,2,3,5]
console.log(arraycopy({ from: [1, 2, 3, 4, 5] })); // [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

// При деструктуризации массива можно определить параметр остатка:
// Функция ожидает аргумент типа массива, первые два элемента распаковываются в параметры х и у, остальное в coords, любые аргументы после массива в rest
function f([x, y, ...coords], ...rest) {
  return [x + y, ...rest, ...coords]; // здесь используется операция распространения, без нее : [3, [5, 6], [3, 4]]
}
console.log(f([1, 2, 3, 4], 5, 6)); // [3, 5, 6, 3, 4]

// при деструктуризации обьекта, остаток тоже можно деструктуризировать. Это будет ОБЬЕКТ!
// Умножить вектор {x,y} или {x,y,z} на скалярное значение, предохранив остальные свойства
function vectorMultiply3({ x, y, z = 0, ...props }, scalar) {
  return { x: x * scalar, y: y * scalar, z: z * scalar, ...props };
}
console.log(vectorMultiply3({ x: 1, y: 2, w: -1 }, 2)); // {x: 2, y: 4, z: 0, w: -1}
// Мы можем так же диструктуризировать массивы обьектов, обьекты подобные массивам и так далее. Вопрос в понятности кода, вот это наверное предел:
function drawCircle({ x, y, redius, color: [r, g, b] }) {
  // что то написать
}

// 8.3.6 Типы аргументов
// функции сами по себе не проверяют что мы там им передали в качестве аргументов, поэтому лучше делать проверки:
// Возвращает сумму элементов интерируемого обьекта а
// Все элементы а обязаны быть числами
function sum(a) {
  let total = 0;
  for (let element of a) {
    // герерирует typeError если а не итерируема
    if (typeof element !== "number") {
      throw new TypeError("sum(): элементы обязаны быть числами");
    }
    total += element;
  }
  return total;
}
console.log(sum([1, 2, 3])); // 6
// console.log(sum(1, 2, 3)); - не итерируется
// console.log(sum([1, 2, "3"])); - наша ошибка

// 8.4  Функции как значения
// Функции можно присваивать переменным, сохранять в свойствах обьектов и т.д.
function square(x) {
  return x * x;
} // Создали обьект функции с именем square
let s = square; // теперь s  ссылается на ту же функцию что и square
console.log(s(4)); // 16
console.log(square(4)); // 16
// Функции можно присваивать свойством обьектов, в таком случае они будут называться методами:
o = {
  square: function (x) {
    return x * x;
  },
};
let y = o.square(16);
console.log(y); // 256

// когда мы присваиваем функции элементам массива имя указывать вообще не обязательно:
a = [(x) => x * x, 20]; // литерал типа массива
console.log(a[0](a[1])); // обращаемся к 0 элементу(а там функция которая требует аргумент) а в качестве аргумента мы передаем 1 элемент этого же массива
console.log(a);

// Ниже разновидность действий, когда функция используется в качестве значения

// Определяем простые функции
function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}

// Создали функцию, которая принимает в себя одну из вышеперечисленных функций и 2 аргумента
function operate(operator, operand1, operand2) {
  return operator(operand1, operand2);
}

// Для того чтобы выполнить (2+3) + (4*5) воспользуемся функцией:
let i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));
console.log(i); // 25

// Реализуем эти же простые функции но в обьекте:
const operators = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => x / y,
  pow: Math.pow, // работает так же как и остальные функции
};

// Функция принимает в себя имя операции , ищет ее в обоьекте. Если находит то вызывает с предоставленными операндами
function operate2(operation, operand1, operand2) {
  if (typeof operators[operation] === "function") {
    return operators[operation](operand1, operand2);
  } else throw "неизвесная операция";
}

operate2("add", "hello", operate2("add", " ", "world")); // => "hello world"
operate2("pow", 10, 2); // => 100

// 8.4.1 Определение собственных свойств функций
// Функция это обьект, который может иметь свойства. Поэтому всякие переменные, используемые внутри функции лучше хранить в самой функции:
uniqueInteger.counter = 0; // Обьявление функций поднимаются, поэтому мы можем делать присваивания перед обьявлением функции
// Функция же возвращает уникальное целое число
function uniqueInteger() {
  return uniqueInteger.counter++; // Возвратить и инкрементировать свойство counter
}
console.log(uniqueInteger());
console.log(uniqueInteger());

// Функция использующая собственные свойства
// Вычисляет факториалы и кэширует результаты как свойства самой функции
function factorial(n) {
  if (Number.isInteger(n) && n > 0) {
    // Только положительные целые числа
    if (!(n in factorial)) {
      // Если кэша нет
      factorial[n] = n * factorial(n - 1); // Вычисляем и кэшируем его
    }
    return factorial[n]; // возвращаем кэшированный результат
  } else {
    return NaN; // если входные данные недопустимы
  }
}
factorial[1] = 1; // Базовый кэш
console.log(factorial(6)); // => 720
console.log(factorial[5]); // => 120; Вызов выше кэширует это значение

// 8.5 Функции как пространство имен
// так как переменные не видны за пределами функции то иногда удобно иметь функцию - хранилище имен, которая не будет занимать глобальное пространство
// главное не забыть вызвать эту функцию)
function chunkNamespace() {
  // код
}
// chunkNamespace()(
//   // chunkNamespace - единственная глобальная переменна, но можно обойтись и без нее
//   (function () {
//     // код
//   })()
// );

// 8.6 Замыкания
// Когда функция вызывается из определяемой ей же области (изнутри) - это называется замыканием
// Видимость:
let scope = "глобальная область видимости";
function checkscope() {
  let scope = "локальная область видимости";
  function f() {
    return scope;
  } // -возвратить значение scope
  return f();
}
console.log(checkscope()); // локальная область видимости

// а как будет теперь?
function checkscope2() {
  let scope = "локальная область видимости 2";
  function f() {
    return scope;
  }
  return f; // НЕТУ ВЫЗОВА!!!
}
s = checkscope2(); // f() {return scope;} -вместо вызова функции, checkscope2() возвращает саму функцию
console.log((s = checkscope2()())); // с помощью второй пары круглых скобок мы вызываем эту самую функцию, которую возвратили ( обьект функции если правильно)
// локальная область видимости 2 !!!
// Функция f привязана к локальной scope! и поэтому вернет ее, независимо откуда была вызвана функция!!!
// Мощная природа замыканий - они захватывают привязки локальных переменных (и параметров) внешней функции, внутри которой они определены

// Замыкания захватывают локальные переменные одиночного вызова функции, и могут задействовать их как закрытое  состояние.
// перепишем функцию uniqueInteger чтобы поддержать состояние закрытым(в первом варианте свойства легко могли поменять сторонние программы)

/*
uniqueInteger = (function () {
  // Определяем и вызываем функцию! иначе вернет функцию
  let counter = 0; // Закрытое состояние функции ниже
  return function () {
    return counter++;
  };
})();
console.log(uniqueInteger()); //0
console.log(uniqueInteger()); //1
// Эксклюзивные переменные (counter) не обязаны быть такими в единственном замыкании:
function counter() {
  let n = 0;
  return {
    count: function () {
      return n++;
    },
    reset: function () {
      n = 0;
    },
  };
}

let c = counter(),
  d = counter(); // Создали два счетчика
c.count(); // => 0
d.count(); // => 0: Счетчики независимы!
c.reset(); // методы reset() и count() разделяют состояние
c.count(); // => 0: потому что мы сбросили c
d.count(); // => 1: d мы не сбрасывали
console.log(c.count(), d.count()); // 1 2
// т.е. когда мы вызываем counter() он создает новую область видимости, которая не зависит от других вызовов */

// можно коибинировать методику замыканий с методами получения и установки:
function counter(n) {
  // n - является закрытой переменной
  return {
    // Метод получения свойства возвращает и инкрементирует закрытую переменную счетчика
    get count() {
      return n++;
    },
    // Метод установки не разрешает уменьшать значение
    set count(m) {
      if (m > n) n = m;
      else throw Error("Счетчик можно устанавливать только в большее значение");
    },
  };
}

let cc = counter(1000);
cc.count; // => 1000
cc.count; // => 1001
cc.count = 2000;
cc.count; // => 2000
// cc.count = 2000; // !Error: count can only be set to a larger value
console.log(cc.count);

// Следующая функция определяет переменную и два метода к ней - для установки и получения этой переменной

// This function adds property accessor methods for a property with
// the specified name to the object o. The methods are named get<name>
// and set<name>. If a predicate function is supplied, the setter
// method uses it to test its argument for validity before storing it.
// If the predicate returns false, the setter method throws an exception.
//
// The unusual thing about this function is that the property value
// that is manipulated by the getter and setter methods is not stored in
// the object o. Instead, the value is stored only in a local variable
// in this function. The getter and setter methods are also defined
// locally to this function and therefore have access to this local variable.
// This means that the value is private to the two accessor methods, and it
// cannot be set or modified except through the setter method.
function addPrivateProperty(o, name, predicate) {
  let value; // This is the property value

  // The getter method simply returns the value.
  o[`get${name}`] = function () {
    return value;
  };

  // The setter method stores the value or throws an exception if
  // the predicate rejects the value.
  o[`set${name}`] = function (v) {
    if (predicate && !predicate(v)) {
      throw new TypeError(`set${name}: invalid value ${v}`);
    } else {
      value = v;
    }
  };
}

// The following code demonstrates the addPrivateProperty() method.
let o = {}; // Here is an empty object

// Add property accessor methods getName and setName()
// Ensure that only string values are allowed
addPrivateProperty(o, "Name", (x) => typeof x === "string");

o.setName("Frank"); // Set the property value
o.getName(); // => "Frank"
o.setName(0); // !TypeError: try to set a value of the wrong type
