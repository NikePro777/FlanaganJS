// 5.2 Пустой и составной оператор
// Составной оператор заключен в {}т.е. там где ожидалось одно выражение может поместиться несоклько
// Пустой оператор - ; наоборот где требуется оператор но надо ничего не делать:
let a = [1, 2],
  n;
for (let i = 0; i < a.length; a[i++] = 0); // все делает [i++] поэтому тело не нужно, но использовать обязаны
// 5.3 Условные операторы
// 5.3.1 if
// Сама конструкция такая: if(выражение) оператор 1 else оператор 2. т.е. по сути {} не нужны... но можно легко запутаться, поэтому ставим везде!

// 5.3.3 switch
switch (n) {
  case 1: // case это только начальная точка...
    break; // поэтому обязательно наличие break (или return) чтобы выйти в конец цикла, иначе по всем нижестоящим case пройдемся
  default:
    break;
}

function convert(x) {
  switch (typeof x) {
    case "number": // Преобразование после свич сравнивается с case через === т.е. типы должны совпадать!
      return x.toString(16); // Преобразовать число в шестнадцатеричное целое
    case "string":
      return '"' + x + '"'; // Возвратить строку, заключенную в ковычки
    default:
      return String(x); // Если ничего из этого, то просто преобразуем как обычно
  }
}
console.log(convert(["dsf", "fdg"]));

// 5.4 Циклы
// 5.4.1 while
// while (выражение) оператор
let count = 0;
while (count < 10) {
  console.log(count);
  count++;
}
// 5.4.2 do/while
// для тех редких случаев когда хотябы один раз цикл должен быть выполнен. do должен заканчиваться ; (while можно просто в {} заключить)
function printArray(a) {
  let len = a.length,
    i = 0;
  if (len === 0) {
    console.log("Пустой массив");
  } else {
    do {
      console.log(a[i]);
    } while (++i < len);
  }
}
// 5.4.3 for
// for (инициализация; проверка; инкрементирование) оператор
//все что в () можно опускать, но ; обязательна!
function tail(o) {
  // возвращает последнее свойство
  for (
    ;
    o.next;
    o = o.next // пустое тело
  )
    return o;
}
// 5.4.4 for/of
// для работы с итерируемыми обьектами. т.е. для работы с массивами, строками (и множествами) !
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  summ = 0;
for (let elem of data) {
  // elem присваивается элемент масссива data. делается тело цикла, затем присваивается следующий и так до конца массива
  summ += elem; // если добавим data.push(sum) то создадим бесконечный цикл
}
console.log(summ);

// for/of с обьектами
// for of не может работать с обьектами
let o = { x: 1, y: 2, z: 3 };
// for (let element of o); // TypeError: o is not iterable
// , но межет работать с их ключами:
let keys = "";
for (let k of Object.keys(o)) {
  keys += k;
}
console.log(keys); //xyz

// или со значениями:
let sum = 0;
for (let k of Object.values(o)) {
  sum += k;
}
console.log(sum); // 6

//  а если нужны и ключи и значения:
let pairs = "";
for (let [k, v] of Object.entries(o)) {
  pairs += k + v;
}
console.log(pairs);
// Object.entries(o) - метод возвращающий массив массивов где каждый массив - пара ключ/значение

// for/of со строками
// Строки итерируются посимвольно:
let frequency = {};
for (let letter of "missisippi") {
  if (frequency[letter]) {
    frequency[letter]++;
  } else {
    frequency[letter] = 1;
  }
}
console.log(frequency); //{m: 1, i: 4, s: 3, p: 2}

// for/of  с классами Map и Set
let text = "Na na na na na Batman!";
let wordSet = new Set(text.split(" ")); // Set разбивает массив по уникальным элементам, складывая их в обьект, где ключ это номер, а значение - уникальное значение
let wordNumb = new Set([2, 3, 3, 2, 1, 12]);
console.log(wordSet);
console.log(wordNumb);

// Map же работает с парой ключ/значение:
let m = new Map([
  [1, "one"],
  [2, "two"],
]);
for (let [key, value] of m) {
  // Каждый раз во время итерации итератор возвращает массив
  key;
  value;
}
console.log(m);
// for/await - для работы с асинхронными запросами
// Для чтения порции асинхронно итерируемого потока данных и вывода их:
async function printStream(stream) {
  for await (let chunk of stream) {
    console.log(chunk);
  }
}
