let a; //а и б здесь вообще не нужны, но они есть :)
let b;
let r; //переменная угла поворота

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(80, 80, 255);
	a=width/2;
	b=height/2;
	r=0;
	frameRate(60); //увеличиваем частоту кадров для более плавного вращения
}

function draw() {
background(100, 100, 255, 40); //рисуем полупрозрачный фон для эффекта стирания фигур
	translate(a,b);
	push();
		rotate(radians(r/3));
	  noStroke();
		fill(255, 150, 50);
		circle(100, 0, 50);
	pop();
	push();
		rotate(radians(r/6));
		fill(255, 255, 50);
	  noStroke();
		circle(200, 0, 30);
	pop();
	push();
		rotate(radians(r/9));
		noStroke();
		fill(100, 255, 100);
		triangle(300, 20, 300, -20, 350, 0);
	pop();
	push();
		rotate(radians(r/12));
		rectMode(CENTER);
		noStroke();
		fill(255, 255, 100);
		rect(400, 0, 70, 70, 20);
		fill(255, 150, 150);
		circle(250, 0, 15);
	pop();
		stroke(255);
		strokeWeight(5);
		noFill();
		circle(0, 0, 450); //рисуем контур вокруг
	if (mouseIsPressed) {
		r=r; //нажание мыши останавливает вращение
	}
	else {
	r=r+25; //меняем угол поворота - вращение при ненажатой мыши
	}
}