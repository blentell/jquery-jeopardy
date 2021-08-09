const nextRound = document.querySelector("#footer");
const prevRound = document.querySelector("#footer2");
const gameBoard1 = document.querySelector("#gameBoard1");
const gameBoard2 = document.querySelector("#gameBoard2");
const answers = document.querySelectorAll('.answer');
const trebek1 = document.querySelector('.trebek1');
const trebek2 = document.querySelector('.trebek2');

nextRound.addEventListener("click", function () {
	gameBoard1.style.display = "none";
	gameBoard2.style.display = "flex";
});

prevRound.addEventListener('click', function () {
    gameBoard2.style.display = 'none';
    gameBoard1.style.display = 'flex';
})

trebek1.addEventListener('click', function () {
    const text = `                     RIP
    Alex Trebek 1940 - 2020`;
    confirm(text);
})

trebek2.addEventListener("click", function () {
	const text = `                     RIP
    Alex Trebek 1940 - 2020`;
	confirm(text);
});

async function getAnswer() {
    const rawData = await fetch('jeopardy.json');
    const data = await rawData.json();
    let count = 0;
    for (const question of data) {
        if (question.value = '$100' && question.category === 'HISTORY') {
            let randomQuestion = Math.random() * count;
            count++;
            console.log(count);
        };
    //     if (question.showNumber = 4680 ) {
    //         console.log(question);
    //     };
    }
}
getAnswer();

for (const answer of answers) {
    // console.log('im clicked');
    answer.addEventListener('click', function () {
        console.log(answer.className);
        
    })
}