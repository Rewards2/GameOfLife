class Cell {
  constructor(x, y, s, i) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.on = i;
    this.c = 0;
  }
  show() {
    if (this.on) fill(0); 
    else fill(255);
    square(this.x, this.y, this.s);
  }
}
