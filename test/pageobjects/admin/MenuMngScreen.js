const Page = require('../Page.js');

class MenuMngScreen extends Page {
    // ===========================
    // 1. SELECTORS
    // ===========================

    // --- MÀN HÌNH LIST ---
    
    // Nút (+) Thêm mới (Góc dưới màn hình)
    get btnAddProduct() {
        // Tìm nút Button nổi (Floating Action Button) thường nằm cuối view
        return $('//android.widget.Button[contains(@text, "+") or contains(@content-desc, "Add") or contains(@content-desc, "Thêm")]');
    }

    // Tên món ăn đầu tiên (Logic loại trừ text rác như bạn đã duyệt)
    get txtFirstItemName() {
        return $(`//android.widget.TextView[
            not(@text="Sản phẩm") and 
            not(@text="Tìm kiếm sản phẩm") and 
            not(@text="Tất cả") and 
            not(contains(@text, "VND"))
        ][1]`);
    }

    // Nút Thùng rác (Xóa) của món đầu tiên
    get btnDeleteFirstItem() {
        return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[1]/android.view.View[3]/android.view.View[2]/android.widget.Button'); 
    }

    // --- MÀN HÌNH CHI TIẾT / FORM ---

    // Nút Edit (Cây bút) - Khi đã vào trang chi tiết (Theo xPath bạn cung cấp)
    get btnEditOnDetail() {
        return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.widget.Button[2]');
    }

    // Nút OK / Lưu (Theo xPath bạn cung cấp)
    get btnSubmit() {
        return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.widget.Button[2]');
    }

    // Input Tên món (Thường là ô đầu tiên)
    get inputProductName() {
        return $('//android.widget.EditText[1]');
    }

    // Input Giá món (Thường là ô thứ 2)
    // Bạn đưa xPath cụ thể có text "300001.00", mình đổi thành index để dùng cho mọi món
    get inputProductPrice() {
        return $('//android.widget.EditText[2]');
    }

    // --- POPUP & THÔNG BÁO ---

    get popupDialog() { return $('//android.view.ViewGroup/android.view.View/android.view.View/android.view.View'); }
    get popupMessage() { return $('//android.widget.TextView[contains(@text, "muốn xóa")]'); }
    get btnConfirmYes() { return $('//android.view.ViewGroup/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button'); }
    get btnConfirmNo() { return $('//android.view.ViewGroup/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.Button'); }

    // Thông báo Toast (Thành công)
    get toastMessage() {
        // Tìm text chứa 'thành công' hoặc 'successfully'
        return $('//android.widget.TextView[contains(@text, "thành công") or contains(@text, "successfully") or contains(@text, "saved")]');
    }

    // ===========================
    // 2. ACTIONS
    // ===========================

    // --- Các hàm chung ---
    async getFirstProductName() {
        await this.txtFirstItemName.waitForDisplayed();
        return await this.txtFirstItemName.getText();
    }

    async getToastMessageText() {
        // Toast hiện rất nhanh, chờ tối đa 5s
        await this.toastMessage.waitForDisplayed({ timeout: 5000 });
        return await this.toastMessage.getText();
    }

    // --- Logic Xóa (TC_19 -> TC_22) ---
    async clickDeleteOnFirstProduct() {
        await this.btnDeleteFirstItem.waitForDisplayed({ timeout: 10000 });
        await this.btnDeleteFirstItem.click();
    }
    
    async getPopupMessageText() {
        await this.popupMessage.waitForDisplayed();
        return await this.popupMessage.getText();
    }

    async isDeletePopupDisplayed() {
        try {
            await this.popupDialog.waitForDisplayed({ timeout: 2000 });
            return await this.popupDialog.isDisplayed();
        } catch(e) { return false; }
    }

    async verifyProductDeleted(name) {
        const productEl = $(`//android.widget.TextView[@text="${name}"]`);
        try {
            await productEl.waitForDisplayed({ reverse: true, timeout: 5000 });
            return true; 
        } catch (e) { return false; }
    }

    // --- Logic Thêm Mới (TC_23) ---
    async createNewProduct(name, price) {
        // 1. Click nút (+)
        await this.btnAddProduct.waitForDisplayed();
        await this.btnAddProduct.click();

        // 2. Điền form
        await this.inputProductName.waitForDisplayed();
        await this.inputProductName.setValue(name);
        await this.inputProductPrice.setValue(price);
        
        // Ẩn bàn phím để không che nút Lưu
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 3. Bấm Lưu (Dùng chung nút btnSubmit với Update)
        await this.btnSubmit.click();
    }

    // --- Logic Cập Nhật (TC_24) ---
    async updateFirstProductPrice(newPrice) {
        // 1. Bấm vào TÊN món ăn để vào trang chi tiết
        await this.txtFirstItemName.waitForDisplayed();
        await this.txtFirstItemName.click();

        // 2. Bấm nút Edit (Ở trang chi tiết)
        await this.btnEditOnDetail.waitForDisplayed();
        await this.btnEditOnDetail.click();

        // 3. Sửa giá tiền
        await this.inputProductPrice.waitForDisplayed();
        await this.inputProductPrice.clearValue(); // Xóa giá cũ
        await this.inputProductPrice.setValue(newPrice); // Nhập giá mới

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 4. Bấm OK để lưu
        await this.btnSubmit.click();
    }
}

module.exports = new MenuMngScreen();