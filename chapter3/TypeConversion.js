// Обьекты и массивы не равны! 
let oo = {x:1}, p = {x:1}
console.log(oo===p);  // => false т.к. разные ссылки
let aa =[], bb=[]
console.log(aa===bb); // => false отдельные массивы никогда не равны
// Два обьекта будут одинаковыми только если ссылаются на тот же самый внутренний обьект:
let nn = []
let dd = nn
dd[0]=1
console.log(nn[0]); // =>1
console.log(nn===dd);  // true а и b ссылаются на один и тот же обьект, поэтому они равны
// Копирование массивов
let a = ['a', 'b', 'c']
let b = []
for (let i =0; i<a.length ; i++){
    b[i]=a[i]
}
console.log(b);
let c = Array.from(b) //в ES6 копирует сам массив, не ссылку
console.log(c); console.log('они равны? ' + b===c);
// Поэтому если нам надо сравнить обьекты или массивы, то:
function equalArrays(a,b){
    if (a===b) return true //Если у них одна ссылка то они равны
    if (a.length !== b.length) return false //Если у них разная длина, то они не равны
    for (let i = 0; i< a.length ; i++){ //Сравниваем каждый элемент
        if (a[i] !== b[i]) return false
    }
    return true // Если до этого false не вернули, значит длина одинакова и каждый элемент идентичен, значит они равны
}   
// 3.9.2 Явные преобразования
// в строку
// Метод toString() принимает необязательный аргумент - систему счисления к которой будет приведено число , которое будет преобразовано в строку. По умолчанию - десятичная
let n = 17
let binary = '0b' + n.toString(2) //0b10001
let octal = '0o' + n.toString(8) // 0o21
let hex = '0x' + n.toString(16) // 0x11
// Преобразование чисел в строки
n=123456.789
console.log(n.toFixed(0)); // Полностью выводит целую часть. Аргумент - кол-во цифр после запятой
console.log(n.toFixed(5));
console.log(n.toExponential(1)); // Целая часть всегда одна цифра. Аргумент - сколько цифр после запятой. далее 10 в какой то степени
console.log(n.toExponential(3))
console.log(n.toPrecision(1)); // Сколько указали в аргумента, столько и будет значащих цифр
console.log(n.toPrecision(5));
console.log(n.toPrecision(10)); // Все методы округляют числа
//Intl.NumberFormat  - хз

// в число
// parseInt и parseFloat - преобразую строку в число игнорируя начальные символы. В общем берут строку откидывают пробелы и преобразует в число. int-целые числа float - с точкой
console.log(parseInt('3 blind mice'));
console.log(parseFloat(' 3.14 meters'));
console.log(parseInt('-12.34'));
console.log(parseInt('0xFF')); // => 255 Системы счисления различают 
console.log(parseInt('0xff'));
console.log(parseInt('-0XFF'));
console.log(parseFloat('.1'));
console.log(parseInt('.1')); // => NaN т.к с точки не может начинаться целое число
console.log(parseFloat('$3.43')); // => NaN с доллара тоже число не начинается)
// кроме того parseInt имеет необяз аргумент - систему счисления и с ее учетом переводит в десятичное число
console.log(parseInt('11',2)); //=> 3
console.log(parseInt('077',8)); //=> 63

// 3.9.3 Преобразования обьектов
// в булевские значения ВСЕ обьекты преобразуются как true !!! {} => true
// Методы toString и valueOf
console.log({x:1,y:2}.toString()); // [object Object] -почему это полезно - будет сказано далее...
console.log([1,2,3].toString()); // Каждый элемент массива преобразует в строку и конкатенирует через запятую
console.log((function(x){f(x);}).toString()); // => function(x){f(x);} - Преобразует в строки исходного кода
console.log(/\d+/g.toString()); // /\d+/g 
let d = new Date(2020,0,1)
console.log(d.toString()); // Преобразует в колендарную строку с месяцем днем недели и т.д. В общем пригодую для чтения человеком

console.log({x:1,y:2}.valueOf()); // ValueOf не парится а просто выводит аргументы везде кроме даты
console.log([1,2,3].valueOf()); 
let g = new Date(2020,0,1)
console.log(g.valueOf()) // Тут он выводит количество милисекунд

// Все кроме Date пытается сначала преобразовываться в строку а потом в число Если в число, то сначало используется valueOf а затем toString
console.log(Number([])); // []=> '' => 0
console.log(Number([99])); // [99] => '99' => 99