class LoginPage {
  // ===== SELECTORS =====

  get loginNowLink() {
    // content-desc = accessibility id
    return $('~login_now');
  }

  get usernameInput() {
    return $('//android.widget.ScrollView/android.widget.EditText[1]');
  }

  get passwordInput() {
    return $('//android.widget.ScrollView/android.widget.EditText[2]');
  }

  get loginButton() {
    return $('//android.widget.ScrollView/android.view.View[1]/android.widget.Button');
  }

  // ===== ACTIONS =====

  async openLoginFromWelcome() {
    await this.loginNowLink.waitForDisplayed({ timeout: 10000 });
    await this.loginNowLink.click();
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
  async loginAsAdmin() {
    await this.login('admin', 'ZTEGC1E1FC92');
  }

  async isDisplayed() {
  try {
    await this.usernameInput.waitForDisplayed({ timeout: 10000 });
    await this.loginButton.waitForDisplayed({ timeout: 10000 });
    return true;
  } catch (e) {
    return false;
  }
}

}

module.exports = new LoginPage();
