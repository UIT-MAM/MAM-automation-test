const Page = require('./Page.js');

class LoginPage extends Page {
    
    get btnLinkLogin() { return $('//android.widget.TextView[contains(@text, "Đăng nhập ngay")]'); }
    
    get inputUsername() { return $('//android.widget.ScrollView/android.widget.EditText[1]'); }
    get inputPassword() { return $('//android.widget.ScrollView/android.widget.EditText[2]'); }
    get btnSubmit() { return $('//android.widget.ScrollView/android.view.View[1]/android.widget.Button'); }

    // --- Actions ---

    async login(username, password) {
        await browser.pause(3000); // Chờ app ổn định

        try {
            const btn = await this.btnLinkLogin;
            await btn.waitForDisplayed({ timeout: 5000 });

            // --- KỸ THUẬT CLICK MỚI: Bấm vào mép phải ---
            
            // 1. Lấy vị trí và kích thước của nút text
            const location = await btn.getLocation();
            const size = await btn.getSize();

            // 2. Tính tọa độ điểm cần bấm (Lấy 90% chiều rộng -> Tức là bấm vào đuôi câu)
            // X = Tọa độ ngang + (Chiều rộng * 0.9)
            // Y = Tọa độ dọc + (Chiều cao / 2) -> Giữa dòng theo chiều dọc
            const clickX = Math.round(location.x + (size.width * 0.95)); 
            const clickY = Math.round(location.y + (size.height / 2));

            // 3. Thực hiện hành động chạm (Touch Action)
            await driver.performActions([
                {
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: clickX, y: clickY },
                        { type: 'pointerDown', button: 0 }, // Nhấn xuống
                        { type: 'pause', duration: 100 },   // Giữ nhẹ 1 xíu
                        { type: 'pointerUp', button: 0 }    // Nhả ra
                    ]
                }
            ]);
            
            console.log(`Đã bấm vào tọa độ: ${clickX}, ${clickY}`);

        } catch (e) {
            console.log('Lỗi khi bấm nút chuyển Login: ' + e.message);
        }

        // Các bước nhập liệu tiếp theo
        await this.inputUsername.waitForDisplayed({ timeout: 5000 });
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

module.exports = new LoginPage();