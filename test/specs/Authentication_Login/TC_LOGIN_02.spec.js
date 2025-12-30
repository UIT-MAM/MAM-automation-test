const WelcomePage = require('../../pageobjects/welcome.page');
describe('TC_LOGIN_02 – Ensure login fails if password is incorrect', () => {
    beforeEach(async () => {
        await WelcomePage.goToLogin();
      });
  it('should show error when password is incorrect', async () => {

    // Enter username
    await $('//android.widget.ScrollView/android.widget.EditText[1]').setValue('chauctenhat165@gmail.com');

    // Enter wrong password
    await $('//android.widget.ScrollView/android.widget.EditText[2]').setValue('WrongPass123');

    // Click login
    await $('//android.widget.ScrollView/android.view.View[1]/android.widget.Button').click();

    // ✅ Verify error feedback appears
    const toast = await $('//android.widget.Toast');
    await expect(toast).toBeExisting();

    // ✅ Verify still on Login screen (IMPORTANT)
    await expect(
      $('//android.widget.ScrollView/android.widget.EditText[1]')
    ).toBeDisplayed();
  });
});
