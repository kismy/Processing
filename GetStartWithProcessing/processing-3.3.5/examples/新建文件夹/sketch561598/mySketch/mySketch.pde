float angle, theta;
float r=random(0, 0.7);
int seed=int(random(10000));
int count;

void setup() {
  //size(500, 500);
  size(640, 360);
  frameRate(30);
}

void draw() {
  background(255);

  translate(0.5*width, height -20); //原点を木の根元の位置に移動
  strokeWeight(0.01*height);
  line(0,0, 0,-0.2*height); //根元から幹を描く
  translate(0, -0.2*height); //幹の上端まで原点移動
  
  float angle = map(mouseY, 0, height, -30, 30);
  theta = radians(angle); //ラジアンに変換
  
  count=10000;
  branch(0.25*height, 0.01*height, seed+count);
  
  //if(frameCount%20==1){save(frameCount +".png");}
}

void branch(float h, float w, int seed) {
  randomSeed(seed);
  h *= random(0.65, 0.8); //枝の長さ
  w *= random(0.65, 0.8); //枝の太さ

  if (3.0<h) { //枝の長さが2以下になるまで再帰
    //左に分かれる枝。角度と線の太さを決めてから、長さhの線を描く
    pushMatrix();
      //translate(0, h*r); //枝の生える位置を指定
      rotate(theta +random(-0.05*PI,0.05*PI) +noise(0.002*frameCount));
      strokeWeight(w);
      line(0, 0, 0, -h);
      translate(0, -h); //原点を枝の末端に移動させる
      
      count++;
      branch(h, w, seed+int(random(count))); //次の枝を描く
    popMatrix();
    
    //右に分かれる枝
    pushMatrix();
      rotate(-theta -random(-0.05*PI,0.05*PI) -noise(0.002*frameCount));
      strokeWeight(w);
      line(0, 0, 0, -h);
      translate(0, -h);
      
      count++;
      branch(h, w, seed+count); //次の枝を描く
    popMatrix();
  }
}

void mouseClicked() {
  seed=int(random(10000));
  r=random(0.7);
}