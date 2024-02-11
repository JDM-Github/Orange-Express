
const head          = document.getElementById("snake-head");
const food          = document.getElementById("snake-food");
const canvas        = document.getElementById("game-canvas");
const tailContainer = document.getElementById("tailContainer");
const scoreText     = document.getElementById("score");
const speedText     = document.getElementById("speed");
const gameOverCanv  = document.getElementById("game-over");


let moveFirst     = 3;
let score         = -1;
let xPos          = 5;
let yPos          = 5;
let foodXPos      = 0;
let foodYPos      = 0;
let oldXPos       = 0;
let oldYPos       = 0;
let lastTime      = 0;
let elapseTime    = 0;
let maxSpeed      = 5;
let speedDuration = 0;
let rotationHead  = 270;

let createNextF   = false;
let isGameOverNow = false;
let isAlreadyMove = false;

let lastMoveArray = [0, 0];
let moveArray     = [0, 0];

let allSnakePos       = [];
let allSnakePosition  = [];
let gameSnakePositiom = [];

document.addEventListener("keydown", function(event) {
	console.log(event.keyCode);
	if (true) {
		if (event.keyCode === 187) { maxSpeed -= 1; speedDuration = maxSpeed / 25; speedText.textContent = `SPEED: ${21 - maxSpeed}`; }
		if (event.keyCode === 189) { maxSpeed += 1; speedDuration = maxSpeed / 25; speedText.textContent = `SPEED: ${21 - maxSpeed}`; }
	}
	if (!isAlreadyMove) return;
	if (event.keyCode === 87) {
		if (moveArray[1] == 0) { lastMoveArray = moveArray; moveArray = [0, -1]; isAlreadyMove = false; }
	} else if (event.keyCode === 83) {
		if (moveArray[1] == 0) { lastMoveArray = moveArray; moveArray = [0,  1]; isAlreadyMove = false; }
	} else if (event.keyCode === 65) {
		if (moveArray[0] == 0) { lastMoveArray = moveArray; moveArray = [-1, 0]; isAlreadyMove = false; }
	} else if (event.keyCode === 68) {
		if (moveArray[0] == 0) { lastMoveArray = moveArray; moveArray = [1,  0]; isAlreadyMove = false; }
	}
});
function gameOver() {
	score         = -1;
	isGameOverNow = true;
	xPos          = 5;
	yPos          = 5;
	oldXPos       = 0;
	oldYPos       = 0;
	lastTime      = 0;
	elapseTime    = 0;
	rotationHead  = 270;
	isAlreadyMove = false;
	gameOverCanv.style.display = "inline-block";
}
function restart() {
	gameOverCanv.style.display = "none";
	isGameOverNow = false;
	moveArray     = [0, 0];
	main();
	gameLoop(0);
}
function createAllFoodLocation() {
	for (let r = 0; r < 20; r++)
		for (let c = 0; c < 20; c++) 
			allSnakePosition.push([r, c]);

}
function getRandomElementFromArray(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}
function removePositionFromArray(array, x, y) {
	for (let i = 0; i < array.length; i++) {
		const position = array[i];
		if (position[0] === x && position[1] === y) {
			array.splice(i, 1);
			return;
		}
	}
}
function createFood() {
	score++;
	gameSnakePositiom = allSnakePosition;
	tailContainer.childNodes.forEach(e => {
		const x = parseInt(e.getAttribute('xPos'));
		const y = parseInt(e.getAttribute('yPos'));
		removePositionFromArray(gameSnakePositiom, x, y);
	});
	const position = getRandomElementFromArray(gameSnakePositiom);
	food.style.top  = `${position[1] * 25}px`;
	food.style.left = `${position[0] * 25}px`;
	foodXPos = position[0];
	foodYPos = position[1];

	scoreText.textContent = `SCORE: ${score}`;
}
function moveTails() {
	let newx = oldXPos;
	let newy = oldYPos;
	tailContainer.childNodes.forEach(e => {
		oldx = parseInt(e.getAttribute("xPos"));
		oldy = parseInt(e.getAttribute("yPos"));
		e.style.top  = `${newy * 25}px`;
		e.style.left = `${newx * 25}px`;
		e.setAttribute("xPos", newx);
		e.setAttribute("yPos", newy);

		if (moveFirst <= 0 && newx === xPos && newy === yPos) 
			isGameOverNow = true;

		newx = oldx;
		newy = oldy;
	});
}
function createTails(x, y) {
	const tail = document.createElement("div");
	tail.classList.add("tail");

	tail.setAttribute("xPos", x);
	tail.setAttribute("yPos", y);
	tail.style.top  = `${y * 25}px`;
	tail.style.left = `${x * 25}px`;
	tail.style.transition = `${speedDuration}s top, ${speedDuration}s left`;
	tailContainer.appendChild(tail);
}
function gameLoop(timestamp) {
	if (isGameOverNow) { gameOver(); return; }
	const deltaTime = timestamp - lastTime;
	const deltaTimeSeconds = deltaTime / 1000;

	elapseTime -= deltaTimeSeconds * 60;
	if (elapseTime <= 0) {
		if (createNextF) {
			createTails(oldXPos, oldYPos);
			createFood();
			createNextF = false;
		}
		elapseTime = maxSpeed;
		oldXPos = xPos;
		oldYPos = yPos;
		xPos += moveArray[0];
		yPos += moveArray[1];

		if (moveArray[0] === 1 && isAlreadyMove === false) {
			if (lastMoveArray[1] === 1) rotationHead -= 90;
			else if (lastMoveArray[1] === -1) rotationHead += 90;
			head.style.transform = `rotate(${rotationHead}deg)`;
		}
		else if (moveArray[0] === -1 && isAlreadyMove === false) {
			if (lastMoveArray[1] === 1) rotationHead += 90;
			else if (lastMoveArray[1] === -1) rotationHead -= 90;
			head.style.transform = `rotate(${rotationHead}deg)`;
		}
		else if (moveArray[1] === 1 && isAlreadyMove === false) {
			if (lastMoveArray[0] === 1) rotationHead += 90;
			else if (lastMoveArray[0] === -1) rotationHead -= 90;
			head.style.transform = `rotate(${rotationHead}deg)`;
		}
		else if (moveArray[1] === -1 && isAlreadyMove === false) {
			if (lastMoveArray[0] === 1) rotationHead -= 90;
			else if (lastMoveArray[0] === -1) rotationHead += 90;
			head.style.transform = `rotate(${rotationHead}deg)`;
		}
		

		if (xPos < 0 || xPos >= 20) { gameOver(); return; }
		if (yPos < 0 || yPos >= 20) { gameOver(); return; }
		head.style.top  = `${yPos * 25 - 10}px`;
		head.style.left = `${xPos * 25 - 10}px`;
		createNextF = xPos === foodXPos && yPos == foodYPos;

		isAlreadyMove = true;
		if (moveArray[0] !== 0 || moveArray[1] !== 0) {
			moveTails();
			moveFirst--;
		}
	}
	lastTime = timestamp;
	requestAnimationFrame(gameLoop);
}
function main() {
	speedText.textContent = `SPEED: ${21 - maxSpeed}`;
	speedDuration = maxSpeed / 25;
	head.style.transform = `rotate(${rotationHead}deg)`;
	head.style.transition = `${speedDuration}s top, ${speedDuration}s left, ${speedDuration}s transform`;
	while (tailContainer.firstChild)
		tailContainer.removeChild(tailContainer.firstChild);
	for (let i = 1; i < 5; i++) createTails(xPos-i, yPos);
	createFood();
}

createAllFoodLocation();
main();
gameLoop(0);
