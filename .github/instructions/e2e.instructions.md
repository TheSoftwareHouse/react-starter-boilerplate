# E2E Testing Instructions

## Overview

This project uses **Playwright** for end-to-end testing with a Page Object Model pattern. Always write E2E tests for critical user flows and new features.

## Testing Structure

### 1. Test Organization

```
e2e/
├── package.json              # E2E dependencies
├── playwright.config.ts      # Playwright configuration
├── actions/                  # Page actions and helpers
│   ├── homePage.ts          # Home page actions
│   ├── navigation.ts        # Navigation helpers
│   └── userManagement.ts    # User-related actions
└── tests/                   # Test files
    ├── home.test.ts         # Home page tests
    ├── userFlow.test.ts     # User management flow
    └── auth.test.ts         # Authentication tests
```

### 2. Page Actions Pattern

**Page Action Structure:**
```typescript
// e2e/actions/homePage.ts
import { Page, expect } from '@playwright/test';

export class HomePageActions {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectPageTitle() {
    await expect(this.page).toHaveTitle(/React Starter/);
  }

  async expectWelcomeMessage() {
    await expect(this.page.locator('h1')).toContainText('Welcome');
  }

  async clickAboutLink() {
    await this.page.click('text=About');
    await this.page.waitForURL('**/about');
  }

  async navigateToUsers() {
    await this.page.click('text=Users');
    await this.page.waitForURL('**/users');
  }

  // Form interactions
  async fillContactForm(data: ContactFormData) {
    await this.page.fill('[data-testid="name-input"]', data.name);
    await this.page.fill('[data-testid="email-input"]', data.email);
    await this.page.fill('[data-testid="message-input"]', data.message);
  }

  async submitContactForm() {
    await this.page.click('[data-testid="submit-button"]');
  }

  async expectSuccessMessage() {
    await expect(this.page.locator('[data-testid="success-message"]')).toBeVisible();
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
```

**Navigation Helper:**
```typescript
// e2e/actions/navigation.ts
import { Page, expect } from '@playwright/test';

export class NavigationActions {
  constructor(private page: Page) {}

  async goToHome() {
    await this.page.click('text=Home');
    await this.page.waitForURL('/');
  }

  async goToAbout() {
    await this.page.click('text=About');
    await this.page.waitForURL('**/about');
  }

  async goToUsers() {
    await this.page.click('text=Users');
    await this.page.waitForURL('**/users');
  }

  async expectPageUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async expectNavigationVisible() {
    await expect(this.page.locator('[data-testid="main-navigation"]')).toBeVisible();
  }
}
```

**User Management Actions:**
```typescript
// e2e/actions/userManagement.ts
import { Page, expect } from '@playwright/test';

export class UserManagementActions {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/users');
  }

  async expectUsersListVisible() {
    await expect(this.page.locator('[data-testid="users-list"]')).toBeVisible();
  }

  async expectUserCard(userName: string) {
    await expect(this.page.locator(`[data-testid="user-card-${userName}"]`)).toBeVisible();
  }

  async clickUser(userName: string) {
    await this.page.click(`[data-testid="user-card-${userName}"]`);
  }

  async expectUserDetailPage(userId: string) {
    await this.page.waitForURL(`**/users/${userId}`);
    await expect(this.page.locator('[data-testid="user-details"]')).toBeVisible();
  }

  async expectLoadingState() {
    await expect(this.page.locator('[data-testid="loading-spinner"]')).toBeVisible();
  }

  async expectNoLoadingState() {
    await expect(this.page.locator('[data-testid="loading-spinner"]')).not.toBeVisible();
  }

  async expectErrorMessage() {
    await expect(this.page.locator('[data-testid="error-message"]')).toBeVisible();
  }
}
```

### 3. Test Implementation

**Basic Page Test:**
```typescript
// e2e/tests/home.test.ts
import { test, expect } from '@playwright/test';
import { HomePageActions } from '../actions/homePage';
import { NavigationActions } from '../actions/navigation';

test.describe('Home Page', () => {
  let homePage: HomePageActions;
  let navigation: NavigationActions;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePageActions(page);
    navigation = new NavigationActions(page);
    await homePage.goto();
  });

  test('should display page title', async () => {
    await homePage.expectPageTitle();
  });

  test('should display welcome message', async () => {
    await homePage.expectWelcomeMessage();
  });

  test('should navigate to about page', async () => {
    await homePage.clickAboutLink();
    await navigation.expectPageUrl('/about');
  });

  test('should submit contact form', async () => {
    const contactData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello from E2E test',
    };

    await homePage.fillContactForm(contactData);
    await homePage.submitContactForm();
    await homePage.expectSuccessMessage();
  });
});
```

