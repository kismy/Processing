/* @pjs pauseOnBlur=true; */
float omega=0.05;// vitesse angulaire (en radian/frame)
int time;
int periode=round(TWO_PI/omega);
boolean playing = true;
float R,r,d;

void setup() {
  size(400, 400);
  frameRate(20);
  smooth();
  time=0;
	R=50;
	r=30;
	d=0;
}
void draw() {
	d+=1/log(d+2);
	d=d%100;
	omega=0.05;
	periode=round(3*TWO_PI/omega);
		trace_osculateur();
		trace_trajectoire();
		trace_rayons();
		//trace_developpee(identifiant);
		time+=1;
	fill(0);
}

//tracé de M(t) avec le cercle osculateur
void trace_osculateur() {
  background(255);
  float v_square=sq(dotposX(time))+sq(dotposY(time));
  float P=ddotposX(time)*dotposY(time)-ddotposY(time)*dotposX(time);
  float pX=posX(time);
  float pY=posY(time);
  float posXC=pX+dotposY(time)*v_square/P;
  float posYC=pY-dotposX(time)*v_square/P;
  int diametre=2*int(sqrt(sq(pX-posXC)+sq(pY-posYC)));
  float posXT=pX+30*dotposX(time)/sqrt(v_square);
  float posYT=pY+30*dotposY(time)/sqrt(v_square);  
  float posXN=pX-30*dotposY(time)/sqrt(v_square);
  float posYN=pY+30*dotposX(time)/sqrt(v_square); 
  pushMatrix();
  translate(width/2, height/2);
  noFill(); 
  stroke(150, 160, 170);
  ellipse(posXC, posYC, diametre, diametre);
  line(pX, pY, posXC, posYC);
  stroke(250, 0, 0);
  arrow(pX, pY, posXT, posYT, "");
  arrow(pX, pY, posXN, posYN, "");
  noStroke();
  fill(0);
  ellipse(pX, pY, 5, 5);
  fill(150, 0, 0);
  ellipse(posXC, posYC, 5, 5);
  popMatrix();
}
void trace_developpee() {
  pushMatrix();
  translate(width/2, height/2);
  noFill();
  stroke(150, 0, 0);
  beginShape();
  for (int i=1; i<=periode; i+=1) {
    float v_square=sq(dotposX(i))+sq(dotposY(i));
    float P=ddotposX(i)*dotposY(i)-ddotposY(i)*dotposX(i);
    float pX=posX(i);
    float pY=posY(i);
    float posXC=pX+dotposY(i)*v_square/P;
    float posYC=pY-dotposX(i)*v_square/P;
    vertex(posXC, posYC);
  }
  endShape(CLOSE);
  popMatrix();
}
void trace_rayons() {
  pushMatrix();
  translate(width/2, height/2);
  stroke(150, 0, 0, 40);
  for (int i=1; i<=periode; i++) {
    float v_square=sq(dotposX(i))+sq(dotposY(i));
    float P=ddotposX(i)*dotposY(i)-ddotposY(i)*dotposX(i);
    float pX=posX(i);
    float pY=posY(i);
    float posXC=pX+10*dotposY(i)*v_square/P;
    float posYC=pY-10*dotposX(i)*v_square/P;
    line(pX, pY, posXC, posYC);
  }
  endShape(CLOSE);
  popMatrix();
}
void trace_trajectoire() {
  pushMatrix();
  translate(width/2, height/2);
  noFill();
  stroke(10);
  beginShape();
  for (int i=1; i<periode; i+=2) {
    float pX=posX(i);
    float pY=posY(i);
    vertex(pX, pY);
  }
  endShape(CLOSE);
  popMatrix();
}
float posX(int temps) {
  return (R-r)*cos(omega*temps)+d*cos((R/r-1)*omega*temps);
}
float posY(int temps) {
	return (R-r)*sin(omega*temps)-d*sin((R/r-1)*omega*temps);
}
float dotposX(int temps) {
  return (R-r)*omega*(-sin(omega*temps)-(d/r)*sin((R/r-1)*omega*temps));
}
float dotposY(int temps) {
	return (R-r)*omega*(cos(omega*temps)-(d/r)*cos((R/r-1)*omega*temps));
}
float ddotposX(int temps) {
	return (R-r)*sq(omega)*(-cos(omega*temps)-(d*(R-r)/sq(r))*cos((R/r-1)*omega*temps));
}
float ddotposY(int temps) {
	return (R-r)*sq(omega)*(-sin(omega*temps)+((R-r)*d/sq(r))*sin((R/r-1)*omega*temps));
}
void arrow(float x1, float y1, float x2, float y2, String nom) {
  fill(0, 0, 150);
  stroke(0, 0, 250);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  pushMatrix();
  translate(x2, y2);
  rotate(atan2(y2-y1, x2-x1));
  triangle(0, 0, -5, 2, -5, -2);
  text(nom, 10, 0);
  popMatrix();
  strokeWeight(1);
} 
void play() {
  playing = true;
  loop();
} 
void pause() {
  playing = false;
  fill(127, 127, 127, 127);
  noStroke();
  rect(0, 0, width, height);
  fill(255);
  String pausetext = "Click to play/pause";
  textSize(32);
  float twidth = textWidth(pausetext);
  text(pausetext, (width-twidth)/2, height/2);
  textSize(10);
  noLoop();
}
void mouseClicked() {
  if (!playing) { 
    play();
  } else { 
    pause();
  }
}