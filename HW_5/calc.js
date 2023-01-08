//Переменная для поля вывода
let input = document.querySelector('.result');

//Сохраненное выражение для возведения в степень (в виде x^y)
let power = "";

//Вставить символ
function insert(num) {
 //input.textContent - у div нет свойства value, поэтому textContent
//if проверяет, есть ли в поле 0 и убирает его, затем вставляет значение нажатой кнопки
/* Можно было бы убрать видимость 0 по умолчанию из поля результата и функция была бы меньше. 
Кроме того, если первое число хотим прописать как десятичное, ноль не ставится, получаем   ,3.
Но вычисляет верно*/
    if (input.textContent == 0) {
        input.textContent = "";
        input.textContent += num;
    } else
        input.textContent += num;
}

//Очистить поле вывода
function clean() {
    input.textContent = "0";
    power = "";
}

//Удалить символ
function back() {
    let exp = input.textContent;
    //метод, который позволяет убрать у строки символы
    input.textContent = exp.substring(0, exp.length - 1);
    //если 0 стоит по умолчанию
    if (input.textContent == 0) {
        input.textContent = "0";
    }
}

//Посчитать выражение
function equal() {
    let exp = input.textContent;
    if (input.textContent.includes('^')) {
        //для возведения в степень разбиваем массив input по символу "^" (массив в виде ["x","y"])
        let tmp = input.textContent.split('^')
        //переводим первое число из строки в числовой вид
        let num = eval(power);
        //первый индекс из массива становится степенью, плюс переводит из строки в численный вид
        let pow = +tmp[1]
        //возводим в степень
        input.textContent = Math.pow(num, pow);
        //очищаем переменную power
        power = "";
        //выходим из функции, чтобы не выполнялся следующий if
        return;
    }
    if (exp) {
    //функция переводит строку в выражение и вычисляет его
        input.textContent = eval(exp);
    }
}

//Вычислить проценты
function percent() {
    input.textContent = eval(input.textContent) / 100;
}

//Для добавления констант
function constant(name) {
    if (input.textContent == 0) {
        input.textContent = "";
    }
    if (name == "pi")
    //сложение с присваиванием +=
        input.textContent += Math.PI.toFixed(11);
    if (name == "e")
        input.textContent += Math.E.toFixed(11);
}

/*В функции добавления костант есть баг: если уже введено какое-либо число, при нажатии
кнопки константы оно дописывает значение сразу после числа. Нужно добавить
если input.textContent.включает ('^||+||-||*||/'), то дописать константу к выражению
input.textContent += Math.PI.toFixed, если же  input.textContent = числу, то очистить поле
и ввести константу.*/

//Корень квадратный, в квадрат в -1 степень
function operation(name) {
    if (name == "sqrt")
        input.textContent = Math.sqrt(eval(input.textContent));
    if (name == "sqr")
        input.textContent = Math.pow(eval(input.textContent), 2);
    if (name == "^-1")
        input.textContent = Math.pow(eval(input.textContent), -1);
    if (name == "^") {
        power = input.textContent;
    //сложение с присваиванием (добавляет значение к переменной и присваивает переменной результат)
        input.textContent += "^";
    }
}

//Факториал числа
function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
}
function fact() {
    input.textContent = factorial(+eval(input.textContent));
}

/*Баг функции факториала: если факториал - число в степени, то степень не будет отображаться.
Например, факториал 96, видно только начало ответа.
Нужно округлить до числа символов, видимых на экране и показать степень*/

//Логарифмы
function log(name) {
    if (name == 'lg') {
        input.textContent = Math.log10(eval(input.textContent)).toFixed(11);
    }
    if (name == 'ln') {
        input.textContent = Math.log(eval(input.textContent)).toFixed(11);
    }
}

//Переключение с градусов на радианы
document.querySelector('.type').addEventListener('click', function() {
    if (document.querySelector('.type').textContent == "deg") {
        this.textContent = "rad";
        console.log('Градусы')
    } else if (document.querySelector('.type').textContent == "rad") {
        this.textContent = "deg";
        console.log('Радианы')
    }
})

//Синусы и косинусы
function f(name) {
    if (name == 'sin') {
        if(document.querySelector('.type').textContent == "deg") {
            //В градусах
            input.textContent = parseFloat(Math.sin(eval(input.textContent) / 180 * Math.PI).toFixed(11).toString());
        } else {
            //В радианах
            input.textContent = parseFloat(Math.sin(eval(input.textContent)).toFixed(11).toString());
        }        
    }
    if (name == 'cos') {
        if(document.querySelector('.type').textContent == "deg") {
            //В градусах
            input.textContent = parseFloat(Math.cos(eval(input.textContent) / 180 * Math.PI).toFixed(11).toString());
        } else {
            //В радианах
            input.textContent = parseFloat(Math.cos(eval(input.textContent)).toFixed(11).toString());
        } 
    }
    if (name == 'tan') {
        if(document.querySelector('.type').textContent == "deg") {
            //В градусах
            input.textContent = parseFloat(Math.tan(eval(input.textContent) / 180 * Math.PI).toFixed(11).toString());
        } else {
            //В радианах
            input.textContent = parseFloat(Math.tan(eval(input.textContent)).toFixed(11).toString());
        }  
    }
    if (name == 'ctg') {
        if(document.querySelector('.type').textContent == "deg") {
            //В градусах
            input.textContent = parseFloat(1/Math.tan(eval(input.textContent) / 180 * Math.PI).toFixed(11).toString());
        } else {
            //В радианах
            input.textContent = parseFloat(1/Math.tan(eval(input.textContent)).toFixed(11).toString());
        } 
    }
}
/*Также нужно будет добавить проверку на поторный ввод операторов, например 5++3 или 8**2,
так как в таком случае калькулятор не работает.*/