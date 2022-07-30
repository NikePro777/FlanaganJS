let sum = (x, y) => x + y;
const square = (x) => x * x;
function compose(f, g) {
  return function (...args) {
    // Используем call для f (там одиночное значение) и apply для g (там массив)
    return f.call(this, g.apply(this, args));
  };
}
const reduce = function (a, ...args) {
  return a.reduce(...args);
};
// Аргументы этой функции передаются слева
function partialLeft(f, ...outerArgs) {
  return function (...innerArgs) {
    // Возвращает эту функцию
    let args = [...outerArgs, ...innerArgs]; // Посмотреть все аргументы
    return f.apply(this, args); // вызвать функцию f с этими аргументами
  };
}
const map = function (a, ...args) {
  return a.map(...args);
};
// Аргументы этой функции передаются справа
function partialRight(f, ...outerArgs) {
  return function (...innerArgs) {
    // Возвращает эту функцию
    let args = [...innerArgs, ...outerArgs]; // Посмотреть все аргументы
    return f.apply(this, args); // ызвать функцию f с этими аргументами
  };
}

// Аргументы этой функции служат шаблоном. Неопределенные значения в списке аргументов заполняются значениями из внутреннего набора
function partial(f, ...outerArgs) {
  return function (...innerArgs) {
    let args = [...outerArgs]; // Локальная копия внешних аргументов
    let innerIndex = 0; // какой внутренний аргумент будет следующим
    // Проходим в цикле по аргументам с заполнением неопределенных значений значениями изнутри
    for (let i = 0; i < args.length; i++) {
      if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
    }
    // Присоединяем оставшиеся внутренние аргументы
    args.push(...innerArgs.slice(innerIndex));
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
const cuberoot = partialRight(Math.pow, 1 / 3);
console.log(cuberoot(increment(26))); // => 3

// Комбинируем частичное применение и функции not (вообще с функциями высшего порядка)

let not = partialLeft(compose, (x) => !x);
even = (x) => x % 2 === 0;
odd = not(even);
const isNumber = not(isNaN);
odd(3) && isNumber(2); // => true

// Теперь рассчитаем отклонение и сред значение чисто в функциональном стиле:

// // sum() and square() были определены ранее, вот еще несколько:
const product = (x, y) => x * y;
const neg = partial(product, -1);
const sqrt = partial(Math.pow, undefined, 0.5);
const reciprocal = partial(Math.pow, undefined, neg(1));

// Теперь вычисляем среднюю величину и стандартное отклонение
data = [1, 1, 3, 5, 5]; // Наши данные
mean = product(reduce(data, sum), reciprocal(data.length));
stddev = sqrt(
  product(
    reduce(map(data, compose(square, partial(sum, neg(mean)))), sum),
    reciprocal(sum(data.length, neg(1)))
  )
);
[mean, stddev]; // => [3, 2]

// 8.8.4 Мемоизация
// Кэширование в функциональном программировании называется мемоизацией.
// Функция принимающая в себя функцию и возвращающая мемоизированное значение:

// Работает только если аргументы имеют отличающиеся строковые представления
function memoize(f) {
  const cache = new Map(); // кэш значений хранится в замыкании

  return function (...args) {
    // Создается строковая версия аргументов для использования в качестве ключа кэша
    let key = args.length + args.join("+");
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      let result = f.apply(this, args);
      cache.set(key, result);
      console.log(cache);
      return result;
    }
  };
} // В общем функция создает новый обьект для кэша, и присваивает его локальной переменной (чтобы он был закрытым внутри)
// Возвращаемыя же функция превращает этот массив аргументов в строку и использует ее как имя ключа. А далее смотрит, если имя есть в кешэ - возвращает значение,
// а если нет, то вычисляет и сохраняет результат в кэше

// Возвращает НОД используя алгоритм Эвклида
function gcd(a, b) {
  // Типы аргументов не проверяются
  if (a < b) {
    // нам нужно чтобы  a >= b
    [a, b] = [b, a]; // Если это не так, то меняем местами
  }
  while (b !== 0) {
    // Алгоритм Эвклида для НОД
    [a, b] = [b, a % b];
  }
  return a;
}

const gcdmemo = memoize(gcd);
console.log(gcdmemo(85, 187)); // => 17
console.log(gcdmemo(5, 125));
// Если пишем рекурсивную функцию, которая будем мемоизироваться, то возвращаться мы хотим к момоизированной версии а не к исходной
const factorial = memoize(function (n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
});
console.log(factorial(5)); // => 120: кэширует значения для 4, 3, 2 и 1.
