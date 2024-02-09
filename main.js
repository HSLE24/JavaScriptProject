// 유저는 숫자를 입력할 수 있다.
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 작으면 Up!이라고 알려준다.
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 크면 Down!이라고 알려준다.
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자와 일치한다면 That's right이라고 뜨고 게임이 종료된다.
// 유저는 총 5번의 기회가 있다.
// 게임이 종료되면 버튼은 비활성화된다.
// 리셋버튼을 누르면 게임이 초기화된다.
// 유저가 1~100 범위 밖의 숫자를 입력할 시에 경고 메세지가 뜬다.
// 유저가 이미 입력한 값을 또 입력할 시에 경고 메세지가 뜬다.
// 반응형 UI

let computerNum = 0

let playButton = document.getElementById("play-button") //HTML 요소를 가져올 수 있다. getElementByClassName, querySelector
let userInput = document.getElementById("user-input") //HTML 요소를 가져올 수 있다. getElementByClassName, querySelector
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chanceArea = document.getElementById("chance-area")
let gameImage = document.getElementById("game-image")

let chance = 5
let userHist = []

playButton.addEventListener("click", play)
resetButton.addEventListener("click", initGame)
document.addEventListener("keypress", handleEnterKeyPress)
// userInput.addEventListener("focus", function (){
//     userInput.value = ""
// })

let intro = "./image/99B016465E307B5D05.gif"
let success = "./image/20240209.gif"
let upAndDown = ["./image/1587467634427.gif", "./image/9995DA4D5E097E7C2D.gif", "./image/2022020413301850393.gif", "./image/1587467625648.gif", "./image/1587467627950.gif", "./image/1587467636375.gif", "./image/1587467644678.gif"]
let end = "./image/1587467672014.gif"
let wrong = "./image/1587467666796.gif"
let rand

function initGame(){
    chance = 5
    userHist = []
    pickRandomNum()

    userInput.value = ""
    chanceArea.textContent = `남은 찬스 : ${chance}`
    resultArea.textContent = "결과 값이 여기 나옵니다."
    gameImage.src = intro

    playButton.disabled = false
    resetButton.disabled = true
}

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100) + 1
    console.log(computerNum)
}

function play(){
    let userValue = userInput.value

    if (userValue > 100 || userValue < 1){
        resultArea.textContent = "1 ~ 100 사이의 숫자를 입력하세요"
        userInput.value = ""
        gameImage.src = wrong
        return
    }

    if (userHist.includes(userValue)){
        resultArea.textContent = "이미 입력 했던 숫자입니다."
        userInput.value = ""
        gameImage.src = wrong
        return
    }

    if (userValue == computerNum) {
        resultArea.textContent = "That's right"
        chanceArea.textContent = "Congratulation!!!!"
        
        chance = 0
        gameImage.src = success

        playButton.disabled = true
        resetButton.disabled = false

        return
    }
    else if (userValue < computerNum){
        resultArea.textContent = "Up!!"
        userHist.push(userValue)
        chance--
        
        rand = Math.floor(Math.random() * upAndDown.length)
        gameImage.src = upAndDown[rand]
    }
    else if (userValue > computerNum){
        resultArea.textContent = "Down!"
        userHist.push(userValue)
        chance--

        rand = Math.floor(Math.random() * upAndDown.length)
        gameImage.src = upAndDown[rand]
    }

    userInput.value = ""
    chanceArea.textContent = `남은 찬스 : ${chance}`
    
    if (chance == 0){
        playButton.disabled = true
        resetButton.disabled = false

        gameImage.src = end
    }
}

function handleEnterKeyPress(event){
    if (event.which === 13 || event.keyCode === 13){
        if (playButton.disabled){
            initGame()
        }
        else { 
            play();
        }
    }
}

initGame()