import { LoginPage } from '../support/page-objects/pages/LoginPage';
import { DataFactory } from '../support/helpers/data-generators/DataFactory';

describe('Login Functionality', { tags: ['@smoke', '@regression'] }, () => {
  let loginPage: LoginPage;
  let testUser: any;
  
  beforeEach(() => {
    loginPage = new LoginPage();
    testUser = DataFactory.generateUser();
    
    // Setup test data
    cy.task('queryDb', `INSERT INTO users (username, password, email) VALUES ('${testUser.username}', '${testUser.password}', '${testUser.email}')`);
    
    // Visit login page
    loginPage.visit();
    loginPage.waitForPageLoad();
  });
  
  afterEach(() => {
    // Cleanup test data
    cy.task('queryDb', `DELETE FROM users WHERE username = '${testUser.username}'`);
  });
  
  context('Valid Login Scenarios', () => {
    it('should login successfully with valid credentials', () => {
      // Arrange
      cy.intercept('POST', '**/auth/login').as('loginRequest');
      
      // Act
      loginPage.loginWith(testUser.username, testUser.password);
      
      // Assert
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
      });
      
      loginPage.shouldRedirectAfterLogin('/dashboard');
      cy.getCookie('auth-token').should('exist');
    });
    
    it('should login with remember me option', () => {
      // Act
      loginPage.loginWithRememberMe(testUser.username, testUser.password);
      
      // Assert
      loginPage.shouldRedirectAfterLogin('/dashboard');
      cy.getCookie('remember-token').should('exist');
      cy.getCookie('remember-token').should('have.property', 'expiry');
    });
    
    it('should handle login form submission with Enter key', () => {
      // Act
      loginPage.enterUsername(testUser.username);
      loginPage.enterPassword(testUser.password);
      cy.get('[data-cy="password"]').type('{enter}');
      
      // Assert
      loginPage.shouldRedirectAfterLogin('/dashboard');
    });
  });
  
  context('Invalid Login Scenarios', () => {
    it('should show error for invalid credentials', () => {
      // Act
      loginPage.login('invalid@example.com', 'wrongpassword');
      
      // Assert
      loginPage.shouldShowErrorMessage('Invalid username or password');
      loginPage.shouldBeOnLoginPage();
      cy.getCookie('auth-token').should('not.exist');
    });
    
    it('should show validation errors for empty fields', () => {
      // Act
      loginPage.clickLoginButton();
      
      // Assert
      loginPage.shouldShowUsernameError('Username is required');
      loginPage.shouldShowPasswordError('Password is required');
    });
    
    it('should show error for invalid email format', () => {
      // Act
      loginPage.enterUsername('invalid-email');
      loginPage.enterPassword(testUser.password);
      loginPage.clickLoginButton();
      
      // Assert
      loginPage.shouldShowUsernameError('Please enter a valid email address');
    });
  });
  
  context('Password Visibility', () => {
    it('should toggle password visibility', () => {
      // Arrange
      const password = 'TestPassword123!';
      loginPage.enterPassword(password);
      
      // Act & Assert - Password should be hidden initially
      cy.get('[data-cy="password"]').should('have.attr', 'type', 'password');
      
      // Act - Toggle visibility
      loginPage.togglePasswordVisibility();
      
      // Assert - Password should be visible
      cy.get('[data-cy="password"]').should('have.attr', 'type', 'text');
      cy.get('[data-cy="password"]').should('have.value', password);
      
      // Act - Toggle back
      loginPage.togglePasswordVisibility();
      
      // Assert - Password should be hidden again
      cy.get('[data-cy="password"]').should('have.attr', 'type', 'password');
    });
  });
  
  context('Navigation Links', () => {
    it('should navigate to forgot password page', () => {
      // Act
      loginPage.clickForgotPassword();
      
      // Assert
      cy.url().should('include', '/forgot-password');
    });
    
    it('should navigate to sign up page', () => {
      // Act
      loginPage.clickSignUp();
      
      // Assert
      cy.url().should('include', '/signup');
    });
  });
  
  context('Loading States', () => {
    it('should show loading state during login', () => {
      // Arrange - Delay the login response
      cy.intercept('POST', '**/auth/login', {
        delay: 2000,
        statusCode: 200,
        body: { token: 'fake-token' }
      }).as('slowLogin');
      
      // Act
      loginPage.enterUsername(testUser.username);
      loginPage.enterPassword(testUser.password);
      loginPage.clickLoginButton();
      
      // Assert
      loginPage.shouldShowLoadingState();
      cy.get('[data-cy="login-button"]').should('be.disabled');
      
      // Wait for response
      cy.wait('@slowLogin');
      loginPage.shouldHideLoadingState();
    });
  });
  
  context('Accessibility', () => {
    it('should be accessible', () => {
      // Test keyboard navigation
      cy.get('body').tab().should('have.focus');
      cy.focused().tab().should('have.attr', 'data-cy', 'username');
      cy.focused().tab().should('have.attr', 'data-cy', 'password');
      
      // Test accessibility with axe
      loginPage.checkLoginFormAccessibility();
    });
    
    it('should have proper ARIA labels', () => {
      cy.get('[data-cy="username"]').should('have.attr', 'aria-label', 'Username');
      cy.get('[data-cy="password"]').should('have.attr', 'aria-label', 'Password');
      cy.get('[data-cy="login-button"]').should('have.attr', 'aria-label', 'Login');
    });
  });
  
  context('Responsive Design', () => {
    it('should adapt to mobile viewport', () => {
      // Act
      cy.setMobileViewport();
      loginPage.visit();
      
      // Assert
      loginPage.shouldAdaptToMobile();
    });
    
    it('should work on tablet viewport', () => {
      // Act
      cy.setTabletViewport();
      loginPage.visit();
      
      // Assert
      cy.get('.tablet-layout').should('be.visible');
    });
  });
  
  context('Security', () => {
    it('should not store password in local storage', () => {
      // Act
      loginPage.login(testUser.username, testUser.password);
      
      // Assert
      cy.window().then((win) => {
        const localStorage = win.localStorage;
        const sessionStorage = win.sessionStorage;
        
        Object.keys(localStorage).forEach(key => {
          expect(localStorage.getItem(key)).to.not.include(testUser.password);
        });
        
        Object.keys(sessionStorage).forEach(key => {
          expect(sessionStorage.getItem(key)).to.not.include(testUser.password);
        });
      });
    });
    
    it('should handle CSRF protection', () => {
      // Check for CSRF token
      cy.get('[name="_token"]').should('exist');
      cy.get('[name="_token"]').should('have.attr', 'value').and('not.be.empty');
    });
  });
  
  context('Social Login', () => {
    it('should initiate Google login', () => {
      // Arrange
      cy.intercept('GET', '**/auth/google*').as('googleAuth');
      
      // Act
      loginPage.loginWithGoogle();
      
      // Assert
      cy.wait('@googleAuth');
      // Note: In a real test, you might mock the OAuth flow
    });
  });
  
  context('Performance', () => {
    it('should load login page quickly', () => {
      // Measure page load time
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        expect(loadTime).to.be.lessThan(3000); // 3 seconds
      });
    });
  });
  
  context('Visual Testing', () => {
    it('should match visual snapshot', () => {
      // Take visual snapshot
      loginPage.compareVisual('login-page');
    });
    
    it('should match error state snapshot', () => {
      // Act
      loginPage.login('invalid@example.com', 'wrongpassword');
      
      // Assert
      loginPage.compareVisual('login-page-error');
    });
  });
});