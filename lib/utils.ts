// Utility functions

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function generateInvoiceNumber(): string {
  return `INV-${Date.now()}`;
}

export function calculateTax(amount: number, taxRate: number = 0.1): number {
  return amount * taxRate;
}
