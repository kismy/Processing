var t = 0;

var blossom = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
}

function draw(){
	t += 5;
	clear();
	tree(width/2, height, 0, 200);
	for(var i = 0; i < blossom.length; i++){
		const  b = blossom[i];
		noStroke();
		fill(245, 100, 255, 100)
		ellipse(b.x, b.y, 5, 5);
		b.y += noise(b.x / 20, b.y / 20, i / 20) * 5;
		b.x += (noise(b.x / 20, b.y / 20, i / 20) - 0.5 + (sin(t / 200) / 20)) * 15;
		if(b.y > height){
			blossom.splice(i, 1);
			i--;
		}
		if(mouseIsPressed){
			const v = createVector(mouseX - b.x, mouseY - b.y);
			if(v.mag() < 50){
				v.setMag(v.mag() - 50);
				b.x += v.x / 2;
				b.y += v.y / 5;
			}
		}
	}
	stroke(0);
}

function tree(x, y, a, len){
	const v = createVector(0, -len);
	v.rotate(a);
	strokeWeight(len / 20);
	beginShape();
	vertex(x, y);
	x += v.x;
	y += v.y;
	vertex(x, y);
	endShape();
	len /= 1.7;
	if(len > 2){
		tree(x, y, a+noise(len / 500, t / 1000) + sin(t / 200) / 4, len);
		tree(x, y, a-noise(len / 500, t / 1052.1) + sin(t / 200) / 4, len);
	} else{
		noStroke();
		fill(245, 100, 255, 100)
		ellipse(x, y, 5, 5)
		stroke(0);
		if(random() < 0.02){
			blossom.push({x:x, y:y,})
		}
	}
	return;
}