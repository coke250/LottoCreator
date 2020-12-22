let candidateNumbers;   // 후보 번호 (1 ~ 45)
let pickNumbers = [];   // 추첨 번호 7개
let lottoNumbers;       // 로또 번호 6개
let bonusNumber;        // 보너스 번호 1개
let timeouts = [];

// 로또 번호 생성 함수
function createLotto(){
    // 후보 번호 생성
    candidateNumbers = Array(45).fill().map((value, index) => {
        return index + 1;
    });

    // 로또 번호 뽑기
    let numbers = [];
    for(let i=0; i<7; i++){
        let number = candidateNumbers.splice(Math.floor(Math.random() * candidateNumbers.length), 1)[0];
        numbers.push(number);
    }

    lottoNumbers = numbers.slice(0, 6).sort((a, b) => a - b); // 로또 번호 분리
    bonusNumber = numbers[numbers.length - 1]; // 보너스 번호 분리

    render();
}

// 공 설정 함수
function setBall(number, parent){
    var div = document.createElement('div');
    var backgroundColor;

    if(number <= 10){ // 노
        backgroundColor = '#fbc400';
    }
    else if(number <= 20){ // 파
        backgroundColor = '#69c8f2';
    }
    else if(number <= 30){ // 빨
        backgroundColor = '#ff7272';
    }
    else if(number <= 40){ // 회
        backgroundColor = '#aaa';
    }
    else { // 초
        backgroundColor = '#b0d840';
    }

    div.textContent = number;
    div.id = 'ball';
    div.style.background = backgroundColor;
    parent.append(div);
}

function clearTimeouts(){
    for(let i=0; i<timeouts.length; i++){
        clearTimeout(timeouts[i]);
    }

    timeouts=[];
}

// 화면 표시
function render(){
    // 요소 초기화
    let lotto = document.getElementById('lotto');
    lotto.innerHTML = '';

    let bonus = document.getElementById('bonus');
    bonus.innerHTML = '';

    // cleartimeout
    clearTimeouts();

    for(var i =0; i<lottoNumbers.length; i++){
        let number = lottoNumbers[i];
        let timeout = setTimeout(() => {
            setBall(number, lotto);
        }, (i + 1) * 1000);
        timeouts.push(timeout);
    }
    
    let timeout = setTimeout(() => {
        setBall(bonusNumber, bonus);
    }, (i + 1) * 1000);
    timeouts.push(timeout);
}

var button = document.getElementsByTagName("button")[0];
button.addEventListener('click', createLotto);