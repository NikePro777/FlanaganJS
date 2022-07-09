// определение функции
let square1 = function (x) {
  return x * x;
};
// Доступ к свойствам
// выражение.идентификатор - для доступа к свойствам обьекта
// выражение [идентификатор] -обьект и массив
let object = { x: 1, y: { z: 3 } };
let massiv = [0, 4, [5, 6]];
console.log(object.x); //1
console.log(object.y.z); //3
console.log(object["x"]); //1
console.log(massiv[1]); //4
console.log(massiv[2]["1"]); //6
// console.log(object[0].x); //

// 4.4.1 Условный доступ к свойствам ?. или ?.[]
// Если свойство есть - переходит по нему, если нет то возвращает undefined (вместо ошибки typeError)

let a; //забыли идентифицировать
let index = 0;
try {
  console.log(a[index++]); // т.к такого свойства нет, генерируется ошибка
} catch (e) {
  console.log(index); // =>1 т.к. инкремент произошел выше
}
console.log(a?.[index++]); // так как свойства индекс нету, то выведет undefined и далее выполняться ничего не будет. если бы ?. не было, вывел бы тайп еррор (как выше)
console.log(index); // =>1 инкремента не было выше
// console.log(a[index++]); // typeError
// 4.5.1 Условный вызов функции.
// Так же с помощью ?. мы можем вернуть undefined вместо typeError при вызове функции. Логика точно такая же: Если функция возвращает null или undefined то генерируется
// typeError. Но с помощью ?. будет генерировать undefined
function square(x, log) {
  if (log) {
    // проверяем ввели ли мы аргумент log при вызове функции
    log(x); // если да то вызываем ее
  }
  return x * x;
} // Теперь можно все это сделать проще:

function square0(x, log) {
  log?.(x); // т.е. если введен логарифм, то вызов пройдет
  return x * x;
} // Однако ?. проверяет только равна ли левая сторона null или undefined.... если будет что то другое (typeError) то один фиг вывалит ошибку: square0(2,3)

let f = null, // именно null а не 0
  x = 0;
try {
  f(x++); // нет такой функции, поэтому ошибка
} catch (e) {
  x; //=1 т.к. инкрементировать смогли
}
f?.(x++); // ничего не будет, так как свойство равно null, было бы 0 то была бы ошибка
console.log(x); //=1 ничего же не сделали выше
// Обзор операций
console.log(~5); //Инвентирование битов... крч меняет знак и вычитает единицу
console.log(delete 5); //  - удаляет свойство
console.log(typeof 3); // в строке пишет тип
console.log(void 5); // возвращает underfined
console.log(2 ** 3); // возведение в степень
console.log(2 << 3); // сдвигает двоичную запись числа 2 на 3 бита влево, добавля нули
console.log(2 >> 3); // вправо, причем при движении начальные стирает
console.log(2 >>> 3); // вправо и заполняет нулями предыдущие цифры
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car("Honda", "Accord", 1998);
console.log(auto instanceof Car); //Проверяет является ли кар обьектом класса авто => true
console.log(auto instanceof Object);

let obj = { a: 1, b: 2, c: 3 }; //in  проверяет наличие свойства у обьекта
console.log("b" in obj); // выведет true
console.log("x" in obj); // выведет false
console.log(5 | 6); // побитовое или
console.log(5 ^ 2); // побитовое исключающее или // хз нахрена э\то и что это....
console.log(null ?? 1); // выбор первого определенного операнда

// 4.8 Арифметические операции
//  ** - выполняется справо налево, т.е. 2**2**3 === 2**8 а не 4 в 3
console.log(-5 % -2); // остаток от деления имеет знак первого операнда!!!! в данном случае минус
console.log(5 % -2); // в данном случае плюс

