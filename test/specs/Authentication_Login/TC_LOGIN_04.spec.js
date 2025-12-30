const WelcomePage = require('../../pageobjects/welcome.page');

describe('TC_LOGIN_04 – Verify login fails with non-existent account', () => {

  beforeEach(async () => {
    await WelcomePage.goToLogin();
  });

  it('should show error and stay on Login screen', async () => {

    // Enter username (non-existent)
    await $('//android.widget.ScrollView/android.widget.EditText[1]')
      .setValue('nonexistent123@gmail.com');

    // Enter password
    await $('//android.widget.ScrollView/android.widget.EditText[2]')
      .setValue('Test123!');

    // Click login
    await $('//android.widget.ScrollView/android.view.View[1]/android.widget.Button')
      .click();

    // ✅ Verify error feedback appears
    const toast = await $('//android.widget.Toast');
    await expect(toast).toBeExisting();

    // ✅ Verify still on Login screen (IMPORTANT)
    await expect(
      $('//android.widget.ScrollView/android.widget.EditText[1]')
    ).toBeDisplayed();
  });
});