**User Flow Test:**
```typescript
// e2e/tests/userFlow.test.ts
import { test, expect } from '@playwright/test';
import { UserManagementActions } from '../actions/userManagement';
import { NavigationActions } from '../actions/navigation';

test.describe('User Management Flow', () => {
  let userManagement: UserManagementActions;
  let navigation: NavigationActions;

  test.beforeEach(async ({ page }) => {
    userManagement = new UserManagementActions(page);
    navigation = new NavigationActions(page);
  });

  test('should display users list', async () => {
    await userManagement.goto();
    await userManagement.expectUsersListVisible();
  });

  test('should show loading state then users', async () => {
    await userManagement.goto();
    
    // Check loading state appears briefly
    await userManagement.expectLoadingState();
    
    // Wait for loading to complete
    await userManagement.expectNoLoadingState();
    
    // Check users are displayed
    await userManagement.expectUsersListVisible();
  });

  test('should navigate to user detail page', async () => {
    await userManagement.goto();
    await userManagement.expectNoLoadingState();
    
    // Click on first user
    await userManagement.clickUser('john-doe');
    
    // Verify navigation to detail page
    await userManagement.expectUserDetailPage('user-123');
  });

  test('should handle empty users list', async () => {
    // Mock empty response or test with empty data
    await userManagement.goto();
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
  });
});
```

### 4. Authentication Flow

```typescript
// e2e/actions/auth.ts
import { Page, expect } from '@playwright/test';

export class AuthActions {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email-input"]', email);
    await this.page.fill('[data-testid="password-input"]', password);
    await this.page.click('[data-testid="login-button"]');
  }

  async expectLoginSuccess() {
    await this.page.waitForURL('/dashboard');
    await expect(this.page.locator('[data-testid="user-menu"]')).toBeVisible();
  }

  async expectLoginError() {
    await expect(this.page.locator('[data-testid="login-error"]')).toBeVisible();
  }

  async logout() {
    await this.page.click('[data-testid="user-menu"]');
    await this.page.click('[data-testid="logout-button"]');
    await this.page.waitForURL('/');
  }

  async expectLoggedOut() {
    await expect(this.page.locator('[data-testid="login-button"]')).toBeVisible();
  }
}

// e2e/tests/auth.test.ts
import { test } from '@playwright/test';
import { AuthActions } from '../actions/auth';

test.describe('Authentication', () => {
  let auth: AuthActions;

  test.beforeEach(async ({ page }) => {
    auth = new AuthActions(page);
  });

  test('should login with valid credentials', async () => {
    await auth.goto();
    await auth.login('user@example.com', 'password123');
    await auth.expectLoginSuccess();
  });

  test('should show error with invalid credentials', async () => {
    await auth.goto();
    await auth.login('invalid@example.com', 'wrongpassword');
    await auth.expectLoginError();
  });

  test('should logout successfully', async () => {
    // Login first
    await auth.goto();
    await auth.login('user@example.com', 'password123');
    await auth.expectLoginSuccess();
    
    // Then logout
    await auth.logout();
    await auth.expectLoggedOut();
  });
});
```

## Test Data Management

### 1. Test Data Factories

```typescript
// e2e/utils/testData.ts
export const createTestUser = (overrides: Partial<TestUser> = {}): TestUser => ({
  id: 'test-user-' + Date.now(),
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  ...overrides,
});

export const createTestProduct = (overrides: Partial<TestProduct> = {}): TestProduct => ({
  id: 'test-product-' + Date.now(),
  name: 'Test Product',
  price: 99.99,
  description: 'A test product',
  ...overrides,
});

export interface TestUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface TestProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

### 2. Database Setup/Teardown

```typescript
// e2e/utils/database.ts
import { Page } from '@playwright/test';

export class DatabaseUtils {
  constructor(private page: Page) {}

