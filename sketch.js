// Instrument
var osc;
var yVals = [];

var ratio = 4
var start = false;

var notes = [38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60,
  62, 64, 65, 67, 69
];

var delay;

/*weather*/
var data;
var weather;
var current = 0
var time = 0

var movers = [];

function preload() {
  var url = 'weather.json';
  data = loadJSON(url);
}

function setup() {
  createCanvas(600, 600);

  for (var i = 0; i < data.forecast.length; i++) {
    var item = data.forecast[i]
    var fromDate = new Date(item.timeFrom)
    var toDate = new Date(item.timeTo)


    var from = fromDate.getDate() + '/' + (fromDate.getMonth() + 1) + ' - ' + fromDate.getFullYear()
    from += ' ' + fromDate.getHours() + ':0' + fromDate.getMinutes()

    var to = toDate.getDate() + '/' + (toDate.getMonth() + 1) + ' - ' + toDate.getFullYear()
    to += ' ' + toDate.getHours() + ':0' + toDate.getMinutes()

    data.forecast[i].time = from + ' - ' + to
  }
  
  for (var i = 0; i < 20; i++) {
    movers[i] = new Mover(random(1, 5), width / 2, height / 2);
  }

  
   /*instrument*/
  delay = new p5.Delay();
  osc = new p5.Oscillator(); //Setup the sound Oscillator
  osc.setType('triangle'); //Other waveforms include 'saw', 'square', sine
  osc.freq(240);
  osc.amp(0.0);
  osc.start();

  delay.process(osc, 1 / (60 / 5), .3, 2300);
  delay.setType(1);
  reverb = new p5.Reverb();
  reverb.process(osc, 3, 2);
  
  /*sound*/
  /*perc = loadSound('assets/lucky_dragons_-_power_melody.mp3');*/


}





function draw() {
  background(0);

  fill(255)

  var x = width / 2
  var y = height / 2

  var temp = data.forecast[current].temperature.value
  var deg = data.forecast[current].windDirection.deg
  var speed = data.forecast[current].windSpeed.mps * 20

  noStroke()

 /* text(data.forecast[current].time, 100, 100)
  text(deg, 100, 130)
  stroke(255);*/
  var endX = Math.cos(deg * Math.PI / 180) * (speed)
  var endY = Math.sin(deg * Math.PI / 180) * (speed)
  
  noStroke()
  push()
  translate(x,y)
  rotate(deg * (Math.PI / 180))
  triangle(0, -10, 0, 10, speed, 0);
  pop()
  fill('white')
  ellipse(x, y, 20, 20)
  
  

  if (millis() - time > 200) {
    time = millis()
    if (current < data.forecast.length - 1) {
      current++
    } else {
      current = 0
    }
  }

  for (var i = 0; i < movers.length; i++) {
    var wind = createVector(Math.cos(deg * Math.PI / 180) * 0.05, Math.sin(deg * Math.PI / 180) * 0.05);
    var gravity = createVector(0, 0); //Zero gravity
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display(temp);
    movers[i].checkEdges();
  }
 
     /*instrument*/
    var freq = midiToFreq(notes[round(map(deg,0,360,0,notes.length))]+0.3*random(-mouseX/width,mouseX/width));
    osc.freq(freq);
   osc.amp(map((speed),0,5,0,notes.length));
}