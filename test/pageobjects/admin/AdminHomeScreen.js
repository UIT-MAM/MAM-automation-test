const Page = require('../Page');

class AdminHomeScreen extends Page {
    // --- Selectors ---

    // Nút "Sản phẩm" (Dựa trên xPath bạn cung cấp)
    get btnProductManagement() {
        return $('//android.widget.ScrollView/android.view.View[4]/android.widget.Button'); 
    }

    // --- Actions ---

    async openProductManagement() {
        // Chờ nút hiển thị tối đa 10s (Compose view load hơi lâu)
        await this.btnProductManagement.waitForDisplayed({ timeout: 10000 });
        await this.btnProductManagement.click();
    }
}

module.exports = new AdminHomeScreen();