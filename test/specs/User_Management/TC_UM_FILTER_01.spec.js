import welcomePage from '../../pageobjects/welcome.page';

// test/specs/admin-user-management.spec.js
const LoginPage = require('../../pageobjects/login.page');
const AdminDashboardPage = require('../../pageobjects/admin-dashboard.page');
const UserManagementPage = require('../../pageobjects/user-management.page');

describe('TC_UM_FILTER_01 – Verify Admin can filter user list', () => {
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

    await UserManagementPage.openSortDropdown();
    await UserManagementPage.selectSortOption('Tên người dùng');

    await UserManagementPage.openSortDropdown();
    await UserManagementPage.selectSortOption('Tất cả');

    await UserManagementPage.openSortDropdown();
    await UserManagementPage.selectSortOption('Số điện thoại');

    await UserManagementPage.openSortDropdown();
    await UserManagementPage.selectSortOption('Tất cả');

    await expect(await UserManagementPage.isDisplayed()).toBe(true);
  });
});
