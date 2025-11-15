let shuffledArray = [];
let imageFiles = [];
let questionNum = 0;
let score = 0;
let answer = '';

function startButtonClicked()
{
    window.location.href = "./game.html"
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if(path.includes('game.html')) {
        startGame();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            handleAnswerClick(event.target);
        })
    })
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame()
{
    imageFiles = [
        '박지원1.png', '박지원2.jpg',
        '백지헌1.png', '백지헌2.png',
        '송하영1.png', '송하영1.png',
        '이나경1.png', '이나경2.jpg',
        '이채영1.png', '이채영2.jpg'
    ]
    const orderedArray = Array.from({length: 10}, (_, index) => index);
    shuffledArray = shuffleArray(orderedArray);
    console.log(shuffledArray);
    question();
}

function appendPartToFileName(originalFileName) {
    const lastDotIndex = originalFileName.lastIndexOf('.');

    if (lastDotIndex === -1 || lastDotIndex === originalFileName.length - 1) {
        return originalFileName + '부분';
    }

    const fileNameWithoutExtension = originalFileName.substring(0, lastDotIndex); // '박지원1'
    const extension = originalFileName.substring(lastDotIndex); // '.png' (마침표 포함)
    const newFileName = fileNameWithoutExtension + '부분' + extension;

    return newFileName;
}

function question()
{
    const spanElement = document.getElementById('img-screen');
    spanElement.innerHTML = '';
    const imageNum = shuffledArray[questionNum];
    const imagePath = './imgs/'+appendPartToFileName(imageFiles[imageNum]);
    const imageElement = document.createElement('img');

    imageElement.src = imagePath;
    imageElement.style = "max-width: 100%; max-height: 100%";
    spanElement.appendChild(imageElement);
    answer = imagePath

    const problemNumber = document.getElementById('prob');
    problemNumber.textContent = questionNum + 1;
}

async function handleAnswerClick(clickedButton) {
    const selectedText = clickedButton.textContent;
    const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach(button => {
        const text = button.textContent;
        if(answer.includes(text)) {
            button.style.backgroundColor = 'green';
        }
        else {
            button.style.backgroundColor = 'red'
        }
    })
    if(answer.includes(selectedText)){
        score += 1;
        const scoreBoard = document.getElementById('score');
        scoreBoard.textContent = score;
    }

    const spanElement = document.getElementById('img-screen');
    spanElement.innerHTML = '';
    const imageNum = shuffledArray[questionNum];
    const imagePath = './imgs/'+imageFiles[imageNum];
    const imageElement = document.createElement('img');
    imageElement.src = imagePath;
    imageElement.style = "max-width: 100%; max-height: 100%";
    spanElement.appendChild(imageElement);

    if (questionNum < 9)
    {
        questionNum += 1;
        setTimeout(() => {
            answerButtons.forEach(button => {
            button.style.backgroundColor = 'initial';
        })
        question();
        }, 2000);
    }
    else {
        setTimeout(() => {
            const resultUrl = `./result.html?score=${score}`;
            window.location.href = resultUrl;
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if(path.includes('result'))
    {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const finalScore = urlParams.get('score');
        const scoreElement = document.getElementById('finalScore');
        scoreElement.textContent = finalScore;

        const messageText = document.getElementById('message');
        if(finalScore < 5)
        {
            messageText.textContent = '프로미스나인 하수예요ㅠㅠ';
        }
        else if(finalScore < 7)
        {
            messageText.textContent = '프로미스나인 중수예요';
        }
        else if(finalScore < 10)
        {
            messageText.textContent = '프로미스나인 고수예요!';
        }
        else
        {
            messageText.textContent = '프로미스나인 덕후예요!!'
        }
    }
})