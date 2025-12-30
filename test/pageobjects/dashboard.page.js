class DashBoardPage {
    get UserManagementButton() {
        return $('//android.widget.ScrollView/android.view.View[5]/android.widget.Button');
    }
    async goToUserManagement() {
        await this.UserManagementButton.waitForDisplayed({ timeout: 10000 });
        await this.UserManagementButton.click();
    }
}
module.exports = new DashBoardPage();