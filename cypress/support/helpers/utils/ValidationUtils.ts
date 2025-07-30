export class ValidationUtils {
  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate UK postcode
   */
  static isValidUKPostcode(postcode: string): boolean {
    const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
  }

  /**
   * Validate phone number (basic)
   */
  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Validate price range
   */
  static isValidPriceRange(min: number, max: number): boolean {
    return min >= 0 && max >= min;
  }
}