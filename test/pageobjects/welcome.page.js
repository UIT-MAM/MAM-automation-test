class WelcomePage {
  get loginNowButton() {
    return $('~login_now'); // accessibility id
  }

  get registerButton() {
    return $('//android.widget.ScrollView/android.view.View[2]/android.widget.Button'); // accessibility id
  }

  async goToLogin() {
    await this.loginNowButton.waitForDisplayed({ timeout: 10000 });
    await this.loginNowButton.click();
  }

  async goToRegister() {
    await this.registerButton.waitForDisplayed({ timeout: 10000 });
    await this.registerButton.click();
  }
}

module.exports = new WelcomePage();
