<!DOCTYPE html>
<html lang=”ja”>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=0.5,user-scalable=yes,initial-scale=1.0" />
  <title>eiffel&homeh</title>
  <style>
  #pic_canvas {
    width: 300px;
    height: 300px;
  }
  #pic2 {
    width: 300px;
    height: 300px;
  }
  </style>
  <script type="text/javascript" src="js/CImageEdit.js"></script>
  <script type="text/javascript" src="js/CImageMouse.js"></script>
  <script type="text/javascript" src="js/CImageTouch.js"></script>

  <script>
  window.onload=function(){
    let a=new CImageEdit('pic_canvas');
    let b=new CImageMouse(a);
    let c=new CImageTouch(a);

    document.getElementById('pic').addEventListener('change', function(evt) {
      let reader = new FileReader();

      reader.onloadend = function () {
        a.change_image(reader.result, function(scale) {
          let scale_tag = document.getElementById('scale')
          scale_tag.disabled = false;
          scale_tag.value = scale;
        });
      }
      reader.readAsDataURL(evt.currentTarget.files[0]);
    }, false);

    document.getElementById('scale').addEventListener('change', function(evt) {
      evt.currentTarget.value = a.zoom(evt.currentTarget.value - 0);
    }, false);

  }


  </script>
  <script> var error_no=0;</script>
</head>
<body>
  <div>
    <img id="samplepic" src="./img/pic-person.png" alt="person" /><br />
    <div id="canvas_erea" style="display:none" >
      <canvas id="pic_canvas" width="1242px" height="1242px" name="pic_canvas"></canvas>
    </div>

    <form name="form_pic" id="form_pic" action="../API/homeh_user.php" method="post" enctype="multipart/form-data">
      <label class="btn-m navy btn-file">アップロード
        <input style="display:block" type="file" id="pic" name="pic" placeholder="思い出に残したい画像をアップロード" accept="image/jpeg,image/png" />
      </label>
      <br />
      <p id="check_pic"  class="check"></p>


      <div id="ichi">次へ</div>

      <img id="pic2" src="./img/pic-person.png" alt="person" />
    </div>
  </body>
  <script src="js/PicToCanvas.js"></script>
