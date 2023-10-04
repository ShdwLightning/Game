const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FF1493', '#DA70D6', '#E6E6FA', '#00FF00', '#006400', '#FFF8DC', '#F4A460', '#FFE4E1', '#FFF0F5', '#000000', '#6A5ACD', '#F0E68C']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    //Условие проверяет, если при нажатии на кнопку, у нее присутствует класс contains(в данном случае этот класс time-btn) то будет осуществлен переход
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()

    }   
}) 


board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()

    }
})



//Создали функцию, которая отвечает за начало игры, то есть при выборе на 2 экране времени, переход к 3 экрану и фиксированием времени
function startGame () {
    //Функция задает таймер, через каждый промежуток времени, который мы задеам, выполнять другую функцию
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}




function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if(current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}


function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
    timeEl.parentNode.classList.add('hide')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    //Создаем переменную которая как раз и задает для нашего диапазона, наши значения
    const size = getRandomNumber(10, 50)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = color


    board.append(circle)
}


// Функция отвечате за диапозон значений (и округляет значение)
function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}