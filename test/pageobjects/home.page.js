class HomePage {
  get homeTitle() {
    return $('//android.widget.TextView[@text="Trang chủ"]');
  }

  async isDisplayed() {
    return await this.homeTitle.isDisplayed();
  }
}

module.exports = new HomePage();
