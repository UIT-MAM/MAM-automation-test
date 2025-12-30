const WelcomePage = require('../../pageobjects/welcome.page');
const LoginPage = require('../../pageobjects/login.page');

describe('TC_LOGIN_03 - Login button disabled with empty fields', () => {
    beforeEach(async () => {
            await WelcomePage.goToLogin();
          });
  it('should disable Login button when Username and Password are empty', async () => {

    const loginBtn = $('//android.widget.ScrollView/android.view.View[1]/android.widget.Button');

  await loginBtn.click();

  // Verify vẫn ở Login screen
  await LoginPage.isDisplayed();
  });
});
