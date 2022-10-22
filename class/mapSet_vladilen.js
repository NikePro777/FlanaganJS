const obj = {
  name: "Jeka",
  age: 29,
  job: "chessmaster",
};
console.log(obj);
console.log(Object.entries(obj)); //  тот же обьект, но в другой записи , в виде массива массивов где у каждого ключ значение
const entries = [
  ["name", "Jeka"],
  ["age", "29"],
  ["job", "chessmaster"],
];
console.log(Object.fromEntries(entries)); // наоборот, массив в виде обьекта представляет

// Map
const map = new Map(entries); // в аргументы можем ничего не писать, или массив с подмассивами [ключ, значение]
console.log(map); // 0: {"name" => "Jeka"}1: {"age" => "29"}2: {"job" => "chessmaster"}
console.log(map.get("name")); // можем получить значение, по ключу с помощью get
console.log(obj.name); // тоже самое

// разница между Map и Object
// в map в качестве ключей можем использовать не только строки, а любые виды данных
map.set("new field", 42); // set (ключ, значение) для создания нового свойства
map.set(obj, "value of object").set(NaN, "nan"); // key: {name: 'Jeka', age: 29, job: 'chessmaster'}value: "value of object"
// т.е. теперь чтобы получить значение даного ключа, надо так же вводить этот обьект:
console.log(map.get(obj));

// удаление из map
map.delete("job"); // причем delete возвращает булево значение
console.log(map.has("job")); // проверка есть ли ключ
console.log(map.size); // количество ключей
// map.clear()
// удаляет все ключи

// допольнительные методы
console.log("map - ", map);
for (let entry of map.entries()) {
  console.log(entry); // выводит значения в формате ['name', 'Jeka']
}
// этот цикл обычно делают проще
for (let [key, value] of map) {
  console.log(key, value); // выводит значения в формате строк
}

for (let value of map.values()) {
  console.log(value);
} // список значений

for (let key of map.keys()) {
  console.log(key);
} // список ключей

// так же можем пройтись по нему методом forEach, который принимает 3 пар-ра - значение, ключ, и сам map
map.forEach((val, key, m) => {
  console.log(val, key);
});

// создание массива из карты
const array = [...map];
console.log(array);
const array2 = Array.from(map);
console.log(array2); // тоде самое
