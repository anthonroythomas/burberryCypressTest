export class StringUtils {
  /**
   * Extract numeric value from price string
   */
  static extractPrice(priceString: string): number {
    const match = priceString.match(/[\d,]+\.?\d*/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
  }

  /**
   * Format price for comparison
   */
  static formatPrice(price: number, currency: string = '£'): string {
    return `${currency}${price.toFixed(2)}`;
  }

  /**
   * Clean and normalize text
   */
  static normalizeText(text: string): string {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}