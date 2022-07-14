// Object - Все что отличается от строки, числа, дулев значения, символа, Null или undefined - является обьектом
// ключ - строка или символ. Обьекты изменяемые и обраатываются по ссылке!!! а не по значению
// Свойства которые не были унасоедованы- собственные свойста. Обьект который мы создаем обладает 3 атрибутами свойства:
// writable - допускает запись
// enumerable - есть ли перечисление (возвращает ли свойства в цикле for/in)
// configurable - Можно ли удалять свойство и изменять его атрибуты
// 6.2 Создание обьекта
// 6.2.1 с помощью обьектных литералов
let book = {
  "main-title": "JavaScript", // т.к. разделено пробелами или знаками, то используются строковые литералы
  "sub-title": "The Diffinitive Guide",
  for: "all audiences", // фор без ковычек - зарезервированное слово
  aas: 123,
  autor: {
    firstname: "David",
    surname: "Flanagan",
  },
};
// 6.2.2 С помощью операции new.. создается новый прототип. new вообще конструкция для встроенных типов, например:
let oo = new Object(); // ==={}
let a = new Array(); // ===[]
let d = new Date(); // Создает обьект представляющий текущее время
let r = new Map(); // обьект для отображения пары ключ значение
console.log(oo, a, d, r);
// 6.2.3 Прототипы. Почти все созданные обьекты происходят от обьекта прототипа, т.е. наследуют все его свойства.
//Object.prototype - один из редких обьектов не имеющих прототипов (т.е. не наследует никаких свойств)
// 6.2.4 Object.create()
// создает новый обьект, используя в качестве его прототипа первый аргумент:
let o1 = Object.create({ x: 1, y: 2 }); // т.е. о1 наследует свойства х и у
console.log(o1.x + o1.y); // =>3
let o2 = Object.create(null); // Создали обьект без прототипа... т.е. он даже с методом toString() не сможет работать.console.log(o2.toString()) =>TypeError
// чтобы чз create создать обычный пустой обьект (как {} или new Object()) то можно просто указать этот глобальный обьект:
let o3 = Object.create(Object.prototype);
// Так же у Object.create() есть необязательный второй аргумент - свойство нового обьекта
// Это надо если мы хотим в нашем обьекте унаследовать свойства функции но при этом над ней не имеем контроля
let o4 = { x: "не изменяйте это значение" };
// library.function(Object.create(o)); Защита от модификации.... хз что это!

// 6.3 Запрашивание и установка свойств
// Чтобы получить свойство применяем либо точку либо []
// если точка то за ней должен быть простой идентификатор, именующий свойство (крч имя свойства)
// если [] то в нем выражение, которое может быть преобразовано в СТРОКУ или СИМВОЛ (Принято числа), именуюшая свойство
let autor = book.autor; // получили свойство autor от обьекта book
let name = autor.surname;
let title = book["main-title"]; // получили свойство 'main-title' обьекта book
console.log(autor, name, title);
// Аналогично можем присваивать новые свойства, главное чтобы справа знак = стоял
book.edition = 7; // Создали свойство edition у обьекта book
book["main-title"] = "ECMA Script"; // Изменили свойство
console.log(book);

// 6.3.1 Обьекты как ассоциативные массивы
// в blabla[] в [] указывается строка, т.е. наш массив индексируется не по числам а по строкам.... Такой вид массива называется АССОЦИАТИВНЫМ
let portfolio = {
  apple: {
    price: 100,
    shares: 200,
  },
  IBM: {
    price: 50,
    shares: 100,
  },
};
// Частью программы м.б. добавление новых акций в портфель. Но проблема в том, что пользователь вводит название компании во время покупки (заранее мы незнаем) поэтому используем []:
function addstock(portfolio, stockname, shares) {
  portfolio[stockname] = shares;
}
// Теперь можем спокойно посчитать стоимость всех бумаг благодаря for/in
function computeValue(portfolio) {
  let total = 0;
  for (let stock in portfolio) {
    //для каждого пакета ценных бумаг:
    let shares = portfolio[stock]; // Получить количество акций
    let price = getQuote(stock); // Найти курс акций
    total += shares * price; // Добавить стоимость пакета к общей стоимости
  }
  return total; // Возвратить общую стоимость
}

