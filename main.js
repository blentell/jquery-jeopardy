const nextRound = document.querySelector("#footer");
const prevRound = document.querySelector("#footer2");
const gameBoard1 = document.querySelector("#gameBoard1");
const gameBoard2 = document.querySelector("#gameBoard2");
const answers = document.querySelectorAll(".answer");
const trebek1 = document.querySelector(".trebek1");
const trebek2 = document.querySelector(".trebek2");
const modal = document.querySelector("#myModal");
const modalContent = document.querySelector("#modalContent");
const audio = document.querySelector("#think");
const answerContent = document.querySelector("#answerContent");
const input = document.querySelector("#a");
const check = document.querySelector("#checkAnswer");
const close = document.querySelector("#close-button");
const scored = document.querySelector("#score");
const right = document.querySelector("#right");
const wrong = document.querySelector("#wrong");

let points;
let response;
let score = 0;
scored.innerText = `$ ${0}`;
let checkAnswerEvent = false;

nextRound.addEventListener("click", function () {
	gameBoard1.style.display = "none";
	gameBoard2.style.display = "flex";
});

prevRound.addEventListener("click", function () {
	gameBoard2.style.display = "none";
	gameBoard1.style.display = "flex";
});

trebek1.addEventListener("click", function () {
	const text = `                     RIP
    Alex Trebek 1940 - 2020`;
	confirm(text);
});

trebek2.addEventListener("click", function () {
	const text = `                     RIP
    Alex Trebek 1940 - 2020`;
	confirm(text);
});

let categories = ["HISTORY"];
// Create the function to grab the question
async function getAnswer(columnIndex) {
	const rawData = await fetch("jeopardy.json");
	const data = await rawData.json();
	let count = 0;
	const newArray = [];
	for (const question of data) {
		if (question.category === 2 && columnIndex === "1") {
			count++;
			newArray.push(question);
		}
		if (question.category === 25 && columnIndex === "2") {
			count++;
			newArray.push(question);
		}
		if (question.category === "3-LETTER WORDS" && columnIndex === "3") {
			count++;
			newArray.push(question);
		}
		if (question.category === 1791 && columnIndex === "4") {
			count++;
			newArray.push(question);
		}
		if (question.category === 1812 && columnIndex === "5") {
			count++;
			newArray.push(question);
		}
		if (question.category === "IN THE BOOKSTORE" && columnIndex === "6") {
			count++;
			newArray.push(question);
		}
		if (question.category === "ANIMAL GROUPS" && columnIndex === "7") {
			count++;
			newArray.push(question);
		}
		if (question.category === "AIRLINE TRAVEL" && columnIndex === "8") {
			count++;
			newArray.push(question);
		}
		if (question.category === "THAT OLD-TIME RELIGION" && columnIndex === "9") {
			count++;
			newArray.push(question);
		}
		if (question.category === "MUSICAL TRAINS" && columnIndex === "l") {
			count++;
			newArray.push(question);
		}
	}
	let randomQuestion = Math.ceil(Math.random() * count);
	console.log("Question: ", newArray[randomQuestion].question);
	console.log("Answer: ", newArray[randomQuestion].answer);
	question = newArray[randomQuestion].question;
	response = newArray[randomQuestion].answer;
	modalContent.innerHTML = question;
}

close.addEventListener("click", function (event) {
	// Need an if statement to catch if the check button was clicked
	if (checkAnswerEvent === false) {
		const lessScore = score - points;
		score = lessScore;
		scored.innerText = `$ ${lessScore}`;
	}
	trebek1.classList.remove("rightAnswer");
	closeModal(event);
});

check.addEventListener("click", function (event) {
	checkAnswer(event);
	audio.pause();
	audio.currentTime = 0;
});

function checkAnswer(event) {
	event.preventDefault();
	answerContent.style.visibility = "visible";
	const newScore = score + points;
	const lessScore = score - points;
	checkAnswerEvent = true;
	console.log("I did stuff");
	if ((input.value = response)) {
		answerContent.innerText = `CORRECT! You won $${points}`;
		score = Number(newScore);
		scored.innerText = `$ ${newScore}`;
		trebek1.classList.add("rightAnswer");
		right.play();
	} else {
		answerContent.innerHTML = `Sorry, the correct answer is ${response}. You lost $${points}`;
		score = lessScore;
		scored.innerText = `$ ${lessScore}`;
		wrong.play();
	}
}

// Add click functionality to the board
for (const answer of answers) {
	answer.addEventListener("click", function (event) {
		let columnIndex = answer.classList[1][1];
		points = Number(answer.innerHTML);
		console.log(columnIndex);
		getAnswer(columnIndex);
		openModal(event);
	});
}

// Add a modal function
function openModal(event) {
	event.currentTarget.style.visibility = "hidden";
	modal.style.visibility = "visible";
	audio.volume = 0.2;
	audio.play();
	checkAnswerEvent = false;
}

function closeModal() {
	modal.style.visibility = "hidden";
	answerContent.style.visibility = "hidden";
	audio.pause();
	audio.currentTime = 0;
	document.getElementById(id).value = "";
}
