// 10.1 Модули, использующие классы, обьекты и замыкания

// Модуль для расчета статистических данных
const stats = (function () {
  // Служебные функции закрыты по отношению к модулю
  const sum = (x, y) => x + y;
  const square = (x) => x * x;

  // открытая функция будет экспортироваться
  function mean(data) {
    return data.reduce(sum) / data.length;
  }

  // открытая функция будет экспортироватьсяt
  function stddev(data) {
    let m = mean(data);
    return Math.sqrt(
      data
        .map((x) => x - m)
        .map(square)
        .reduce(sum) /
        (data.length - 1)
    );
  }

  // открытые функции экспортируются в виде свойств обьекта
  return { mean, stddev };
})();

// можем использовать
stats.mean([1, 3, 5, 7, 9]); // => 5
stats.stddev([1, 3, 5, 7, 9]); // => Math.sqrt(10) ~ 3.16227

// 10.1.1 Автоматизация модульности на основе замыканий
function require(modulename) {
  return modules[modulename];
}
// т.е. в require - функция в аргументах которой модуль который испортируется (файл js)

// 10.2.1 Экспортирование в Node
// В ноде есть глобальный обьект exports, который доступен всегда
// если надо что то экспортировать просто пишем то что нужно экспортировать как свойства обьекта экспортс:

const sum = (x, y) => x + y;
const square = (x) => x * x;
exports.mean = (data) => data.reduce(sum) / data.length;
exports.stddev = function (d) {
  let m = exports.mean(d);
  return Math.sqrt(
    d
      .map((x) => x - m)
      .map(square)
      .reduce(sum) /
      (d.length - 1)
  );
};

// если надо только одну функцию экспортировать, тогда:
module.exports = class BitSet extends AbstractWritableSet {
  // реализация
};

// ну и предыдущий обьект можно было экспортировать проще:
module.exports = { mean, stddev };