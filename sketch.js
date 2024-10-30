let wave_sources = [];

function setup() {
  createCanvas(400, 400);
  background(0);
}


function draw() {
  background(0, 20);

  for (let s of wave_sources){
    if (s.is_gone){
      let index = wave_sources.indexOf(s);
      wave_sources.splice(index, 1);
    }

    s.update();
  }
}

function mouseClicked(){
  let wave_count = 25;
  let source = new Wave_Source(mouseX, mouseY, wave_count);
  wave_sources.push(source);
}