// Content script chạy ngầm trên trang pubg.com
// Nhiệm vụ của nó là nhúng file inject.js vào trang web
var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function() {
    this.remove(); // Xóa thẻ script sau khi chạy xong cho gọn DOM
};
(document.head || document.documentElement).appendChild(s);
