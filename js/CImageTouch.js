'use strict'

class CImageTouch {
  constructor(target) {
    if (window.TouchEvent) {
      let canvas = target.canvas;
      canvas.addEventListener('touchstart', this.touchstart.bind(this), false);
      canvas.addEventListener('touchmove',  this.touchmove.bind(this),  false);
      canvas.addEventListener('touchend',   this.touchend.bind(this),   false);

      this.move = target.move.bind(target);
      this.zoom = target.zoom.bind(target);
    }
    this.isMoveEvent = false;
  }

  touchstart(evt) {
    evt.preventDefault();

    let touch_list = evt.changedTouches;
    if (touch_list.length < this.touch_count) {
      // 指を離したとき
      return;
    }
    this.touch_count = touch_list.length;

    switch (touch_list.length) {
      case 1: // 一本指（移動）開始
        if(!this.start) {
          this.start = {};
          this.start.x = touch_list[0].clientX;
          this.start.y = touch_list[0].clientY;
        }
        break;
      case 2: // 二本指（ピンチ）開始
        if (!this.pinch_start) {
          this.pinch_start = {}
          let dx2 = touch_list[0].clientX - touch_list[1].clientX; // x座標の距離
          let dy2 = touch_list[0].clientY - touch_list[1].clientY; // y座標の距離
          this.pinch_start.distance = Math.sqrt(dx2 * dx2 + dy2 * dy2); // 三平方の定理で2点間の距離を計算
          this.pinch_start.scale = this.scale.value + 0;
          }
        break;
      case 3:
        break;
    }

    if(!this.isMoveEvent) {
      this.isMoveEvent = true;
    }
  }

  touchmove(evt) {
    evt.preventDefault();

    let touch_list = evt.changedTouches;
    if (touch_list.length < this.touch_count) {
      return;
    } else if (touch_list.length > this.touch_count) {
      this.touch_count = touch_list.length;
    }

    switch (touch_list.length) {
      case 1: // 一本指（ドラッグ）
        if(this.start) {
          let dx = this.start.x - touch_list[0].clientX;
          let dy = this.start.y - touch_list[0].clientY;

          this.move(dx, dy);

          this.start.x = touch_list[0].clientX;
          this.start.y = touch_list[0].clientY;
        }
        break;
      case 2: // 二本指（ピンチ）
        if(this.pinch_start) {
          let dx2 = this.touch_list[0].clientX - this.touch_list[1].clientX;  // x座標の距離
          let dy2 = this.touch_list[0].clientY - this.touch_list[1].clientY;  // y座標の距離
          let distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);  // 三平方の定理で2点間の距離を計算
          let scale = this.pinch_start.scale * (distance / this.pinch_start.distance);

          this.zoom(scale);
        }
        break;
      case 3:
        break;
    }
  }

  touchend(evt) {
    this.start = null;
    this.pinch_start = null;
    this.touch_count = 0;
  }
}
