class LoginPage {
  // ===== SELECTORS =====

  get loginNowLink() {
    // content-desc = accessibility id
    return $('~login_now');
  }

  get usernameInput() {
    return $('~input_username'); // ví dụ
  }

  get passwordInput() {
    return $('~input_password'); // ví dụ
  }

  get loginButton() {
    return $('~btn_login');
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
}

module.exports = new LoginPage();
