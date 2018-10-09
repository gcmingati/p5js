var cam;
var vScale = 16;
var particles = [];
var slider;
var noiseScale = 600

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  createP("");
  cam = createCapture(VIDEO);
  cam.size(width/vScale,height/vScale);
  for (var i = 0; i<2500; i++){
  	particles[i] = new Particle(random(width), random(height));
  }
  createP("");
  slider = createSlider(0,255,120);
  background(220);
}

function draw() {
  background(0);
  cam.loadPixels();
  for (var i = 0; i<particles.length; i++){
    particles[i].update();
  	particles[i].show();
  }

}


class Particle {
	constructor(x,y, r=20){
    this.dir = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.pos = createVector(x, y);
    this.speed = 0.9;
    this.r = random(2,8);
/*
    this.x = x;
    this.y = y;
    this.r = random(4,20);
*/
  }

  update(){
    /*
  	this.x += random(-5,5);
    this.y += random(-5,5);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    */
    var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.pos.x = random(width);
			this.pos.y = random(height);
		}
  }

  show(){
  	noStroke();
    var fx = floor(this.pos.x/vScale);
    var fy = floor(this.pos.y/vScale);
    var col = cam.get(fx,fy);
    fill(col[0],col[1],col[2],slider.value());
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}
