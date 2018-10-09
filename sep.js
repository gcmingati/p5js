var cam;
var vScale = 8;
var particles = [];
var slider;
var angle;

function setup() {
	createCanvas(320, 240);
	noSmooth();
  pixelDensity(1);
  createP("");
  cam = createCapture(VIDEO);
  cam.size(width/vScale,height/vScale);
  for (var i = 0; i<700; i++){
  	particles[i] = new Particle(random(width), random(height));
  }
  createP("");
  slider = createSlider(0,255,120);
  background(0);
}

function draw() {
  //background(0);
  cam.loadPixels();

  for (let v of particles) {
		//var x = map(sin(angle), -1,1,-0.1,0.1);
		//var gravity = createVector(0, x * v.mass);

    v.separate(particles);
		//v.applyForce(gravity);
    v.update();
    v.show();
    v.borders();

		//angle += 0.1;
  }
}


class Particle {
	constructor(x,y){
    this.position = createVector(x, y);
    this.r = 1;
    this.maxspeed = 2; // Maximum speed
    this.maxforce = 0.8; // Maximum steering force
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.dir = createVector(0, 0);
		this.mass = this.r*0.5;

/*
    this.x = x;
    this.y = y;
    this.r = random(4,20);
*/
  }

  nn(){
    /*
  	this.x += random(-5,5);
    this.y += random(-5,5);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    */
    var angle = noise(this.position.x/noiseScale, this.position.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.velocity = this.dir.copy();
		this.velocity.mult(this.speed);
		this.position.add(this.velocity);
		}


  applyForce(force) {
		var f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
  }

  // Separation
// Method checks for nearby vehicles and steers away
separate(vehicles) {
  let desiredseparation = this.r * 2;
  let sum = createVector();
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < vehicles.length; i++) {
    let d = p5.Vector.dist(this.position, vehicles[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, vehicles[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      sum.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    sum.div(count);
    // Our desired vector is the average scaled to maximum speed
    sum.normalize();
    //sum.mult(this.maxspeed);
    // Implement Reynolds: Steering = Desired - Velocity
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
}

update() {
/*
  var angle = noise(this.position.x/noiseScale, this.position.y/noiseScale)*TWO_PI*noiseScale;
  this.dir.x = cos(angle);
  this.dir.y = sin(angle);
  this.velocity = this.dir.copy();
*/
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}


  show(){
  	noStroke();
    var fx = floor(this.position.x/vScale);
    var fy = floor(this.position.y/vScale);
    var col = cam.get(fx,fy);
    var r = col[0];
    var g = col[1];
    var b = col[2];
    var a = 255;
    fill(col[0],col[1],col[2],slider.value());
    //fill(0);
    var bright = (r+g+b)/3;
    this.r = map(bright, 0, 255, 0, vScale);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    pop();

  }

  borders() {

    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;

  }
}
