const myNumber = 42;

// localStorage.setItem("number", myNumber); // Что то передать в лс , тут 2 параметра ключ и само значение (причем строка!)
// localStorage.getItem("number"); // Что то получить из лс
// localStorage.removeItem("number"); // удаление конкретного ключа
// localStorage.clear(); // очистка лс полностью

const object = {
  name: "Jeka",
  age: 29,
};
// если мы сейчас прямо так запишем, то получим потерю данных :
localStorage.setItem("person", object);
localStorage.getItem("person"); // [object Object] т.к. лс работает только со строкой
// поэтому делаем по другому:
localStorage.setItem("person", JSON.stringify(object));
const raw = localStorage.getItem("person");
const person = JSON.parse(raw);
person.name = "Evgenij";
console.log(person);

// =============
// Если у нас открыто несоклько вкладок, то для того чтобы их снхронизировать можно селать следующее:
window.addEventListener("storage", (event) => {
  console.log(event); // но тут внимание, событие работает так, что консоль вызовется только если мы записали что то в лс в другой вкладке (в этой же не вызовется)
});
//window.onstorage = () => {}
