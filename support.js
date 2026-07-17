/**
 * HOT Drop Rush Mini-Game - Jetpack Hack
 * Author: Chieenslee
 */
(async function(){
  // 1. Nhận diện phím độc lập (bỏ qua game)
  if(!window.downKeyHack) {
    window.isHoldingDown = false;
    window.addEventListener('keydown', function(e) { 
      if(e.code === 'ArrowDown' || e.code === 'KeyS') window.isHoldingDown = true; 
    });
    window.addEventListener('keyup', function(e) { 
      if(e.code === 'ArrowDown' || e.code === 'KeyS') window.isHoldingDown = false; 
    });
    window.downKeyHack = true;
  }

  // 2. Tìm file game
  var url;
  performance.getEntriesByType('resource').forEach(function(e){if(e.name.includes('paradrop-game')) url=e.name;});
  if(!url){document.querySelectorAll('script[src]').forEach(function(s){if(s.src.includes('paradrop')) url=s.src;});}
  if(!url){console.error('❌ Không tìm thấy!');return;}

  var code=await(await fetch(url)).text();
  
  // 3. Trọng lực = 0 (lơ lửng) - hỗ trợ cả game cũ và mới
  code=code.replace('vt=2600','vt=0'); // Bản cũ
  code=code.replace('yt=4e3','yt=0');  // Bản cũ
  code=code.replace('Et=2600','Et=0'); // Bản mới
  code=code.replace('At=4e3','At=0');  // Bản mới
  // 4. Tốc độ quái = 100
  code=code.replace(/enemySpeedMultiplier:[0-9.]+,/g,'enemySpeedMultiplier:100,');

  // 5. Thêm lệnh rơi khi bấm XUỐNG
  code=code.replace(
    'this.sprite.y+=this.velocityY*l', 
    'window.isHoldingDown&&(this.velocityY=1500),this.sprite.y+=this.velocityY*l'
  );

  var s=document.createElement('script');
  s.textContent=code;
  document.head.appendChild(s);
  console.log('✅ Đã tải Công cụ Hỗ trợ! Đóng game rồi Play lại nhé.');
})();
