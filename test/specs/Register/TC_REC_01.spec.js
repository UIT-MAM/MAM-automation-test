const loginPage = require('../../pageobjects/login.page');
const WelcomePage = require('../../pageobjects/welcome.page');
describe('TC_REG_01 – Register with valid information', () => {
    beforeEach(async () => {
        await WelcomePage.goToRegister();
      });
  it('should register successfully and redirect to Login screen', async () => {

    // Fill registration form
    await $('//android.widget.ScrollView/android.widget.EditText[1]').setValue('Tran Tran Chau');
    await $('//android.widget.ScrollView/android.widget.EditText[2]').setValue('0987654322');
    await $('//android.widget.ScrollView/android.widget.EditText[3]').setValue('23520174@gm.uit.edu.vn');
    await $('//android.widget.ScrollView/android.widget.EditText[4]').setValue('congchuabongbay');
    await $('//android.widget.ScrollView/android.widget.EditText[5]').setValue('Password123!');
    await $('//android.widget.ScrollView/android.widget.EditText[6]').setValue('Password123!');
    // Submit
    await $('//android.widget.ScrollView/android.view.View/android.widget.Button').click();

    // Optional: wait for backend response
    await browser.pause(1500);

    // Verify redirect to Login screen
      await loginPage.isDisplayed();
  });
});
