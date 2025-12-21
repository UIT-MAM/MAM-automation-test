const AdminHomeScreen = require('../../pageobjects/admin/AdminHomeScreen');
const MenuMngScreen = require('../../pageobjects/admin/MenuMngScreen');
const LoginPage = require('../../pageobjects/login.page.js');

describe('Menu Management Feature', () => {
    
    // Chạy trước mỗi TC (Ví dụ: Đảm bảo luôn ở màn hình Menu trước khi test)
    before(async () => {
        // Gọi hàm login với tài khoản bạn cung cấp
        // Username: '0867907500', Password: 'string'
        await LoginPage.login('0867907500', 'string');

        // QUAN TRỌNG: Phải chờ login xong, vào được trang chủ Admin rồi mới test tiếp
        // Nếu không chờ, script sẽ chạy test ngay khi mạng còn đang quay -> Lỗi
        await AdminHomeScreen.btnProductManagement.waitForDisplayed({ timeout: 15000 });
    });

    it('TC_MENU_19: Verify Delete button triggers confirmation popup', async () => {
        await AdminHomeScreen.openProductManagement();
        await MenuMngScreen.clickDeleteOnFirstProduct();
        const isPopupVisible = await MenuMngScreen.isDeletePopupDisplayed();
        await expect(isPopupVisible).toBe(true);
        
        // Clean up: Đóng popup để không ảnh hưởng TC sau
        if(isPopupVisible) {
            await MenuMngScreen.btnConfirmNo.click();
        }
    });

    it('TC_MENU_20: Verify the dialog contains correct warning message', async () => {
        // 1. Pre-condition: Đảm bảo popup đang mở
        const isOpen = await MenuMngScreen.isDeletePopupDisplayed();
        if (!isOpen) {
            await MenuMngScreen.clickDeleteOnFirstProduct();
        }

        // 2. Verify nội dung text (Cách mới: Lấy text ra trước)
        
        // Bước A: Lấy chuỗi text thực tế từ màn hình
        const actualText = await MenuMngScreen.getPopupMessageText();
        
        // In ra log để bạn kiểm tra xem nó lấy được chữ gì (Rất hữu ích để debug)
        console.log('>>> TEXT THỰC TẾ TRÊN APP: ', actualText);

        // Bước B: So sánh chuỗi (Dùng toContain thay vì toHaveTextContaining)
        // Expected: Text lấy về phải chứa cụm từ "muốn xóa"
        await expect(actualText).toContain("muốn xóa");

        // 3. Clean up: Đóng popup sau khi check xong text
        await MenuMngScreen.btnConfirmNo.click();
    });

    it('TC_MENU_21: Verify clicking Cancel closes popup and does NOT delete dish', async () => {
        // 1. Pre-condition: Đảm bảo popup đang mở
        // (Vì TC_20 chạy xong đã đóng popup, nên vào đây phải mở lại)
        const isOpen = await MenuMngScreen.isDeletePopupDisplayed();
        if (!isOpen) {
            await MenuMngScreen.clickDeleteOnFirstProduct();
        }

        // 2. Action: Click nút "Từ chối" (Cancel)
        await MenuMngScreen.btnConfirmNo.click();

        // 3. Verify 1: Popup phải biến mất
        await MenuMngScreen.popupDialog.waitForDisplayed({ reverse: true, timeout: 5000 });
        
        // Kiểm tra chắc chắn là nó không còn hiển thị nữa
        const isPopupStillVisible = await MenuMngScreen.popupDialog.isDisplayed();
        await expect(isPopupStillVisible).toBe(false);

        // 4. Verify 2: Món ăn vẫn còn trên danh sách
        await expect(MenuMngScreen.btnDeleteFirstItem).toBeDisplayed();
    });
});