// 4.8.1 Операция +
// Если любой из операндов обьект - он преобразуется по алгоритму: data чз toString, остальные чз valueOf, но так как боьлшинство обьектов не имеют возвращаемого значения,
// то к ним затем применяется toString  и получается [object Object]. Затем выполняется конкантенация. Если любой из операндов строка - второй тоже в строку и конкатенируем
// если же ни один не является обьектом или строкой (булевское выражение например) то все в числа и складываем
1 + 2; // 3
"1" + 2; // 12
"1" + "2"; // 12
1 + {}; //'1[object Object]'
true + true; //2
2 + null; // 2 null=>0
2 + undefined; // NaN т.к. undefined=> NaN

// 4.8.2 Унарные арифметические операции
// Стараются все перевести в число (NaN на крайняк, хотя это тоже число)
// BigInt нельяза преобразовать в число посредством +
// ++i префиксный инкремент i++ постфиксный
let ii = 1;
console.log(ii++); //1 ... Сначала выведет а затем прибавит
console.log(++ii); // сначала прибавит а затем выведет //3 ++ всегда превращает операнд в число // нельзя делать разрыв строки между операндом и числом
// 4.8.3 Побитовые операции & берет обычно значение первого операнда , || -2ого. << биты смещает влево, крч на один знак это умножили на 2
// на два знака - на 4 и так далее. >> делим точно так же, но отбрасывая остаток. с - работает заполняя еденицами и поэтому хз как

// 4.9.1 Равенства и неравенства
console.log(null == undefined);
x = NaN;
let y = 1;
console.log(x !== x); // как проверять равна ли переменна NaN. Можно использовать isNaN()
console.log(isNaN(x));
console.log(y !== y);
// Из строгого сравнения следует запомнить что 0===-0 => true

// 4.9.2 Операции сравнения - выполняются только между числами и строками, поэтому все остальное будет преобразовано
console.log(3 > NaN); // Любые операции сравнения с NaN дают false
// сравнение строк можно пользоваться String.localCompare() Intl.Collator  хз что это.... верхний регистр всегда больше нижнего, так что toUpper/LowerCase использовать надо
// если арифметические операции все в строки преобразуют, то операции сравнения - стараются в числа
console.log("one" > 0); //false т.к. one => NaN а если его содержит то всегда false

// in
// с левой стороны д.б символ, строка или то что мб преобразовано в строку. Справа д.б. обьект
let point = { x: 1, y: 1 };
console.log("x" in point); // true т.к. х есть в обьекте
console.log("z" in point); // false т.к. z нет в обьекте
console.log("toString" in point); // true ! т.к. обьект наследует метод toString

let data = [1, 2, 3];
console.log("0" in data); // true т.к. в массиве есть нулевой элемент. ( тут именно номер элемента, не значение)
console.log(1 in data); // true т.к. 1=> '1' а элемент с индексом 1 существует
console.log(3 in data); // false а вот с индексом 3 не существует

// операция instanceof
// ожидает слева обьект а справа операнд инициализирующий класс обьектов...
// если операнд слева является экземпояром класса обьекта справа, то выведет true, иначе false

let d = new Date(); // создали обьект с помощью конструктора
console.log(d instanceof Date); // да, мы создали его с помощью date
console.log(d instanceof Object); // да, все обьекты являются экземплярами Object
console.log(d instanceof Number); // нет

let arr = [1, 2, 3];
console.log(arr instanceof Array);
console.log(arr instanceof Object); //  Все массивы являются обьектами
console.log(arr instanceof RegExp); // Массивы не регулярные выражения
// в общем суть что js ищет по цепочке прототипов операнд слева (d.prototype)  и если находит то true, иначе false

// 4.10.1 &&
// Тут кроме булевой алгебры надо помнить, что если первый операнд false то вернет его и дальше даже смотреть не будеь. А если первый true то возвращаем второй
let o = { x: 1 };
let p = null;
console.log(o && o.x); // т.к. слева истина, то возвращает правое значение
console.log(p && p.x); // т.к. слева ложно, то вернет null. А справа даже смотреть не будет, несмотря на то, что вернул бы ошибку если бы посмотрел\

// if (a===b) stop();
// (a===b) && stop() // Делают одно и тоже: Если а равно б то вызывает функцию стоп
