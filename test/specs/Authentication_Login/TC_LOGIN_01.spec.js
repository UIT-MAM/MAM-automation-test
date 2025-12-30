const LoginPage = require('../../pageobjects/login.page');
const HomePage = require('../../pageobjects/home.page');
const WelcomePage = require('../../pageobjects/welcome.page');
const users = require('../../data/users.json');

describe('TC_LOGIN_01 – Login with multiple identifiers', () => {
    beforeEach(async () => {
    await WelcomePage.goToLogin();
  });
  
  it('Login with Email', async () => {
    await LoginPage.login(users.email.identifier, users.email.password);
    expect(await HomePage.isDisplayed()).toBe(true);
  });

  it('Login with Phone', async () => {
    await LoginPage.login(users.phone.identifier, users.phone.password);
    expect(await HomePage.isDisplayed()).toBe(true);
  });

  it('Login with Username', async () => {
    await LoginPage.login(users.username.identifier, users.username.password);
    expect(await HomePage.isDisplayed()).toBe(true);
  });

});
