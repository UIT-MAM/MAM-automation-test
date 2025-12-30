// test/pageobjects/user-management.page.js
class UserManagementPage {

  get searchInput() {
    return $('android.widget.EditText');
  }
  async openSortDropdown() {
    const dropdown = await $('~Sort');
    await dropdown.click();
  }

  async selectSortOption(optionText) {
    const option = await $(
      `android=new UiSelector().text("${optionText}")`
    );

    await option.waitForDisplayed({ timeout: 10000 });
    await option.click();
  }
  async toggleSortDirection() {
    const toggleBtn = await $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.Button');
    await toggleBtn.click();
  }
  async getUserNames() {
  const textViews = await $$('android.widget.TextView');
  const names = [];

  for (const el of textViews) {
    const text = (await el.getText()).trim();

    if (!text) continue;

    // ❌ loại UI text
    if (
      text === 'Tài khoản' ||
      text === 'Tìm kiếm tài khoản' ||
      text === 'Họ tên' ||
      text === 'Email' ||
      text === 'Số điện thoại' ||
      text === 'Tên người dùng'
    ) continue;

    // ❌ loại tag, phone, email
    if (
      text.startsWith('#') ||
      text.startsWith('+') ||
      text.includes('@')
    ) continue;

    names.push(text);
  }

  return names;
}
  async isDisplayed() {
    await this.searchInput.waitForDisplayed({ timeout: 10000 });
    return true;
  }

  async isUserVisible(username) {
    const user = await $(`android=new UiSelector().text("${username}")`);
    return await user.isDisplayed();
  }
}

module.exports = new UserManagementPage();
