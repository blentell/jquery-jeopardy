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

let score = 0;


scored.innerText = 0;
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
		if (question.category === "HISTORY" && columnIndex === "1") {
			count++;
			newArray.push(question);
		}
		if (
			question.category === "EVERYBODY TALKS ABOUT IT..." &&
			columnIndex === "2"
		) {
			count++;
			newArray.push(question);
		}
		if (question.category === "3-LETTER WORDS" && columnIndex === "3") {
			count++;
			newArray.push(question);
		}
		if (
			question.category === "ESPN's TOP 10 ALL-TIME ATHLETES" &&
			columnIndex === "4"
		) {
			count++;
			newArray.push(question);
		}
		if (question.category === "EPITAPHS & TRIBUTES" && columnIndex === "5") {
			count++;
			newArray.push(question);
		}
		if (
			question.category === "DR. SEUSS AT THE MULTIPLEX" &&
			columnIndex === "6"
		) {
			count++;
			newArray.push(question);
		}
		if (
			question.category === "PRESIDENTIAL STATES OF BIRTH" &&
			columnIndex === "7"
		) {
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
	const question = newArray[randomQuestion].question;
	const response = newArray[randomQuestion].answer;
	modalContent.innerHTML = question;
	function checkAnswer(event) {
		event.preventDefault();
		answerContent.style.visibility = "visible";
let newScore = score + 100;
let lessScore = score - 100;
		if (input.value === response) {
			answerContent.innerText = "CORRECT! You won $ " + 100;
			// score = newScore;
			scored.innerText = newScore;
		} else {
			answerContent.innerHTML = `Sorry, the correct answer is ${response}. You lost $100`;
			// score = lessScore;
			scored.innerText = lessScore;
		}
	}
	check.addEventListener("click", function (event) {
		checkAnswer(event);
	});

	close.addEventListener("click", function (event) {
		closeModal(event);
	});
}

// Add click functionality to the board
for (const answer of answers) {
	answer.addEventListener("click", function (event) {
		let columnIndex = answer.classList[1][1];
		console.log(columnIndex);
		getAnswer(columnIndex);
		openModal(event);
	});
}

// Add a modal function
function openModal(event) {
	event.currentTarget.style.visibility = "hidden";
	modal.style.visibility = "visible";
	audio.play();
}

function closeModal() {
	modal.style.visibility = "hidden";
	answerContent.style.visibility = "hidden";
	audio.pause();
	audio.currentTime = 0;
	["a"].forEach(function (id) {
		document.getElementById(id).value = "";
	});
}
