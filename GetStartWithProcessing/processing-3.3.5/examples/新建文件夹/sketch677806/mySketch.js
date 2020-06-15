var s = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	noFill();
	blendMode(MULTIPLY);
}

function draw() {
	translate(width / 2, height / 2)
	s += 0.7;
	stroke(noise(s/ 200) * 100 + 125, noise(s/ 200, 200) * 100 + 125, noise(s/ 200, 400) * 100 + 125, 50);
	beginShape();
	for(var i = 0; i < 500; i++){
		const v = createVector(noise(s / 200) * 700 - 700, 0);
		v.rotate(TWO_PI / 500 * i);
		v.setMag(v.mag() - noise(v.x / 300, v.y / 300, s / 2000) * 400)
		vertex(v.x, v.y);
	}
	endShape(CLOSE);
}