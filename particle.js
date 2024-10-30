class Wave {
  constructor(x, y, rotation){
    this.bounces = [];
    this.bounces.push(createVector(x, y));
    this.pos = createVector(x, y);
    
    let v = createVector(0, 2);
    v.rotate(rotation);
    this.vel = v;

    this.life = 1;
  }

  move(){
    this.pos.add(this.vel);
  }

  bounce(){
    let bounced = false;
    if (this.pos.x < 0){
      this.pos.x = 0;
      this.vel.x *= -1;
      bounced = true;
    }
    if (this.pos.x > width){
      this.pos.x = width;
      this.vel.x *= -1;
      bounced = true;
    }
    if (this.pos.y < 0){
      this.pos.y = 0;
      this.vel.y *= -1;
      bounced = true;
    }
    if (this.pos.y > height){
      this.pos.y = height;
      this.vel.y *= -1;
      bounced = true;
    }

    if (bounced){
      this.bounces.push(this.pos.copy());
    }
  }

  update(){
    let ini, dest;
    if (this.bounces.length >= 2){
      ini = this.bounces[0];
      dest = this.bounces[1];
    }
    else{
      ini = this.bounces[0];
      dest = this.pos;
    }

    let move_origin = 0;
    if(this.life < 0.8){
      move_origin = 5;
    }
    let diff = p5.Vector.sub(dest, ini).normalize().mult(move_origin);
    ini.add(diff);
  }

  draw(){
    let bounce_count = this.bounces.length;
    if (bounce_count >= 2){
      for (let i=0; i<bounce_count-1; i++){
        stroke(255);
        line(this.bounces[i].x, this.bounces[i].y,
             this.bounces[i+1].x, this.bounces[i+1].y);
      }
    }
    line(this.bounces[bounce_count-1].x, this.bounces[bounce_count-1].y,
      this.pos.x, this.pos.y);
    // this.bounces.shift();
  }
}

class Wave_Source{
  constructor(x, y, wave_count){
    this.waves = [];
    let delta_angle = TWO_PI / wave_count;

    for (let i=0; i<wave_count; i++){
      let rotation = delta_angle * i;
      let wave = new Wave(x, y, rotation);
      this.waves.push(wave);
    }

    this.life = 1
    this.life_decay = 0.004;
    this.is_gone = false;
  }

  update(){
    for (let w of this.waves){
      w.move();
      w.bounce();
      w.update();
      w.draw();
      w.life = this.life;
    }
    this.life -= this.life_decay;
    
    if(this.life <= 0){
      this.is_gone = true;
    }
  }
}