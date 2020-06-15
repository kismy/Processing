var EPSILON = 0.0000001;

var particleSize = 3;

function Particle() {
	this.pos = createVector(random(0, width), random(0, height));
	this.vel = createVector(random(-5, 5), random(-5, 5));
	this.color = random([color(128, 0, 0), color(128, 128, 0), color(0, 128, 0), color(0, 128, 128), color(0, 0, 128), color(128, 0, 128)]);
	
	this.display = function() {
		ellipse(this.pos.x, this.pos.y, particleSize, particleSize);
	}
	
	this.update = function() {
		// move particle based on velocity and correct for wall collisions
		var time = 1;
		var timeX = time;
		var timeY = time;
		
		while(time > EPSILON) {
			var collisionX = false;
			var collisionY = false;
			
			var newPosX = this.pos.x + this.vel.x * time;
			var newPosY = this.pos.y + this.vel.y * time;
			var newTime = time;
			
			// check wall collisions X and Y
			if(newPosX <= 0) {
				timeX = this.pos.x / (this.pos.x - newPosX) * time;
				collisionX = true;
			} else if(newPosX >= width) {
				timeX = (width - this.pos.x) / (newPosX - this.pos.x) * time;
				collisionX = true;
			}
			
			if(newPosY <= 0) {
				timeY = this.pos.y / (this.pos.y - newPosY) * time;
				collisionY = true;
			} else if(newPosY >= height) {
				timeY = (height - this.pos.y) / (newPosY - this.pos.y) * time;
				collisionY = true;
			}
			
			// resolve collisions
			if((collisionX === true) || (collisionY === true)) {
				
				// take the nearest time
				if(timeX < timeY) {
					newTime = timeX;
				} else {
					newTime = timeY;
				}
				
				// move the particle
				this.pos.x += this.vel.x * newTime;
				this.pos.y += this.vel.y * newTime;

				// flip velocity vectors to reflect off walls
				if((collisionX === true) && (collisionY === false)) {
					this.vel.x *= -1;
				} else if((collisionX === false) && (collisionY === true)) {
					this.vel.y *= -1;
				} else {	// they must both be colliding for this condition to occur
					if(timeX < timeY) {
						this.vel.x *= -1;
					} else if(timeX > timeY) {
						this.vel.y *= -1;
					} else {	// they must be colliding at the same time (ie. a corner)
						this.vel.x *= -1;
						this.vel.y *= -1;
					}
				}
				
				// decrease time and iterate
				time -= newTime;
				
			} else {
				// no collision
				this.pos.x = newPosX;
				this.pos.y = newPosY;
				time = 0;
			}
		}	
	}
}