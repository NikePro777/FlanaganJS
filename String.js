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
// Поиск в строке
console.log(s.indexOf('1')); // Позиция буквы или текста, если нет то выведет -1
console.log(s.indexOf('l',5)); // Позиция символа начиная с 5 позиции
console.log(s.lastIndexOf('l')); // Позиция последней встречающейся буквы
// Булевские функции поиска
console.log(s.startsWith('Hel')); // Начинается ли с этого строка
console.log(s.endsWith('ld')); // Заканчивается ли этим строка
console.log(s.includes('world')); // Есть ли в нашей строке данная последовательность
// Модификация строки
console.log(s.replace('world','you')); // Заменяет world на you
console.log(s.toLowerCase());
console.log(s.toUpperCase());
console.log(s.normalize());
console.log(s.normalize('NFD')); // Нормализации Юникода.... хз зачем
// Инспектирование симфолов (16 битных)
console.log(s.charAt(0)) // первый символ
console.log(s.charAt(s.length-1)); // Последний
console.log(s.charCodeAt(0)); //16-те битное число указанной позиции
console.log(s.codePointAt(0)); // Кодовые точки > 16 бит
// Усечения пробелов
console.log(' test '.trim()); // Пробелы удаляет по бокам
console.log(' test '.trimStart());
console.log(' test '.trimEnd())
// Смешанные методы строк
console.log(s.concat('!')); // Конкатенация с указанной строкой, можно использовать +
console.log('<>'.repeat(5)); // Повторяет указанное количество раз
// Строки можно трактовать как массивы
console.log(s[0]);
console.log(s[s.length-1]); // замена charAt
//3.3.4 Теговые щаблонные литералы
console.log('\n'.length); //  => 1 т.к Содержит символ новой строки
console.log(String.raw`\n`);  // => \n  - raw обрабатывает строку не обрабатывая управляющие символы в обратных ковычках
// 3.3.5 Сопоставление с шаблонами (регулярные выражения)
let text = 'testing: 1, 2, 3'
let pattern = /\d+/g // -соответствует всем вхождениям одной или большего количества цифр
console.log(pattern.test(text));  // Проверяет есть ли совпадения
console.log(text.search(pattern)); // позиция первого совпадения
console.log(text.match(pattern)); // Выводит массив всех совпадений
console.log(text.replace(pattern, '#')); // Заменяет все совпадения решетками
console.log(text.split(/\D+/)); // Разбивает по нецифровым символам
// 3.4 Булевские значения
// let o = null
// if (o !==null){
//     o='complete'
// } else {o= false}
// console.log(o); //Тут выполнится если null 
let o = null
if (o){
    o='complete'
} else {o= false}
console.log(o); //Тут выполнится если 0 null undefined '' -0 false

// if ((x===0 && y===0) || !(z===0)){
//     // Условие выполнится если x и y равны нулю или z  не равна нулю
// }

// 3.5 null and undefined
// null - применяется для указания отсутствия значения 
// typeof(null) = object - отсутствие обьекта,  однако на практике - единственный член собственного типа
// undefined - значение переменных которые не были инициализированны