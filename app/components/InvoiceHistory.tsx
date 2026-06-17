'use client';

import React, { useEffect, useState } from 'react';

interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  date: string;
}

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch invoices from API
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="invoice-history">
      <h2>Invoice History</h2>
      {invoices.length === 0 ? (
        <p>No invoices yet</p>
      ) : (
        <ul>
          {invoices.map(invoice => (
            <li key={invoice.id}>{invoice.clientName} - ${invoice.amount}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