  async seedTestData() {
    // Mock API responses or seed test database
    await this.page.route('**/api/users', async route => {
      const users = [
        createTestUser({ name: 'John Doe', email: 'john@example.com' }),
        createTestUser({ name: 'Jane Smith', email: 'jane@example.com' }),
      ];
      await route.fulfill({ json: { users } });
    });
  }

  async cleanupTestData() {
    // Cleanup any test data if needed
    await this.page.unroute('**/api/users');
  }
}
```

## Configuration

### 1. Playwright Configuration

```typescript
// e2e/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 2. Test Environment Setup

```typescript
// e2e/utils/setup.ts
import { test as base } from '@playwright/test';
import { HomePageActions } from '../actions/homePage';
import { NavigationActions } from '../actions/navigation';
import { UserManagementActions } from '../actions/userManagement';
import { DatabaseUtils } from '../utils/database';

type TestFixtures = {
  homePage: HomePageActions;
  navigation: NavigationActions;
  userManagement: UserManagementActions;
  database: DatabaseUtils;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePageActions(page));
  },
  navigation: async ({ page }, use) => {
    await use(new NavigationActions(page));
  },
  userManagement: async ({ page }, use) => {
    await use(new UserManagementActions(page));
  },
  database: async ({ page }, use) => {
    const db = new DatabaseUtils(page);
    await db.seedTestData();
    await use(db);
    await db.cleanupTestData();
  },
});

export { expect } from '@playwright/test';
```

## Best Practices

### 1. Test Design

✅ **Do:**
- Use Page Object Model pattern
- Write tests for critical user flows
- Use data-testid for stable selectors
- Test happy paths and error scenarios
- Mock external dependencies
- Use descriptive test names

❌ **Don't:**
- Rely on CSS selectors or text that might change
- Write tests that depend on each other
- Test implementation details
- Skip error scenarios
- Create flaky tests with timing issues

### 2. Selectors

✅ **Preferred selector priority:**
1. `data-testid` attributes
2. Role-based selectors (`getByRole`)
3. Text content (`text=`)
4. Accessible labels
5. CSS selectors (as last resort)

```typescript
// Good selectors
await page.click('[data-testid="submit-button"]');
await page.getByRole('button', { name: 'Submit' });
await page.getByLabel('Email address');

// Avoid
await page.click('.btn-primary'); // CSS classes can change
await page.click('button:nth-child(2)'); // Position-based selectors are fragile
```

### 3. Waiting Strategies

```typescript
// Wait for navigation
await page.waitForURL('**/users');

// Wait for elements
await expect(page.locator('[data-testid="user-list"]')).toBeVisible();

// Wait for API responses
await page.waitForResponse('**/api/users');

// Wait for loading to complete
await expect(page.locator('[data-testid="loading"]')).not.toBeVisible();
```

### 4. Error Handling

```typescript
test('should handle network errors gracefully', async ({ page }) => {
  // Simulate network failure
  await page.route('**/api/users', route => route.abort());
  
  await page.goto('/users');
  
  // Verify error state is displayed
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
});
```

## Common Patterns

### 1. Form Testing

```typescript
test('should validate form inputs', async ({ homePage }) => {
  await homePage.goto();
  
  // Test required field validation
  await homePage.submitContactForm();
  await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
  
  // Test email validation
  await page.fill('[data-testid="email-input"]', 'invalid-email');
  await homePage.submitContactForm();
  await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  
  // Test successful submission
  await homePage.fillContactForm({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Test message',
  });
  await homePage.submitContactForm();
  await homePage.expectSuccessMessage();
});
```

### 2. Mobile Testing

```typescript
test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  
  test('should open mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Mobile menu should be hidden initially
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
    
    // Click hamburger menu
    await page.click('[data-testid="menu-toggle"]');
    
    // Menu should be visible
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });
});
```

### 3. Visual Testing

```typescript
test('should match visual snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('should match component snapshot', async ({ page }) => {
  await page.goto('/users');
  await expect(page.locator('[data-testid="user-card"]').first()).toHaveScreenshot('user-card.png');
});
```

## Running Tests

```bash
# Run all E2E tests
npm run e2e:ci

# Run tests in interactive mode
npm run e2e:open

# Run specific test file
npx playwright test home.test.ts

# Run tests in specific browser
npx playwright test --project=firefox

# Debug tests
npx playwright test --debug

# Generate test report
npx playwright show-report
```