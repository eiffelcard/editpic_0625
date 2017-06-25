'use strict'

class CImageEdit {
  constructor(idCanvas) {
    this.canvas = document.getElementById(idCanvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.scale = 1;
    this.scale_min = 1;
    this.clipping = {
      top: 0,
      left: 0,
      width: this.canvas.width,
      height: this.canvas.height
    };
    this.last_angle = 0;
    this.image = new Image();
  }

  change_image(img_data, changed) {
    /* 画像を描画 */
    this.image.src = img_data;
    let self=this;
    this.image.onload = function () {
      // オリジナル画像をcanvasサイズにする倍率計算
      let scale = 1 / Math.min(self.image.width / self.width, self.image.height / self.height);
      if (scale < 0.001) {
        scale = 0.001;
      }

      self.scale_min = scale;
      self.scale = scale;
      // クリッピングサイズの計算
      let clipping = {};
      clipping.top = 0;
      clipping.left = 0;
      clipping.width = self.canvas.width / scale;
      clipping.height = self.canvas.height / scale;
      self.clipping = clipping;

      self.draw();
      changed(scale);
    }
  }

  zoom(scale) {
    if (scale < this.scale_min) {
      scale = this.scale_min;
    }

    this.scale = scale;
    // クリッピングサイズの計算
    this.clipping.width = this.canvas.width / scale;
    this.clipping.height = this.canvas.height / scale;

    // クリップ位置補正
    if (this.image.height < this.clipping.top + this.clipping.height) {
      this.clipping.top = this.image.height - this.clipping.height;
    }
    if (this.image.width < this.clipping.left + this.clipping.width) {
      this.clipping.left = this.image.width - this.clipping.width;
    }

    this.draw();

    return scale;
  }

  move(dx, dy) {
    let scale = this.scale;

    this.clipping.left += dx / scale;
    if (this.clipping.left < 0) {
      this.clipping.left = 0;
    } else if (this.image.width < this.clipping.left + this.clipping.width) {
      this.clipping.left = this.image.width - this.clipping.width;
    }

    this.clipping.top += dy / scale;
    if (this.clipping.top < 0) {
      this.clipping.top = 0;
    } else if (this.image.height < this.clipping.top + this.clipping.height) {
      this.clipping.top = this.image.height - this.clipping.height;
    }

    this.draw();

    return;
  }

  rotate(angle) // 角度はラジアンで指定する
  {
    this.last_angle += angle;
    this.draw();    
  }

  draw() {
    let ctx = this.ctx;
    let draw_area = {}

    draw_area.left = 0;
    draw_area.top = 0;
    draw_area.width = this.canvas.width - draw_area.left * 2;
    draw_area.height = this.canvas.height - draw_area.top * 2;

    ctx.clearRect(draw_area.left, draw_area.width, draw_area.width, draw_area.height); // canvasのクリア
    ctx.drawImage(
      this.image,
      this.clipping.left,
      this.clipping.top,
      this.clipping.width,
      this.clipping.height,
      draw_area.left,
      draw_area.top,
      draw_area.width,
      draw_area.height);
    ctx.rotate(this.last_angle);
  }
}
