const Page = require('../Page.js'); // Nhớ check chữ P hoa/thường cho đúng file

class MenuMngScreen extends Page {
    // --- Selectors ---
    
    // Nút xóa (Icon thùng rác) - Giữ nguyên cái cũ của bạn
    get btnDeleteFirstItem() {
        return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[1]/android.view.View[3]/android.view.View[2]/android.widget.Button'); 
    }

    // UPDATE MỚI: Popup xác nhận (Dựa trên xPath bạn gửi)
    get popupDialog() {
        return $('//android.view.ViewGroup/android.view.View/android.view.View/android.view.View');
    }

    get popupMessage() {
        // Tìm thẻ TextView nào nằm trong popup mà có chứa chữ "muốn xóa"
        return $('//android.widget.TextView[contains(@text, "muốn xóa")]');
    }

    // UPDATE MỚI: Nút Từ chối (Để đóng popup sau khi test xong)
    get btnConfirmNo() {
        return $('//android.view.ViewGroup/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.Button');
    }

    // --- Actions ---

    async clickDeleteOnFirstProduct() {
        await this.btnDeleteFirstItem.waitForDisplayed({ timeout: 10000 });
        await this.btnDeleteFirstItem.click();
    }

    async isDeletePopupDisplayed() {
        try {
            // Chờ popup hiện lên
            await this.popupDialog.waitForDisplayed({ timeout: 5000 });
            return await this.popupDialog.isDisplayed();
        } catch (e) {
            return false;
        }
    }

    async getPopupMessageText() {
        await this.popupMessage.waitForDisplayed({ timeout: 3000 });
        return await this.popupMessage.getText();
    }
}

module.exports = new MenuMngScreen();