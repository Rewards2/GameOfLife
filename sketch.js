alert(`Numbers & Up/Down Arrow keys to change the speed.\nSpacebar to pause the simulation.`);

let size = prompt("Enter a whole number for size of grid.", 10);
if (isNaN(Number.parseInt(size)) && size > 0) size = 10;

let rand = prompt("Enter a number between 0 - 1 for initial randomness percentage.", 0.2);
if (isNaN(Number.parseInt(rand))) rand = Math.random();

let grid = [];
let paused = 0;
let speed = 10;
let k = 400;

function setup() {
  createCanvas(k, k);
  let w = k / size, h = k / size;
  
  for (let x = 0; x < size; x++) {
    grid.push([]);
    for (let y = 0; y < size; y++) {
      let r = Math.random() < rand ? 1 : 0;
      grid[x].push(new Cell(x * w, y * w, w, r));
    }
  }
  frameRate(speed);
}

function draw() {
  background(220);
  grid.forEach(x => x.forEach(y => y.show()));
  if (!paused) step();
}

function step() {
  let w = grid.length;
  let h = grid[0].length;
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let count = 0;
      for (let x1 = -1; x1 < 2; x1++) {
        for (let y1 = -1; y1 < 2; y1++) {
          if (x1 + x < 0 || x1 + x >= w) continue;
          if (y1 + y < 0 || y1 + y >= w) continue;
          if (y1 == 0 && x1 == 0) continue;
          count += grid[x1 + x][y1 + y].on;
        }
      }
      if (grid[x][y].on) {
        grid[x][y].c = 0;
        if (count > 1 && count < 4) {
          grid[x][y].c = 1;
        }
      } else {
        if (count === 3) grid[x][y].c = 1;
      }
    }
  }
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      grid[x][y].on = grid[x][y].c;
      grid[x][y].c = 0;
    }
  }
}

function keyPressed() {
  switch(key) {
    case " ": {
      paused = paused ? 0 : 1;
    } break;
    case "ArrowUp": {
      speed++;
    } break;
    case "ArrowDown": {
      speed--;
    } break;
    default : {
      if (!isNaN(Number.parseInt(key))) speed = key * 10;
    } break;
  }
  if (speed < 0) speed = 0;
  document.getElementById("paused").innerHTML = paused ? "Paused: True" : "Paused: False";
  document.getElementById("speed").innerHTML = "Fps: " + speed;
  frameRate(speed);
}

function mousePressed() {
  let x = Math.floor(mouseX / (k / size));
  let y = Math.floor(mouseY / (k / size));
  if (x > grid.length || y > grid[0].length) return;
  grid[x][y].on = grid[x][y].on ? 0 : 1;
}
