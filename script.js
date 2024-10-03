console.log();

document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // 防止表單的默認提交行為

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);

    console.log(username);
    console.log(password);
  });

function login(username, password) {
  // 這裡應該調用伺服器端的登入 API
  fetch(
    'https://script.google.com/macros/s/AKfycbxcvbRgMvXLs12Ij4kVlkYQZ8WM2Ahi6KkohqyG-P-YIpl0Cf0pj9ow369LU_c-rYDIow/exec',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      if (data.trim() === 'Login successful!') {
        // 登入成功，進行後續操作（如跳轉到主頁面）
        window.location.href = '/page2.html';
      } else {
        alert('登入失敗！');
        document.getElementById('message').style.display = 'none';
        showMessage('登入失敗！');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('登入失敗！請檢查網絡連接。');
    });
}

function showMessage(message) {
  document.getElementById('message').textContent = message;
  document.getElementById('message').style.display = 'block';
}
