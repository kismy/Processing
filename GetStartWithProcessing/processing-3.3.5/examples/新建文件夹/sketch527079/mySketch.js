// Justin Chambers
// 03/2018

var particles = [];
var numParticles;
var particleDensity = 6000;

var lineProximityDistance = 100;

var recommendedMaxWidth = 1600;
var recommendedMaxHeight = 900;

function setup() {
	createCanvas(min(windowWidth, recommendedMaxWidth), min(windowHeight, recommendedMaxHeight));
	numParticles = width * height / particleDensity;
	for(var i = 0; i < numParticles; ++i) {
		particles[i] = new Particle();
	}
}

function draw() {
	blendMode(BLEND);
	background(51);	// same color as the top bar on openprocessing.org
	smooth();
	noStroke();
	fill(0);

	for(var i = 0; i < numParticles; ++i) {
		particles[i].update();
		particles[i].display();
	}
	
	blendMode(ADD);
	strokeWeight(3);
	// duplicate lines are being drawn from I to J and then from J to I, this is inefficient, but increases color variety due to additive blending
	for(var i = 0; i < numParticles; ++i) {
		for(var j = 0; j < numParticles; ++j) {
			if(i === j) {
				continue;
			}
			var distX = abs(particles[i].pos.x - particles[j].pos.x);
			var distY = abs(particles[i].pos.y - particles[j].pos.y);
			if(distX < lineProximityDistance && distY < lineProximityDistance) {
				var c = color(red(particles[i].color),
											green(particles[i].color),
											blue(particles[i].color),
											255 * min(1, (lineProximityDistance - max(distX, distY)) / (lineProximityDistance * 0.3)));
				stroke(c);
				line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
			}
		}
	}
}