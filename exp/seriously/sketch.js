var cam;
var slider;
var campix;
var para;
var go = false;
var daltonize;
var tvglitchProp = {
"verticalSync":"0.1",//0,1
"time":"0.2",//0,1
"distortion":"0.13",//0,1
"lineSync":"0.3",//0,1
"scanlines":"0.2",//0,1
"bars":"0.1"//0,1
}
var sliders = [];


function setup(){
  canvas = createCanvas(320,240,WEBGL);
  canvas.id("p5canvas");
  createP("");
  cam = createCapture(VIDEO);
  cam.size(320,240).hide();
  cam.id("p5cam");
  //slider =  createSlider(-1,1,0,0.01);
  //para = createP(slider.value()).id('paragrafo');
  //para.style("width:129px");
  //para.style("text-align:center");
  //slider.id("p5slider");
  var seriously = new Seriously();
  var src = seriously.source("#p5cam");
  var target = seriously.target("#p5canvas");
  var tvglitch = seriously.effect("tvglitch");
  //tvglitch.distortion = tvglitchProp.distortion;
  //tvglitch.verticalSync = 1;
/*
  for (p in tvglitchProp) {
    tvglitch.p = tvglitchProp[p];
    //console.log(p +" " +tvglitchProp[p])
  }
*/
  var tempKeys = Object.keys(tvglitchProp);
  var tempValues = Object.values(tvglitchProp);
  for(var i = 0; i < tempKeys.length; i++){
    sliders[i] = createSlider(0,1,parseFloat(tempValues[i]), 0.01).id(tempKeys[i]);
    tvglitch[tempKeys[i]] = "#"+sliders[i].id();
    createP(tempKeys[i]);
  }

  tvglitch.source = src;
  target.source = tvglitch;



  seriously.go();
}

function draw(){
  /*

  */

}
function camIsReady(){
	go = true;
  print("yo!");
}
