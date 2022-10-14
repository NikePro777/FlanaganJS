/**
 Экземпляры данного класса - комплексные числа. (вещественное и мнимое число(корень из -1))
 */
class Complex {
  // Вообще можно и без this, но пока стандарта нет (хотя в опере и хроме работает)
  // #r = 0;
  // #i = 0;
  // r и i - поля экземпляра, содержащие вещественную и мнимую части
  constructor(real, imaginary) {
    this.r = real; // Вещественная часть числа
    this.i = imaginary; // Мнимая
  }
  // методы для сложения и умножения комплексных чисел. Вообще если c и d экземпляры нашего класса , то можно было записать так: c.plus(d) или d.times(c)
  plus(that) {
    return new Complex(this.r + that.r, this.i + that.i);
  }
  times(that) {
    return new Complex(
      this.r * that.r - this.i * that.i,
      this.r * that.i + this.i * that.r
    );
  }

  // Статические версии методов, для действий с комплексными числами
  // Можем записать как Complex.sum(c,d) и Complex.product(c,d)
  static sum(c, d) {
    return c.plus(d);
  }
  static product(c, d) {
    return c.times(d);
  }
  // Если бы поля были закрытыми this.#r and this.#i
  // То необходимы бы были методы получения полей:
  get real() {
    return this.r;
  }
  get imaginary() {
    return this.i;
  }
  get magnitude() {
    return Math.hypot(this.r, this.i);
  }

  // Классы должны иметь метод toString()
  toString() {
    return `{${this.r},${this.i}}`;
  }

  // Проверка, представляют ли два экземпляра класса одно и тоже значение
  equals(that) {
    return that instanceof Complex && this.r === that.r && this.i === that.i;
  }

  // После того как статические поля будут поддерживаться внутри тела класса, можно будет делать так:
  // static ZERO = new Complex(0,0);
}

// ниже определены поля класса (полезные)
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);
// Теперь можно использовать

let c = new Complex(2, 3);
let d = new Complex(c.r, c.i);

console.log(c.plus(d).toString());
console.log(c.magnitude);
console.log(Complex.product(c, d));
console.log(Complex.ZERO.toString());

// 9.4 Добавление методов в существующие классы
// Можно просто добавлять свойство прототипу и класс автоматически сможет им пользоваться:
// Добавим способ вычисления комплексно сопряженного числа
Complex.prototype.conj = function () {
  return new Complex(this.r, -this.i);
};

// Если новый метод starsWidth() класса String  еще не определен, то
if (!String.prototype.startsWith) {
  // тогда определить его с использованием более старого метода:
  String.prototype.startsWith = function (s) {
    return this.indexOf(s) === 0;
  };
}
// еще пример: добавить функцию, вызывающюю хэлоу определенное кол-во раз:
let n = 3;

Number.prototype.times = function (f, context) {
  let n = this.valueOf();
  for (let i = 0; i < n; i++) {
    f.call(context, i);
  }
};

n.times((i) => {
  console.log(`hello${i}`);
});

// крч все бы ничего, но мы изменяем глобальные свойства, поэтому если когда нибудь появятся свойства с такими же именами - будет пздц
n.times(3);
