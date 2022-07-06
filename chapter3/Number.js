// Системы счисления
console.log(0xff); // ноль икс - шестнадцатиричная
console.log(0b010); // b- бинарная (двоичная)
console.log(0o377); // o - октоган - восьмиричная

//3.2.2 Литералы с плавающей точкой

console.log(3.14e10); // 3.14 * 10 в степени 10
console.log(314e-2); //  в степени -2

let billion = 1_000_000_000; // Числа для удобства можно разделять
console.log(1_000_000_000, billion);

// 3.2.3 Арифметические действия

console.log(Math.pow(2, 3)); // 2 в третей (возведение в степень)
console.log(Math.round(0.5)); // округляет до целого
console.log(Math.floor(0.5)); // округление в меньшую сторону
console.log(Math.ceil(0.4)); // округление в большую сторону
console.log(Math.abs(0.7)); // модуль (абсолютная величина)
console.log(Math.max(0.4, -1, 0)); // наибольшее из чисел
console.log(Math.min(0.4, -1, 0)); //наименьшее из чисел
console.log(Math.random()); // Случайно число от 0 до 1
console.log(Math.E); // число пи (длина окружности деленая на диаметр)
console.log(Math.PI); // число E - основание натурального логарифма
console.log(Math.sqrt(9)); // корень
console.log(Math.pow(27, 1 / 3)); //кубический корень
console.log(Math.sin(Math.PI / 3)); // синус, аналогично cos,atan
console.log(Math.tan(Math.PI / 4));
console.log(Math.log(Math.E)); // Натуральный логарифм (е в основании)
console.log(Math.log(100) / Math.LN10); // Десятичный логарифм
console.log(Math.log(512) / Math.LN2); // Двоичный логарифм
console.log(Math.exp(1)); // Math.E в какой то степени
// дополнительные функции обьекта Маth
console.log(Math.cbrt(27)); // куб корень
console.log(Math.hypot(5, 12)); // гипотенуза по пифагору (корень из суммы аргументов)
console.log(Math.log10(100)); // Десятичный логарифм
console.log(Math.log2(512)); // Двоичный логарифм
console.log(Math.log1p(20)); // Натуральный логарифм для х+1 Точен для малых значениях аргумента
console.log(Math.expm1(20)); // Инверсия предыдущего
console.log(Math.sign(2.1)); // -1,0,1 для аргументов >, < or = x
console.log(Math.imul(2, 3)); // Умножение оптимизированное для 32 битных целых чисел
console.log(Math.clz32(0xfaa)); // Количество нулей ведущих в 32 бытном целом числе
console.log(Math.trunc(2.9)); // Отбрасывает дробную часть
console.log(Math.sinh(1)); //Гиперболический синус, аналогично для кос и тангенса.... хз что это
console.log(Math.asinh(2)); // Гиперболический арксинус.... аналогично для строчки выше
// Свойства Number
console.log(Number.parseInt(12.9)); // аналогично для обычного парса, откидывает вещественную часть
console.log(Number.parseFloat(12.232323));
console.log(Number.isNaN(NaN)); // Проверяет является ли число равным NaN
console.log(Number.isFinite(10)); // Проверяет является ли аргумент конечным числом
console.log(Number.isInteger(12.1)); // Целое ли число
console.log(Number.isSafeInteger(10e100)); //Проверяет Находится ли число в промежутке между +-2**53
console.log(Number.MIN_SAFE_INTEGER); // по идее должно показать -(2**53-1)
console.log(Number.MAX_SAFE_INTEGER); // по идее должно показать +(2**53-1)
console.log(Number.EPSILON); //2**-52 - наименьшая разница между числами
// особенности JS
let x = 0.3;
let y = 0.2;
let z = 0.1;
console.log(x - y == y - z); // false
console.log(x - y == 0.1); // false
// 3.2.5 BigInt
console.log(0o1234n);
let string = "1" + "0".repeat(10);
console.log(BigInt(string));

console.log(300n / 97n); // ->3 Особенность БигИнт в том, что деление отбрасывает любой остаток
console.log(2n ** 131071n - 1n); // Число Мерсенна имеющее 39257 десятичных знаков
// 3.2.6 Time
// Показывает сколько секунд прошло с 1 января 1970 года:
let timestamp = Date.now(); // Текущее время как отметка времени
let now = new Date(); // Текущее время в стандартном формате
let ms = now.getTime(); // Преобразовали в мс
let iso = now.toISOString(); // Преобразовали в строку со стандартным форматом
console.log(now);
console.log(ms);
console.log(iso);
