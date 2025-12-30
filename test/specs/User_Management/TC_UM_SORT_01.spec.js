import welcomePage from '../../pageobjects/welcome.page';

// test/specs/admin-user-management.spec.js
const LoginPage = require('../../pageobjects/login.page');
const AdminDashboardPage = require('../../pageobjects/admin-dashboard.page');
const UserManagementPage = require('../../pageobjects/user-management.page');

describe('TC_UM_SORT_01 – Verify Admin can sort user list', () => {
  beforeEach(async () => {
    // Ensure starting from login page
    await welcomePage.goToLogin();
  });

  it('should allow admin to use sort controls on user list', async () => {

    // Login & navigate
    await LoginPage.loginAsAdmin();
    await expect(await AdminDashboardPage.isDisplayed()).toBe(true);

    await AdminDashboardPage.goToUserManagement();
    await expect(await UserManagementPage.isDisplayed()).toBe(true);

    // Step 1: Open sort dropdown
    await UserManagementPage.openSortDropdown();

    // Step 2: Select sort criteria: Họ tên
    await UserManagementPage.selectSortOption('Họ tên');

    // Step 3: Toggle sort direction
    await UserManagementPage.toggleSortDirection();

    // Step 4: Scroll user list
    await browser.execute('mobile: scroll', {
      strategy: '-android uiautomator',
      selector: 'new UiScrollable(new UiSelector().scrollable(true)).scrollForward()'
    });

    await browser.pause(1000);

    // Step 5: Verify screen still displayed (no crash / no error)
    await expect(await UserManagementPage.isDisplayed()).toBe(true);
  });
});
