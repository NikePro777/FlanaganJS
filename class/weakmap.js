// по сути тот же самый map но есть особенности - можем избегать утечек... как они могут быть? :
let obj = { name: "weakmap" };
const arr = [obj];
obj = null;
console.log(obj);
console.log(arr); //0: {name: 'weakmap'} ну собственно что и логично
// крч суть в том, что если мы сохраним какие то данные в обьект. Этот обьект обнулим. соответственно ссылки на данные не будет. Произошла утечка... вот для этого и нужен weakmap
let obj2 = { name: "weakmap" };
const map2 = new WeakMap([[obj2, "obj data"]]); // Uncaught TypeError - в weakmap ключами м.б. только обьекты

// собственно она поэтому и слабая, потому что из методов у нее только get set delete has т.е. даже размер узнать не можем
console.log(map2.has(obj2)); // проверяем, есть ли такой ключ
console.log(map2.get(obj2)); // модем его получить

// но теперь вот что интересно, если его обнулить
obj2 = null;
console.log(map2.get(obj2)); // undefined - ну логично, мы же удалили все

console.log(map2); // {{…} => 'obj data'}

// практика
// допустим есть функция, которая принимает пользователя, и если у нас есть пользователь, то будем его выводить, если его нету - то будем сначала добавлять, потом возвращать

const cache = new WeakMap();

function cacheUser(user) {
  if (!cache.has(user)) {
    cache.set(user, Date.now());
  }
  return cache.get(user);
}

let lena = { name: "Elena" };
let alex = { name: "Alex" };
cacheUser(lena);
cacheUser(alex);

console.log(cache.has(lena));
console.log(cache.has(alex)); // ну логично, закешировали пользователей, и они есть в нашем cache

// но предположим обьектов 10000, и в какой то момент:
lena = null;
console.log(cache.has(lena)); // false - ключ удален был и память была очищена

// weakset - по сути тоже самое что и set но значениями данного сета могуть быть только обьекты, и если какой то обьект удаляется, то сразу все очищается

const users = [{ name: "Elena" }, { name: "Alex" }, { name: "Irina" }];
const visits = new WeakSet();
visits.add(users[0]).add(users[1]);
console.log(visits.has(users[0]));
console.log(visits.has(users[1])); // оба пользолвателя присутствуют
// предположим мы удалили какой то обьект
users.splice(1, 1);
console.log(visits.has(users[0]));
console.log(visits.has(users[1])); // false
