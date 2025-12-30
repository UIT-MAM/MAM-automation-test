import welcomePage from '../../pageobjects/welcome.page';

// test/specs/admin-user-management.spec.js
const LoginPage = require('../../pageobjects/login.page');
const AdminDashboardPage = require('../../pageobjects/admin-dashboard.page');
const UserManagementPage = require('../../pageobjects/user-management.page');

describe('TC_UM_LIST_01 – Admin view user management', () => {
    beforeEach(async () => {
        // Ensure starting from login page
        await welcomePage.goToLogin();
    });
  it('should allow admin to open User Management screen', async () => {

    // Step 1: Login admin
    await LoginPage.loginAsAdmin();

    // Step 2: Verify Dashboard
    await expect(await AdminDashboardPage.isDisplayed()).toBe(true);

    // Step 3: Click User Management
    await AdminDashboardPage.goToUserManagement();

    // Step 4: Verify User Management screen
    await expect(await UserManagementPage.isDisplayed()).toBe(true);

    const firstUser = await $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View[3]');
    await expect(firstUser).toBeDisplayed();

    await browser.execute('mobile: scroll', {
  strategy: '-android uiautomator',
  selector: 'new UiScrollable(new UiSelector().scrollable(true)).scrollForward()'
});



    await browser.pause(1000);

    // ✅ Step 3: Verify another user appears after scroll
    const anotherUser = await $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View[7]');
    await expect(anotherUser).toBeDisplayed();
  });
});
