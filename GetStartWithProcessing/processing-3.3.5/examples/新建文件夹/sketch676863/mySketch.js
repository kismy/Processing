var t = 0;
const scl = 6;

function setup() {
	createCanvas(500, 500);
	fill(0);
	stroke(255);
	rect(0, 0, width, height);
}

function draw() {
	t += 0.2;
	//clear();
	fill(0, 60);
	rect(0, 0, width, height);
	for(var x = 0; x < width / scl; x++){
		for(var y = 0; y < height / scl; y++){
			point((x * scl) + sin(t / 11.1 + sin((y + x) / 10)) * noise(x / scl, y / scl, mouseX / 300) * 200, 
					 (y * scl) + sin(t / 10 + sin((y + x) / 10)) * noise(x / scl, y / scl, mouseX / 300) * 200)
		}
	}
}