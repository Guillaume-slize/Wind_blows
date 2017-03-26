// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var Mover = function(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };
    
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function(temp) {
    stroke(0,255,0);
    strokeWeight(2);
    noStroke(); 
    fill(218,map(temp,-10,20,0,255), 55, 127);
    ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
  };

  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -0.8;
    } else if (this.position.x < 0) {
      this.velocity.x *= -0.8;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -0.8;
      this.position.y = height;
    } else if (this.position.y < 0) {
     this.velocity.y *= -0.8;
      this.position.y = 0; 
    }
  };

};
  




