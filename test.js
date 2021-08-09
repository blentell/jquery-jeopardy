const fs = require("fs");

const rawData = fs.readFileSync("jeopardy.json");
let data = JSON.parse(rawData);
let count = 0;
const newArray = [];


for (const question of data) {
    if ((question.value === "$100" && question.category === "HISTORY")) {
        count++;
        console.log(question);
        newArray.push(question);
        
        
    }
}
let randomQuestion = Math.ceil(Math.random() * count);
    
    console.log("random number: ", randomQuestion);
    console.log(count);
    console.log(newArray);
    console.log("Question: ", newArray[randomQuestion].question);
    
console.log("Answer: ", newArray[randomQuestion].answer);
