// const animal = {
//   name: "Animal",
//   age: 5,
//   hasTail: true,
// };

class Animal {
  static type = "ANIMAL";
  constructor(options) {
    this.name = options.name;
    this.age = options.age;
    this.hasTail = options.hasTail;
  }

  voice() {
    console.log("I am animal");
  }
}
const animal = new Animal({
  name: "Animal",
  age: 5,
  hasTail: true,
});

// Обратиться к статическому значеню можно только используя имя класса которому она принадлежит:
console.log(animal.type); //undefined
console.log(Animal.type); //ANIMAL

class Cat extends Animal {
  static cat = "CAT";
  constructor(options) {
    // И вот тут выскочит ошибка. так как наш класс наследуется, то мы должны вызвать конструктор родителя, перед своим. Это делается с помощью ключевого слова super, который является методом
    super(options); // Этой строчкой мы вызвали конструктор родителя, которому так же должны передать параметры
    this.color = options.color;
  }
  voice() {
    super.voice(); // таким образом можем обратиться к родительскому методу, раз в своем обьекте мы его затираем
    console.log("I am Cat");
  }
  get ageInfo() {
    return this.age * 7;
  }
  set ageInfo(newAge) {
    this.age = newAge;
  }
}
const cat = new Cat({ name: "Cat", age: 7, hasTail: true, color: "black" });

console.log(cat.ageInfo); // обращаемся без () так как это не метод а геттер
cat.ageInfo = 8;
console.log(cat.ageInfo);

class Component {
  constructor(selector) {
    this.$el = document.querySelector(selector); // теперь у нас есть приватная переменная this.el
  }
  hide() {
    this.$el.style.display = "none";
  }
  show() {
    this.$el.style.display = "block";
  }
}

class Box extends Component {
  constructor(options) {
    super(options.selector);
    this.$el.style.width = this.$el.style.height = options.size + "px";
    this.$el.style.background = options.color;
  }
}
const box1 = new Box({
  // теперь у нашего дива есть методы hide и show которые ему не прописывал никто
  selector: "#box1",
  size: 100,
  color: "red",
});

class Circle extends Box {
  constructor(options) {
    super(options);
    this.$el.style.borderRadius = "50%";
  }
}
const c = new Circle({
  selector: "#sircle",
  size: 90,
  color: "green",
});
