// 3.3 Текст
// 3.3.1
let love = "\ud83d\udc99";
console.log(love);
console.log(love.length); // ->2

console.log('\u03c0'); // Pi
console.log('\u{1f600}');  // smile

console.log("two\nlines"); // 2 строки
console.log("one\long\line");   // 1 строка
console.log(`две строки
в двух строках`);

// table 3.1 Управляющие последовательности
console.log('\0'); // пустой символ (символ NUL)
console.log('\b1'); // Забой
console.log('\t1'); // Tабуляция (\u0009)
console.log('\v1'); // Вертикальная табуляция
console.log('\f1'); // Перевод страницы
console.log('\r4545'); // Возврат каретки
console.log('\"'); // ковычки
console.log('\\'); // Косая черта
console.log('\xAA'); // Символ Unicode указанный 2мя шестнацатеричными цифрами АА
console.log('\uAAAA'); // Символ Unicode указанный 4мя шестнацатеричными цифрами ААAA
console.log('\u{ABAA}'); // Символ Unicode указанный от 1 до 6 шестнацатеричными цифрами между 0 и 10FFFF

// 3.3.3 Работа со строками

let s = 'Hello, world'
console.log(s.length); // длина строки
// Получение порции строки
console.log(s.substring(1,4)); // Получение символов с 1 по 4 индекс
console.log(s.slice(1,4)); // Получение символов с 1 по 4 индекс - Аналогично.
// Сначала был сабстринг, но он не работает с "-" числами, поэтому не важен порядок s.substring(1,4) === s.substring(4,1)
// слайс может отмечать символы с конца строки :
console.log(s.slice(-3)); // Последние n символов
console.log(s.split(', ')); // Разделяет строку по аргументу (превращает в массив)