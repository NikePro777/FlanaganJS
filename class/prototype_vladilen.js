const person = {
  name: "Jeka",
  age: 25,
  greet: function () {
    console.log("greet!");
  },
};
// прототип это родитель для нашего обьекта

//т.е. наш персон2 это экземпляр Обьекта.
const person2 = new Object({
  name: "Jeka",
  age: 25,
  greet: function () {
    console.log("greet!");
  },
});
// и сейчас мы этому родителю добавляем новую функцию
Object.prototype.sayHello = function () {
  console.log("Hello");
}; // Кстать у персона она тоже работает

const lena = Object.create(person2); // мы не просто создали новый обьект, мы указали в скобках обьект, который будет его прототипом (родителем)
lena.greet(); // работает!
lena.sayHello(); // тоже работает! Хоть она и находится у дедушки
// Все в js это обьекты:
const str = "I am string";
// и у этого обьекта есть поля
console.log(str.length);
console.log(str.bold());

// На самом деле мы создали эту строку чз глобальный класс new String, имеющий свои свойства
const str2 = new String("I am string 2");
// если мы там раскроем прототтипы , то увидим и наше sayHello, т.е. Обьект это самый главный класс js, далее уже идут подклассы:
str.sayHello();
