# MAM-automation-test

SE113 - Kiem chung phan mem (Mobile + Web)
📱 MAM Automation Test

Automation test project for MAM Android Application using Appium + WebdriverIO (WDIO).
This project focuses on end-to-end (E2E) testing of user flows on Android Emulator / Real Device.

📌 Tech Stack

Node.js

WebdriverIO

Appium

Android Emulator / Real Android Device

Mocha (test framework)

Page Object Model (POM)

📂 Project Structure
MAM-automation-test
├── node_modules/ # Dependencies (auto-generated)
├── test/
│ ├── pageobjects/ # Page Object classes (UI elements & actions)
│ │ ├── page.js # Base Page (shared methods)
│ │ ├── welcome.page.js # Welcome screen
│ │ ├── login.page.js # Login screen
│ │ └── secure.page.js # Post-login screen
│ │
│ ├── specs/ # Test cases (test scenarios)
│ │ ├── login-navigation.spec.js # Navigate to Login screen
│ │ └── login.spec.js # Login flow
│ │
│ └── utils/ # Helper utilities (optional)
│
├── .env # Environment variables (NOT committed)
├── wdio.conf.js # WebdriverIO configuration
├── package.json # Project scripts & dependencies
├── package-lock.json
├── README.md # Project documentation
└── LICENSE

🧠 Architecture & Conventions
✅ Page Object Model (POM)

Each screen in the app has one Page Object

Page Objects contain:

UI selectors

Screen-specific actions

No assertions inside Page Objects

📁 Example:

test/pageobjects/login.page.js

✅ Spec Files (Test Cases)

Located in test/specs/

Each spec represents one user behavior or flow

Specs:

Call methods from Page Objects

Contain assertions / verifications

📁 Example:

test/specs/login-navigation.spec.js

❌ What NOT to do

❌ Do NOT put selectors directly inside spec files

❌ Do NOT assert logs / activities directly

❌ Do NOT mix test logic with UI locator logic

🧪 Test Coverage (Current)
Feature Spec File
Navigate to Login screen login-navigation.spec.js
Login flow login.spec.js
⚙️ Prerequisites

Make sure the following are installed:

Node.js (v16+ recommended)

Android Studio

Android SDK

Android Emulator (AVD)

Appium Server

ADB available in PATH

Verify emulator:

adb devices

🚀 How to Run Tests
1️⃣ Start Android Emulator

Launch an AVD from Android Studio
OR

emulator -avd <your_avd_name>

2️⃣ Start Appium Server
appium

(Default: http://localhost:4723)

3️⃣ Install dependencies
npm install

4️⃣ Run automation tests
npm run wdio

ℹ️ The test result will be shown in terminal output

🧪 Example Test Case
describe('Mam App - Login navigation', () => {
it('should navigate to Login screen when clicking "Đăng nhập ngay"', async () => {
await $('~login_now').click();
    await expect($('~login_screen')).toBeDisplayed();
});
});

📌 Important Notes

This app uses Single Activity architecture

Navigation is handled internally (not by Activity change)

Verification should be done via:

Unique UI elements

Accessibility IDs (contentDescription)

Avoid verifying activity names

🧩 Environment Variables

Create .env file if needed:

ANDROID_APP_PACKAGE=com.example.mam
ANDROID_APP_ACTIVITY=.MainActivity

⚠️ .env is ignored by Git.

🐞 Troubleshooting
App closes immediately after click

Emulator not fully booted

Missing runtime permission dialog

UiAutomator2 instrumentation crash

➡️ Restart emulator
➡️ Cold boot AVD
➡️ Check Appium logs

Either provide 'app' option or set noReset

App is not installed on emulator

Or noReset is not configured

➡️ Install app manually or set app path in wdio.conf.js

📈 Future Improvements

Add Allure / Spec reporter

Add permission auto-grant

Add CI pipeline (GitHub Actions)

Add screenshot on failure

👤 Author

Automation setup & structure by MAM QA / Automation Team
