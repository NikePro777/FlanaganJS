// если мы хотим естественным образом использовать ирективы import  в браузере, то обязаны сообщить браузеру об этом: <script type='module'>
// этот дискриптор отмечает начальную точку работы программы

// node использует расширение файлов как подсказку, поэтому для модульных файлов можно применять расширение .mjs

// Для работы с модулем, нам нужно его загрузить. Мы можем сделать это:
// 1. Статически
import * as stats from "./ES6_modules";
// 2. Динамически
import("/stats.js").then((stats) => {
  let average = stats.mean(data);
});
// 3. Асинхронно
// async analizeData(data){
//     let stats = await import ('./ES6_modules')
//     return {
//         average: stats.mean(data),
//         stddev: stats.stddev(data)
//     }
// }

// 10.3.7 import.meta.url

// синтаксис import.meta cодержит методанные, о выполняющемся на текущий момент модуле
// свойства url этого обьекта , хранит url из которого модуль был загружен
// вариант применения import.meta.url - ссылки на фото, видео, которые хранятся в том же самом каталоге
