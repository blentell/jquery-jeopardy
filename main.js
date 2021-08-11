const nextRound = document.querySelector(".whatRound");
const prevRound = document.querySelector(".whatRound2");
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
const intro = document.querySelector("#intro");
const logo = document.querySelector("#logo");
const splash = document.querySelector("#splash");
const main = document.querySelector("#mainGame");
const mainIntro = document.querySelector("#mainIntro");
const reset = document.querySelector("#reset");
const reset2 = document.querySelector("#reset2");

// To Do: Add timer to answer that closes the modal when time is up
// To Do: Add reset button -- Done
// To Do: Add local storage -- Done for score, not done for clicked state

logo.addEventListener("click", function () {
	mainIntro.play();
	mainIntro.volume = 0.2;
	window.setTimeout(function () {
		intro.play();
	}, 24000);
	splash.style.opacity = "0%";
	main.style.opacity = "100%";
	window.setTimeout(function () {
		splash.style.visibility = "hidden";
		splash.style.display = "none";
		main.style.visibility = "visible";
	}, 27000);
});

let initialValue = localStorage.getItem("score");
if (initialValue === null) {
	initialValue = 0;
}

let points;
let response;
scored.innerText = initialValue;
let checkAnswerEvent = false;

reset.addEventListener("click", function (event) {
	localStorage.clear();
	initialValue = 0;
	scored.innerText = initialValue;
	for (const answer of answers) {
		answer.style.visibility = "visible";
	}
});

reset2.addEventListener("click", function () {
	localStorage.clear();
	initialValue = 0;
	scored.innerText = initialValue;
	for (const answer of answers) {
		answer.style.visibility = "visible";
	}
});

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
	let randomQuestion = Math.floor(Math.random() * count);
	
	console.log(randomQuestion);
	console.log("Question: ", newArray[randomQuestion].question);
	console.log("Answer: ", newArray[randomQuestion].answer);

	question = newArray[randomQuestion].question;
	response = newArray[randomQuestion].answer;
	modalContent.innerHTML = question;
}

close.addEventListener("click", function (event) {
	// Need an if statement to catch if the check button was clicked
	if (checkAnswerEvent === false) {
		const lessScore = Number(scored.innerText) - Number(points);
		scored.innerText = lessScore;
		scored.innerText = `${lessScore}`;
		localStorage.setItem("score", scored.innerText);
	}
	trebek1.classList.remove("rightAnswer");
	trebek2.classList.remove("rightAnswer");
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
	const newScore = Number(scored.innerText) + points;
	const lessScore = Number(scored.innerText) - points;
	checkAnswerEvent = true;
	
	if (
		// Make sure people dont get penalized for not having a capital in the right place
		input.value.toLowerCase() === response.toLowerCase() ||
		input.value.toUpperCase() === response.toUpperCase()
	) {
		// Add points for getting the question right
		answerContent.innerText = `CORRECT! You won $${points}`;
		score = newScore;
		scored.innerText = newScore;
		localStorage.setItem("score", scored.innerText);
		trebek1.classList.add("rightAnswer");
		trebek2.classList.add("rightAnswer");
		right.play();
	} else {
		// Take away points for getting the question wrong
		answerContent.innerHTML = `Sorry, the correct answer is ${response}. You lost $${points}`;
		score = lessScore;
		scored.innerText = lessScore;
		localStorage.setItem("score", scored.innerText);
		wrong.play();
	}
}

// Add click functionality to the board
for (const answer of answers) {
	// Define a variable to determine if the answer has been checked or not
	let checked = false;
	answer.addEventListener("click", function (event) {
		let columnIndex = answer.classList[1][1];
	// Set answer checked to true, so scoring does not happen twice
		checked = true;
		points = Number(answer.innerHTML);		
		getAnswer(columnIndex);
		openModal(event);
	});
}

// Add a modal open function
function openModal(event) {
	event.currentTarget.style.visibility = "hidden";
	modal.style.visibility = "visible";
	audio.volume = 0.2;
	audio.play();
	checkAnswerEvent = false;
}

// Add a modal close function
function closeModal() {
	modal.style.visibility = "hidden";
	answerContent.style.visibility = "hidden";
	audio.pause();
	audio.currentTime = 0;
	input.value = "";
}
