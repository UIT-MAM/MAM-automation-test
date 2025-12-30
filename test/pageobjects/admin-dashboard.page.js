// test/pageobjects/admin-dashboard.page.js
class AdminDashboardPage {

  // Dùng text vì chưa có accessibility id
  get userManagementMenu() {
    return $('//android.widget.ScrollView/android.view.View[5]/android.widget.Button');
  }

  async isDisplayed() {
    await this.userManagementMenu.waitForDisplayed({ timeout: 10000 });
    return true;
  }

  async goToUserManagement() {
    await this.userManagementMenu.click();
  }
}

module.exports = new AdminDashboardPage();
