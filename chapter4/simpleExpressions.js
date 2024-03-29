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

let ff = null, // именно null а не 0
  x = 0;
try {
  ff(x++); // нет такой функции, поэтому ошибка
} catch (e) {
  x; //=1 т.к. инкрементировать смогли
}
ff?.(x++); // ничего не будет, так как свойство равно null, было бы 0 то была бы ошибка
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
2 + null; // 2 null=>0 =2
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

// 4.10.1 && И
// Тут кроме булевой алгебры надо помнить, что если первый операнд false то вернет его и дальше даже смотреть не будеь. А если первый true то возвращаем второй
let o = { x: 1 };
let p = null;
console.log(o && o.x); // т.к. слева истина, то возвращает правое значение
console.log(p && p.x); // т.к. слева ложно, то вернет null. А справа даже смотреть не будет, несмотря на то, что вернул бы ошибку если бы посмотрел\

// if (a===b) stop();
// (a===b) && stop() // Делают одно и тоже: Если а равно б то вызывает функцию стоп

// 4.10.2 || ИЛИ
// Работает когда либо один либо оба операндов равны true
// В отличие от && смотрит на первый операнд и если он истинный - возвращает сразу его!!! иначе идет к следующему. Если все ложно то возвращает последний, а так первый истинный
// let max=maxWidth || preferences.maxWidth || 500  // Если значение maxWidth есть - используем его, иначе ищем его в преференсе, если и там нет, то используем 500

// 4.10.3 ! НЕ
// В отличие от предыдущих двух, преобразует операнд в булевское значение, поэтому для преобразования любого операнда в булев тип используется !!х
// Законы де моргана
// !(p&&q)===(!p||!q)
// !(p||q)===(!p&&!q)

// 4.11 Присваивание
// (a = b) === 0; // Присваиваем значение и одновременно проверяем их одной строкой
// i=j=k=0 // т.к. ассоциативность справа налево, то мы одной строкой передаем всем переменным значение 0

// 4.11.1 Присваивание с действием
// в большинстве случае а op=b op - операция. a+=b === a=a+b , аналогично с остальными
// Исключения - инкременты!
let array = [1, 2, 3];
let i = 0;
console.log((array[i++] *= 2)); // тут будет второй элемент массива
console.log((array[i++] = array[i++] * 2)); // а тут уже третий
// 4.12 Вычисление выражений
// Благодаря eval() js интерпритирует строки с исходным кодом, получая вычисление, с целью получить значение. На практике этой функции можно дать другое имя, поэтому
// хз кто кого вызывает => оптимизация в минус, безопасность в минус
// 4.12.1 eval()
// Ожидает один аргумент. Если передать ей к-л значение кроме строки - она возвратит его. Если строка то она преобразует его в js код и выполнит. Если не сможет - выкинет ошибку

const geval = eval; // Благодаря другому имени можно использовать eval в глобальном контексте
let xx = "global", // Две глобальные переменные
  yy = "global";

function f() {
  // здесь eval вызывается в локальном контексте
  let xx = "local";
  eval('xx += "changed";');
  return xx;
} // в локальном контексте, глобальная переменная хх не изменится

function g() {
  let yy = "local"; // Это изменилась локальная переменная yy
  geval('yy += "changed";'); // а тут он поменял глобальную yy (global=> globalchanged)
  return yy; //  вывел локальную
}
console.log(f(), xx); // localchanged global
console.log(g(), yy); // local globalchanged

// 4.12.3 eval()  в строгом режиме
// крч в строгом режиме eval не может быть переименована, и вообще слово становится почти зарезервированным и фактически превращает ее из функции в операцию
// сама она не может создавать новые переменныедаже локальные, но запрашивать локальные может

// 4.13 Смешанные операции
//4.13.1 ?: Тернарная операция - очень сокращает цикл if. Три операнда, первый превращает в булев и если он тру, то возвращает второй, если нет то третий. Оба никогда
let username;
let greeting = "hello " + (username ? username : "there"); // тоже самое что и :
greeting = "Hello ";
if (username) {
  greeting += username;
} else {
  greeting += "there";
}

// 4.13.2 Операция выбора первого определенного операнда ??
// тоже самое что || за исключением того что в || второй операнд будет выбран если первый равен 0 '' undefined null false в случае же с ??
// достатосно чтобы первый операнд был определен,т.е. второй будет выбран ТОЛЬКО если первый null или undefined, это используется тут :
// let max=maxWidth || preferences.maxWidth || 500
// let max=maxWidth ?? preferences.maxWidth ?? 500
// разница в том, что если maxWidth будет равна 0, то max будет равна 0, а не 500 как в случае с ||
let options = { timeout: 0, title: "", verbose: false, n: null };
console.log(options.timeout ?? 1000); // 0 т.к. свойство определено
console.log(options.title ?? "Untitled"); // '' т.к. определена, хоть и ничему не равна
console.log(options.verbose ?? true); // false т.к. определена
console.log(options.quiet ?? false); // false т.к. нет такого свойства
console.log(options.n ?? 10); // 10 т.к. свойство равно null
// Во первых трех если бы было || то был бы выбран второй операнд
// ?? || ?? имеют одинаковый приоритет, так что скобки ставить обязательно! иначе будет ошибка , например тут a??b||c

// 4.13.3 операция typeof - возвращает строку! которая указывает тип операнда
// undefined => undefined
// null => object !!!
// true false => boolean
// число или NaN => number
// значение BigInt => bigint
// любая строка => string
// любой символ => symbol
// любая функция => function !!!
// любой обьект отличный от нуля => object

// 4.13.4 delete
// удаляет свойство обьекта или элемент массива... причем оставляет в нем "дыру"
let q = { x: 1, y: 2 };
delete q.x; // удалить свойство х у обьекта
"x" in q; // false, свойства больше нет
let w = [1, 2, 3];
delete w[2];
2 in w; // false
w.length; // 3 !!! т.е. свойство удалил но ячейка осталась!! такой массив называется разреженным
console.log(typeof w[2]); // undefined
//  удалять переменную нельзя, выведет false  в обычном и SyntaxError  в строгом режиме
// если свойство неудаляемое (неконфигурируемое) то вернет false в обычном и TypeError в строгом режиме
console.log(delete q);
console.log(q);

// 4.13.6 void
// Вычисляет свой операнд после чего отбрасывает значение и возвращает undefined.... хер пойми нафига, если можно {} использовать
let counter = 0;
const increment = () => void counter++;
console.log(increment()); // undefined
console.log(counter); //1

// 4.13.7 , запятая
// вычисляет левый операнд, затем правый и возвращает правый... в общем в фор применяется

for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i + j);
}
