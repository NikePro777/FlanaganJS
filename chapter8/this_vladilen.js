function hello() {
  console.log("Hello", this);
}
hello(); // в консоли будет hello и глобальный обьект window

const person = {
  name: "Vladilen",
  age: 25,
  sayHello: hello,
};
// теперь если мы вызовем:
person.sayHello(); // в консоли this будет уже наш person
window.hello(); // получим старый результат
// this - всегда динамична. Показывает тот обьект, в контексте которого она вызвана.

// Теперь допустим мы хотим функцию, которая будет использовать нашу функцию но ссылаться на обьект window:
person.sayHelloWindow = hello;
person.sayHelloWindow(); // будет ссылаться на обьект person, чтобы такого не было, воспользуемся методом:
person.sayHelloWindow = hello.bind(window);
person.sayHelloWindow(); // все работает так как мы хотели! Причем можно было написать .bind(this) потому что он тоже указывает на глобальный обьект window т.к
console.log(this === window); // true

person.logInfo = function (job, phone) {
  console.group(`${this.name} info:`);
  console.log(`Name is ${this.name}`);
  console.log(`Age is ${this.age}`);
  console.log(`Job is ${job}`);
  console.log(`Phone is ${phone}`);
  console.groupEnd();
}; // this будет ссылаться на персон, т.е. this.name === person.name , просто наша запись более универсальна
person.logInfo(); // выведутся владилен и 25
const lena = {
  name: "Elena",
  age: 23,
};
// для того чтобы вызвать logInfo на обьекте лена , мы можем сделать так:
person.logInfo.bind(lena); // Не произойдет ничего! потому что bind не вызывает функцию, а возвращает ее, привязав новый контекст
person.logInfo.bind(lena)(); // теперь вызвали ее сразу!
// как bind передает значения:
let fnLenaInfoLog = person.logInfo.bind(lena);
fnLenaInfoLog("Front", "8999456456");

// но мы можем передвать это и в bind: просто 1 аргумент это контекст, а остальные это передаваемые аргументы:

fnLenaInfoLog = person.logInfo.bind(lena, "Front", "8999456456");
fnLenaInfoLog();

console.log("call:");
// Кроме того есть еще 2 метода:
// call тоже самое что и bind, только он еще вызывает функцию
person.logInfo.call(lena, "Front", "8999456456");

console.log("apply");
// тоже самое что и call только все аргументы кроме контекста передаются массивом:
person.logInfo.apply(lena, ["Front", "8999456456"]);

// как комбинировать контекст и прототипы?
// задача- есть массив и нужна функция которая умножит каждый элемент массива на к-л число
const array = [1, 2, 3, 4, 5];
// простой способ: пробегаемся по массиву с помощью map, и возвращаем каждый жлемент умноженный на n
function multBy(arr, n) {
  return arr.map(function (i) {
    return i * n;
  });
}
console.log(multBy(array, 5)); // Однако использовать не оч удобно - постоянно надо импортировать и т.д., поэтому воспользуемся прототипами
Array.prototype.multBy = function (n) {
  return this.map(function (i) {
    // здесь this это и есть тот массив, который мы умножаем
    return i * n;
  });
};

console.log(array.multBy(2));
