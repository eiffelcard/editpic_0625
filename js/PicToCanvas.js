//写真読み込み
document.getElementById('pic').addEventListener('change', function(evt) {
  let file = evt.currentTarget.files[0];
  let reader = new FileReader();

  if(file) {
    reader.readAsDataURL(file);
  } else {
    img.src = "";
  }
}, false);


//写真の表示
document.getElementById("pic").addEventListener("change",function(){
  console.log("picチェンジのとこ");
 document.getElementById("samplepic").style.display="none";
  document.getElementById("canvas_erea").style.display="block";
});

//写真の変換
document.getElementById("ichi").addEventListener("click",function(){
 document.getElementById("pic2").setAttribute('src',document.getElementById("pic_canvas").toDataURL('image/jpeg'));
});


/* 下の書き方でcanvasの写真データがJson化
picture=document.getElementById("pic_canvas").toDataURL('image/jpeg');
*/



