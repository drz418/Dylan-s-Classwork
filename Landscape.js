let level0, level1, level2, t;
let noiseArray = [];
let rain = [];
let xOff = 0.0;


function setup() {
  createCanvas(900, 550);
  t = 0;

  //array for noise values
  for (let r = 0; r < width; r++){
		//noise returns a value between 1 and 0
		noiseArray[r] = noise(xOff) * height/2;
		xOff = xOff + 0.005;
    }

  //poplulate rain array
    for (let i=0; i< 300; i++) {
      rain[i] = new Rain;
      }
  // defining variables
  level0 = new Frame ();
  level1 = new Frame2();
  level2 = new Frame3();

}

function draw() {
  background(200);

  let r = 255 * noise(t+9);
  let g = 255 * noise(t+22);
  let b = 255 * noise(t+13);
  //background lightens with mouse position

  fill(255, 235, 87);
  rect(0, 0, width+1, height+1)

  fill(220, 100 , 100,pmouseY);
  rect(0, 0, width+1, height+1)

  //drawing rain
  for (let i=0; i< 300; i++) {

  rain[i].show();
  rain[i].drops();
     }

  // stalactites shape
  fill(230, 200);
	beginShape();
    vertex (0, 0);
	for (let r = 0; r < noiseArray.length;r++){
		vertex(r,noiseArray[r]+height*.02);
	}
    vertex (width, 0);
	endShape();

  // water
    rect (0, height/3*2, width);
  //reflections on the water
    noStroke();
    fill(255,80);
    rect(random(width), random(height/3*2, height), random(10,48), random(4,6));

  //kite
    fill(r,g,b);
    noStroke();
    if (mouseX+1 > pmouseX) {
      quad(mouseX-45, mouseY+10, mouseX, mouseY, mouseX-10, mouseY+45, mouseX-55, mouseY+55); //kite tilting right
      noFill();
      stroke(r,g,b);
      bezier (mouseX-55, mouseY+55, mouseX-115, mouseY+65, mouseX-55, mouseY+125, mouseX-115, mouseY+135)
    }
    else {
      quad (mouseX+45, mouseY+10, mouseX, mouseY, mouseX+10, mouseY+45, mouseX+55, mouseY+55) // kite tilting left
      noFill();
      stroke(r,g,b);
      bezier(mouseX+54, mouseY+54, mouseX+125, mouseY+65, mouseX+55, mouseY+125, mouseX+125, mouseY+135);
    }

//foreground hills
  if (mouseIsPressed) {
    c=255; c2= 255; c3= 255; c4 = 255;
    }
  else {
    c = 0; c2 = 100; c3 = pmouseY; c4 = 255;
  }
  noStroke();
  fill (c, c2, c3, c4)
  beginShape();
    vertex (0, height);
	for (let r = 0; r < noiseArray.length;r++){
		vertex(r*3,noiseArray[r]*1.5+height*.37);
	}
    vertex (width, height);
	endShape();
    noiseArray = shiftArray(noiseArray,noise(xOff) * height/2);
	xOff = xOff + 0.005;

  //drawing foreground frames
    level2.show();
    level1.show()
    level0.show();
    level0.click();
    level1.click();
    level2.click();

  t = t + 0.01; // controls the noise severity in the kite color
}

function Rain () {
  // drops are spread randomly throughout x/y axis
  this.x = random(0, width);
  this.y = random (0, height)
  //shows the rain
  this.show = function () {
    noStroke();
    fill (180, random(40, 100)); // rain transparency is varied
    ellipse (this.x, this.y, 2, 12)
    }
  // makes the rain fall and resets each instance once they exceed the height
  this.drops = function () {
    this.y+= 7;

    if (this.y> height) {
      this.y = 0;
    }
  }
}

  class Frame {
  constructor () {

    this.leftMax = 40;
    this.leftMin = 10;
    this.rightMin = width-40;
    this.rightMax = width-20;
    this.topMin = 10;
    this.topMax =30;
    this.bottomMin = height-40;
    this.bottomMax= height-20;

    this.color1 = color (3, 13, 56) // navy // color variable has to be scoped correctly
    this.shadow = color (50, 30)
  }

    click () {
       if (mouseIsPressed) {
      this.color1 = color (0)
      }
      else {
        this.color1 = color (3, 13, 56)
      }
    }

  show () {
      let xL = map(mouseX, 0, width, this.leftMin, this.leftMax);   // left box map
      let xR = map(mouseX, 0, width, this.rightMin, this.rightMax);   // right box map
      let yT = map(mouseY, 0, height, this.topMin, this.topMax); // top box map
      let yB = map(mouseY, 0, height, this.bottomMin, this.bottomMax); // bottom box map

      fill (this.shadow);
      rect (0,0,xL*1.2,height);   // left box shadow
      //rect (xR, 0, width, height);   // right box
      rect (0+xL*1.2, 0, width, yT*1.3); // top box shadow
      //rect (0, yB, width, height); // bottom box

      noStroke ();
      fill (this.color1);

      rect (0,0,xL,height)   // left box
      rect (xR, 0, width, height)   // right box
      rect (0, 0, width, yT) // top box
      rect (0, yB, width, height) // bottom box
    }
 }

class Frame2 extends Frame {
  constructor () {
    super();
    this.leftMax = 60;
    this.rightMin = width-60;
    this.topMax =60;
    this.bottomMin = height-60;

    this.color1 = color (3, 81, 87) //bluegreen
  }

    click () {
       if (mouseIsPressed) {
      this.color1 = color (255)
      }
      else {
        this.color1 = color (3, 81, 87)
      }
    }
  }
class Frame3 extends Frame {
  constructor () {
    super();
    this.leftMax = 80;
    this.rightMin = width-80;
    this.topMax =80;
    this.bottomMin = height-80;

    this.color1 = color (61, 110, 103) //seafoam
    this.shadow = color (50, 0)
    }
  click () {
       if (mouseIsPressed) {
      this.color1 = color (0)
      }
      else {
        this.color1 = color (61, 110, 103)
      }
  }
}

  function shiftArray(myArray,myValue){
	myArray.shift();//shift removes the first position in the array
	myArray.push(myValue); //push adds an element to an array

	return myArray;
}
  
