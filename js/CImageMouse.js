'use strict'

class CImageMouse {
  constructor(target) {
    if (window.MouseEvent) {
      this.canvas = target.canvas;
      this.canvas.addEventListener('mousedown', this.mousedown.bind(this), false);
      this.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
      this.canvas.addEventListener('mouseup',   this.mouseup.bind(this),   false);
      this.canvas.addEventListener('mouseout',  this.mouseup.bind(this),   false);

      this.target = target;
      this.move = target.move.bind(target);
    }
  }

  mousedown(evt) {
    if(!this.start) {
      this.start = {};
    }
    this.start.x = evt.clientX;
    this.start.y = evt.clientY;

    if(!this.isMoveEvent) {
      this.isMoveEvent = true;
    }
  }

  mousemove(evt) {
    if(this.start) {
      let dx = this.start.x - evt.clientX;
      let dy = this.start.y - evt.clientY;

      this.move(dx, dy);

      this.start.x = evt.clientX;
      this.start.y = evt.clientY;
    }
  }

  mouseup(evt) {
    this.start = null;
  }
}
