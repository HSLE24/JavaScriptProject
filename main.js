const chance = 5
let answer = 0
let user_history

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function gameReset(){
    answer = getRandomArbitrary(1, 100)
    user_history = []
    
    console.log("숫자를 입력하세요:) 기회는 " + chance +"번")
    console.log("gameReset()으로 게임을 리셋합니다.")
    console.log("checkUserNumber(숫자)로 답을 제출합니다.")
}

function checkUserNumber(user_number){
    if (user_history.length == chance || answer == 0){
        console.log("게임 리셋이 필요합니다. (버튼 비활성화)")

        return;
    }

    if (user_number > 100 || user_number < 1){
        console.log("1 ~ 100 사이 숫자 입력 바랍니다.")

        return;
    }

    if (user_history.includes(user_number)){
        console.log("이미 입력한 값입니다.")

        return;
    }

    if (user_number < answer){
        console.log("Up!")
        user_history.push(user_number)
    }
    else if (user_number > answer){
        console.log("Down!")
        user_history.push(user_number)
    }
    else {
        console.log("That's right")
        answer = 0
        user_history.init()
    }

    if (user_history.length == chance || answer == 0){
        console.log("게임이 종료되었습니다.")
        console.log("게임 리셋이 필요합니다. (버튼 비활성화)")
    }
}

gameReset();