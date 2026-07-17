/**
 * HOT Drop Rush - FULL AFK BOT v5.0 (BLACK HOLE EDITION)
 * Author: Chieenslee
 * 
 * - Khong can di chuyen nua!
 * - Hut toan bo thinh + quai vat vao dung vi tri cua nhan vat.
 * - Nhan vat chi viec dung yen 1 cho va "an" moi thu.
 * - Diem x2 (Pickup: 200) de farm nhanh, tu dung o 20,000.
 * - Tu dong chuyen luot choi tiep theo.
 */
(async function(){
  var url;
  performance.getEntriesByType('resource').forEach(function(e){
    if(e.name.includes('paradrop-game')) url=e.name;
  });
  if(!url){
    document.querySelectorAll('script[src]').forEach(function(s){
      if(s.src.includes('paradrop')) url=s.src;
    });
  }
  if(!url){console.error('Khong tim thay file game!');return;}

  var code=await(await fetch(url)).text();

  // PATCH 1: BAT TU
  code=code.replace('setHealth(t){this.playerHealth=t}', 'setHealth(t){this.playerHealth=3}'); // Bản mới
  code=code.replace('Ji=Ki("false")', 'Ji=!0'); // Bản cũ

  // PATCH 2: Trong luc = 0
  code=code.replace('vt=2600','vt=0'); // Bản cũ
  code=code.replace('yt=4e3','yt=0');  // Bản cũ
  code=code.replace('Et=2600','Et=0'); // Bản mới
  code=code.replace('At=4e3','At=0');  // Bản mới

  // PATCH 3: Toc do x2 (vua phai) de an toan hon voi server
  code=code.replace(/enemySpeedMultiplier:[0-9.]+,/g,'enemySpeedMultiplier:2,');
  // Diem: GIU NGUYEN GOC (100d/thinh) de tranh bi server phat hien

  // PATCH 5: Kich ban BLACK HOLE + Auto Stop + Auto Next Round
  code+=`;
    (function(){
      window.addEventListener('keydown', function(e) {
        if(e.code === 'KeyK' && !e.repeat) {
          try { Ji = false; } catch(err){}
          window._autoPlayEnabled = false;
          window._fullAfkMode = false;
          console.log('[K] Da dung toan bo Auto.');
        }
      });

      window._autoPlayEnabled = true;
      window._fullAfkMode = true;
      var _logInterval = 300; 
      var _frameTick = 0;

      function findGameScene() {
        var canvases = document.querySelectorAll('canvas');
        for(var i = 0; i < canvases.length; i++) {
          var keys = Object.keys(canvases[i]);
          for(var j = 0; j < keys.length; j++) {
            try {
              var obj = canvases[i][keys[j]];
              if(obj && obj.scene && obj.scene.scenes) return obj;
            } catch(e){}
          }
        }
        for(var key in window) {
          try {
            if(window[key] && window[key].scene && window[key].scene.scenes) return window[key];
          } catch(e){}
        }
        return null;
      }

      // Vong lap giam sat Game
      var _checkInterval = setInterval(function() {
        var game = findGameScene();
        if(!game) return;

        var scene = null;
        for(var i = 0; i < game.scene.scenes.length; i++) {
          var s = game.scene.scenes[i];
          if(s.player && s.hud) { scene = s; break; }
        }
        if(!scene || !scene.player) return;

        console.log('[AUTO] Da thay nhan vat, kich hoat BLACK HOLE...');

        // Vong lap in-game (Chay 60 lan/s)
        var _autoInterval = setInterval(function() {
          if(!window._autoPlayEnabled) return;

          var currentScene = null;
          for(var i = 0; i < game.scene.scenes.length; i++) {
            var s = game.scene.scenes[i];
            if(s.player && s.hud && s.scene.isActive()) { currentScene = s; break; }
          }
          if(!currentScene || !currentScene.player) return;

          var p = currentScene.player;
          var sp = p.sprite || p;
          if(!sp || typeof sp.x !== 'number') return;

          _frameTick++;

          // === TINH NANG BLACK HOLE (HUT MOI THU VAO DAU) ===
          // Duyet qua toan bo vat the tren man hinh
          if(currentScene.children && currentScene.children.list) {
            currentScene.children.list.forEach(function(child) {
              // Neu la vat the dang roi (co body vat ly, dang rot xuong)
              if(child && child !== sp && child.body && child.body.velocity && child.body.velocity.y > 0) {
                // ÉP tọa độ X của vật thể = tọa độ X của nhân vật
                child.x = sp.x; 
              }
            });
          }

          // Tu dong tu sat o moc 19,000 diem.
          // Cac thinh/quai dang roi tren man hinh se ranh roi rot xuong + tinh diem dodge
          // -> se day diem len 20,000+ mot cach tu nhien.
          try {
            var score = currentScene.hud.getScore();
            if(score >= 19000) {
              console.log('========================================');
              console.log('  [AUTO] DA DAT ' + score + ' DIEM! TU SAT...');
              console.log('========================================');
              
              window._autoPlayEnabled = false; // Tam dung hut
              try { Ji = false; } catch(err){} // Tat bat tu
              if(p.health !== undefined) p.health = 0; // Tu sat
              return;
            }
            
            if(_frameTick % _logInterval === 0) {
              console.log('[AUTO] Diem hien tai: ' + score + ' / 19,000 (Muc tieu tu sat)');
            }
          } catch(e){}

        }, 1000/60);
      }, 1000);

      // BO TINH NANG AUTO NEXT ROUND (Tu tay bam Play Again)

    })();
  `;

  // INJECT
  var s=document.createElement('script');
  s.textContent=code;
  document.head.appendChild(s);
  
  console.log('========================================');
  console.log('  BLACK HOLE AFK v5.0 - ACTIVATED!');
  console.log('========================================');
  console.log('  1. Nhan vat DUNG YEN 1 cho.');
  console.log('  2. Hut TOAN BO thinh & quai vao dau (Black Hole).');
  console.log('  3. Toc do x2 (an toan), Diem GOC (100d/thinh).');
  console.log('  4. Tu sat som o 19,000 -> luot den 20,000+ la dep.');
  console.log('  5. BAN TU BAM PLAY AGAIN de sang luot moi.');
  console.log('  - Phim K: Tat toan bo auto.');
  console.log('');
  console.log('>> DONG GAME ROI PLAY LAI <<');
  console.log('========================================');
})();
