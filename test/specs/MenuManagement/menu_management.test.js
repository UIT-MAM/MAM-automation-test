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
        
        await AdminHomeScreen.openProductManagement();
    });

    // it('TC_MENU_19: Verify Delete button triggers confirmation popup', async () => {
    //     await MenuMngScreen.clickDeleteOnFirstProduct();
    //     const isPopupVisible = await MenuMngScreen.isDeletePopupDisplayed();
    //     await expect(isPopupVisible).toBe(true);
        
    //     // Clean up: Đóng popup để không ảnh hưởng TC sau
    //     if(isPopupVisible) {
    //         await MenuMngScreen.btnConfirmNo.click();
    //     }
    // });

    // it('TC_MENU_20: Verify the dialog contains correct warning message', async () => {
    //     // 1. Pre-condition: Đảm bảo popup đang mở
    //     const isOpen = await MenuMngScreen.isDeletePopupDisplayed();
    //     if (!isOpen) {
    //         await MenuMngScreen.clickDeleteOnFirstProduct();
    //     }

    //     // 2. Verify nội dung text (Cách mới: Lấy text ra trước)
        
    //     // Bước A: Lấy chuỗi text thực tế từ màn hình
    //     const actualText = await MenuMngScreen.getPopupMessageText();
        
    //     // In ra log để bạn kiểm tra xem nó lấy được chữ gì (Rất hữu ích để debug)
    //     console.log('>>> TEXT THỰC TẾ TRÊN APP: ', actualText);

    //     // Bước B: So sánh chuỗi (Dùng toContain thay vì toHaveTextContaining)
    //     // Expected: Text lấy về phải chứa cụm từ "muốn xóa"
    //     await expect(actualText).toContain("muốn xóa");

    //     // 3. Clean up: Đóng popup sau khi check xong text
    //     await MenuMngScreen.btnConfirmNo.click();
    // });

    // it('TC_MENU_21: Verify clicking Cancel closes popup and does NOT delete dish', async () => {
    //     // 1. Pre-condition: Đảm bảo popup đang mở
    //     // (Vì TC_20 chạy xong đã đóng popup, nên vào đây phải mở lại)
    //     const isOpen = await MenuMngScreen.isDeletePopupDisplayed();
    //     if (!isOpen) {
    //         await MenuMngScreen.clickDeleteOnFirstProduct();
    //     }

    //     // 2. Action: Click nút "Từ chối" (Cancel)
    //     await MenuMngScreen.btnConfirmNo.click();

    //     // 3. Verify 1: Popup phải biến mất
    //     await MenuMngScreen.popupDialog.waitForDisplayed({ reverse: true, timeout: 5000 });
        
    //     // Kiểm tra chắc chắn là nó không còn hiển thị nữa
    //     const isPopupStillVisible = await MenuMngScreen.popupDialog.isDisplayed();
    //     await expect(isPopupStillVisible).toBe(false);

    //     // 4. Verify 2: Món ăn vẫn còn trên danh sách
    //     await expect(MenuMngScreen.btnDeleteFirstItem).toBeDisplayed();
    // });

    // it('TC_MENU_22: Verify clicking OK successfully deletes the dish', async () => {
    //     // 1. Pre-condition
    //     const isPopupOpen = await MenuMngScreen.isDeletePopupDisplayed();
    //     if (isPopupOpen) {
    //         await MenuMngScreen.btnConfirmNo.click();
    //     }

    //     // 2. Lấy tên món (Lúc này XPath mới sẽ lấy đúng tên món ăn, ví dụ "Hot Dog...")
    //     const nameToDelete = await MenuMngScreen.getFirstProductName();
    //     console.log(`>>> Món sắp xóa (Check kỹ xem phải 'Tìm kiếm' ko nhé): ${nameToDelete}`);

    //     // 3. Action: Xóa
    //     await MenuMngScreen.clickDeleteOnFirstProduct();
    //     await MenuMngScreen.popupDialog.waitForDisplayed();
    //     await MenuMngScreen.btnConfirmYes.click();

    //     // 4. Verify: Chờ món đó biến mất
    //     // Hàm này sẽ trả về TRUE nếu món ăn biến mất, FALSE nếu vẫn còn
    //     const isDeleted = await MenuMngScreen.verifyProductDeleted(nameToDelete);

    //     if (isDeleted) {
    //         console.log(`✅ Thành công: Món '${nameToDelete}' đã biến mất.`);
    //     } else {
    //         console.log(`❌ Lỗi: Món '${nameToDelete}' vẫn còn lù lù ở đó.`);
    //     }

    //     await expect(isDeleted).toBe(true);
    // });

    // it('TC_MENU_23: Verify "Changes saved successfully" appears after creating a dish', async () => {
    //     // 1. Chuẩn bị dữ liệu: Tên món ngẫu nhiên
    //     const newDishName = "Món Test " + Math.floor(Math.random() * 1000);
    //     const newDishPrice = "150000";

    //     console.log(`>>> Bắt đầu tạo món: ${newDishName}`);

    //     // 2. Thực hiện hành động tạo món
    //     // (Hàm này đã bao gồm click (+), điền form và bấm save)
    //     await MenuMngScreen.createNewProduct(newDishName, newDishPrice);

    //     // 3. Verify thông báo thành công
    //     const toastText = await MenuMngScreen.getToastMessageText();
    //     console.log(`>>> Thông báo nhận được: ${toastText}`);

    //     // Kiểm tra text chứa "thành công" hoặc "successfully"
    //     // toLowerCase() để không lo chữ hoa/thường
    //     await expect(toastText.toLowerCase()).toMatch(/thành công|successfully|saved/);

    //     // 4. Chờ thông báo tắt hẳn (để không che màn hình cho TC sau)
    //     await MenuMngScreen.toastMessage.waitForDisplayed({ reverse: true, timeout: 5000 });
    // });

    it('TC_MENU_24: Verify "Changes saved successfully" appears after updating a dish', async () => {
        // 1. Pre-condition: Đảm bảo đang ở màn hình List (TC_23 chạy xong là quay về List)
        // Lấy tên món đầu tiên để log kiểm tra
        const dishName = await MenuMngScreen.getFirstProductName();
        console.log(`>>> Bắt đầu sửa món: ${dishName}`);

        // Giá mới ngẫu nhiên
        const updatedPrice = Math.floor(Math.random() * 500000).toString();

        // 2. Thực hiện hành động Update
        // (Click tên -> Click Edit -> Sửa giá -> Click OK)
        await MenuMngScreen.updateFirstProductPrice(updatedPrice);

        // 3. Verify thông báo thành công
        const toastText = await MenuMngScreen.getToastMessageText();
        console.log(`>>> Thông báo sau khi sửa: ${toastText}`);

        await expect(toastText.toLowerCase()).toMatch(/thành công|successfully|saved/);
        
        // 4. (Tùy chọn) Quay lại màn hình chính nếu app không tự back
        // Nếu app của bạn sau khi Save nó vẫn ở trang Detail, bạn cần thêm lệnh back
        // await driver.back(); 
    });
});