// 6.3.2 Наследование
let o = {}; // o наследует методы обьекта от Object.prototype
o.x = 1; // И теперь имеет собственое свойство x
let p = Object.create(o); // p наследует свойства от о и Object.protorype
p.y = 2; // и имеет собственное свойство y
let q = Object.create(p); // q наследует свойства от p, о и Object.protorype
q.z = 3; // и имеет собственное свойство
let fа = q.toString(); // toString наследуется от Object.prototype
console.log(q.x + q.y); //3 x и у наследуются от q и p
console.log(fа);
// Теперь если мы в обьекте o добавим свойство x то оно просто перепишется
// а если такого не было, то создает новое в этом обьекте, а точно такое же которое есть от прототипа будет скрыто
// Присваивание проследит цепочку вызовов лишь для того чтобы понять, разрешено ли присваивание
let unicircle = { r: 1 };
let c = Object.create(unicircle); // создали обьект со свойством r
c.x = 1;
c.y = 2; //  добавили своих свойств
c.r = 3; // Изменили унаследованное
console.log(unicircle.r); // унаследованное свойство у прототипа осталось неизменным!!!

// 6.3.3 Ошибки доступа к свойствам
// Если свойства нет (в т.ч. у прототипа) то js вернет undefined
console.log(book.subtitle); // у нас есть свойство "sub-title" но не то что я написал
// let len = book.subtitle.length;// TypeError (cвойства же нету)
// Защититься от подобного можно двумя способами:
let surname = undefined;
if (book) {
  if (book.autor) {
    surname = book.autor.surname;
  }
}
console.log(surname);
// Но можно проще:
let surname2 = book && book.autor && book.autor.surname; // но с ECMAScript2020 все проще намного:
let surname3 = book?.autor?.surname;
console.log(surname, surname2, surname3);

// 6.4 Удаление свойств
// delete удаляет свойство из обьекта. Операнд - выражение доступа к свойству. delete работает не со значением, а с самим свойством!
delete book.autor;
delete book["main-title"]; // Удалили два свойства
console.log(book);
// delete вычисляется как true когда успешно удаляет свойство, или если безрезультатно было (cвойства нет такого) delete 5 => true (хоть и бесполезно)
// delete не удалит свойство если атрибут configurable установлен в false.  В строгом режиме это приведет к ошибке, в нестрогом к false
console.log(delete Object.prototype); //false
var x = 1; // глобальная переменная
delete globalThis.x; // не удалить глобальное свойство
delete x; // в нестрогом режиме не обязательно указывать глобальный обьект
console.log(x);
function f() {} // глобальная функция, тоже не удалить

// 6.5 Проверка свойств
// Для того, чтобы узнать имеет ли обьект свойство с заданным именем можно использовать: in, hasOwnProperty(), propertyIsEnumerable() или путем запрашивания свойства
// in ожидает слева имя свойства а с правой обьект. оно возратит true  если обьект имеет свойство или наследует:
console.log("x" in o); // не забываем что имя это строка!! (ну или символ)
console.log("y" in o); //false
console.log("toString" in o); // true - наследственное свойство от глобальнго обьекта
// hasOwnProperty() проверяет есть ли свое свойство. Если оно унаследовано вернут false
console.log(o.hasOwnProperty("x")); // true
console.log(o.hasOwnProperty("y")); // false
console.log(o.hasOwnProperty("toString")); //false - т.к. не свое)
// propertyIsEnumerable() проверяет на собственность И на перечислимость
console.log(o.propertyIsEnumerable("x"));
console.log(o.propertyIsEnumerable("toString")); // не собственное
console.log(Object.prototype.propertyIsEnumerable("toString")); // собственное но не перечислимое (как сделать неперечислимое - далее скажут в 14 главе)
// Кстать еще вместо in можно просто !== undefined использовать:
console.log(o.x !== undefined); // true - есть такое свойство
console.log(o.toString !== undefined); // унаследовалось
// in в отличие от !== различает свойства которые не существуют и которые равны undefined
o.x = undefined;
console.log(o.x !== undefined); // false (хотя свойство есть)
console.log("x" in o); // true
