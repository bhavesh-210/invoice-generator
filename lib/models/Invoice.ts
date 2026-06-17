export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id?: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
