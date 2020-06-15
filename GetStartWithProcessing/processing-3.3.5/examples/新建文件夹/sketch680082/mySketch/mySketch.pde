float r;
float factor = 0;
void setup(){
	size(650,650);
	r = width/2-5;
}

PVector getVector(int index, int total) {
	float angle = map(index % total, 0, total, 0, TWO_PI);
	PVector v = PVector.fromAngle(angle+PI);
	v.mult(r);
	return v;
	
}

void draw(){
	background(0);
	factor+=0.01;
	int total = int(map(mouseX,0,width,0,200));
	
	//float delta = TWO_PI / total;
	float r = width / 2;
	
	translate(width/2, height/2);
	stroke(255);
	noFill();
	ellipse(0,0,r*2-10,r*2-10);
	
	for (int i = 0; i < total; i++){
		PVector v = getVector(i,total);
		fill(255);
		ellipse(v.x,v.y,5,5);
	}
	
	for (int i = 0; i < total; i ++){
		PVector a = getVector(i,total);
		PVector b = getVector((int)(i * factor),total);
		line(a.x,a.y,b.x,b.y);
	}
	
}