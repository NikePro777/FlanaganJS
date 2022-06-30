// Системы счисления
console.log(0xff); // ноль икс - шестнадцатиричная
console.log(0b010); // b- бинарная (двоичная)
console.log(0o377); // o - октоган - восьмиричная

//3.2 Литералы с плавающей точкой

console.log(3.14e10); // 3.14 * 10 в степени 10
console.log(314e-2); //  в степени -2

let billion = 1_000_000_000; // Числа для удобства можно разделять
console.log(1_000_000_000, billion);

// 3.3 Арифметические действия

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
