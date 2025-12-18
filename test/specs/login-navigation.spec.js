describe('Mam App - Login navigation (no code change)', () => {
  it('should navigate to Login screen when clicking "Đăng nhập ngay"', async () => {
    await browser.pause(3000);
    // 1️⃣ Locate element
    const loginNow = $('android=new UiSelector().textContains("Đăng nhập ngay")');

    // 2️⃣ Assert element exists & is visible
    await loginNow.waitForDisplayed({ timeout: 10000 });

    // 3️⃣ Click thật
    await loginNow.click();

    // 4️⃣ DEBUG ONLY – để bạn nhìn thấy UI đổi
    await browser.pause(2000);
  });
});
