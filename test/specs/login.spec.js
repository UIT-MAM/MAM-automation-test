const LoginPage = require('../pageobjects/login.page');

describe('Mam App - Login Flow', () => {
  it('should navigate to Login screen when clicking "Đăng nhập ngay"', async () => {

    // 1️⃣ Đảm bảo app đã mở (Appium tự mở bằng capabilities)
    // KHÔNG browser.url()

    // 2️⃣ Click "Đăng nhập ngay"
    await LoginPage.openLoginFromWelcome();

    // 3️⃣ Verify đã sang màn Login
    // Ví dụ: kiểm tra ô username xuất hiện
    await LoginPage.usernameInput.waitForDisplayed({
      timeout: 10000,
    });
  });
});
