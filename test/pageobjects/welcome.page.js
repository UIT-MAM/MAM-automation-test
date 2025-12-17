class WelcomePage {
  get loginNowButton() {
    return $('~login_now'); // accessibility id
  }

  async goToLogin() {
    await this.loginNowButton.waitForDisplayed({ timeout: 10000 });
    await this.loginNowButton.click();
  }
}

module.exports = new WelcomePage();
