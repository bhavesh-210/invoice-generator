'use client';

import React from 'react';

interface InvoicePreviewProps {
  invoice?: any;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  if (!invoice) {
    return <div>No invoice to preview</div>;
  }

  return (
    <div className="invoice-preview">
      <h2>Invoice Preview</h2>
      {/* TODO: Display invoice details */}
    </div>
  );
}
