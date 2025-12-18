// login.test.js
import { expect } from '@wdio/globals'

describe('MAM App Login Test', () => {
    it('Nên mở app và click vào nút Đăng nhập', async () => {
        // 1. Chờ app load
        await driver.pause(5000);

        // 2. Tìm nút "Đăng nhập ngay" (Dùng cách tìm text chứa đựng cho chắc ăn)
        // Lưu ý: Dùng xpath này để tìm text có chứa chữ "nhập ngay"
        const loginLink = await $('//android.widget.TextView[contains(@text, "nhập ngay")]');
        
        // 3. Kiểm tra xem nút có hiện không
        await expect(loginLink).toBeDisplayed();

        // 4. Click
        await loginLink.click();

        // 5. Chờ xem kết quả
        await driver.pause(3000);
        console.log(">>> Test Passed: Đã click thành công!");
    });
});