function preload()
{
doodleNet = ml5.imageClassifier('DoodleNet');
}
function setup()
{
 var canvas= createCanvas(280, 280);
 canvas.center();
 background("white");
 canvas.mouseReleased(classifyCanvas);
 synth = window.speechSynthesis;
}
function draw()
{
strokeWeight(13);
stroke(0);
if(mouseIsPressed) {
  line(pmouseX, pmouseY, mouseX, mouseY);
}
}

function clearCanvas()
{
  background("white");
}

function classifyCanvas()
{
  doodleNet.classify(canvas, gotResult);
}

function gotResult(error, results)
{
 if(error)
 {
   console.error(error);
 }
 else
 {
  console.log(results);
  var label = results[0].label;
  var confidence = Math.round(results[0].confidence*100);
  document.getElementById("label").innerHTML = "Label: "+label;
  document.getElementById("confidence").innerHTML = "Confidence: "+confidence+"%";
  var utterthis = new SpeechSynthesisUtterance(label);
  synth.speak(utterthis);
 }
}