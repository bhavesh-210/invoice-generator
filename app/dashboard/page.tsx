'use client';

import React from 'react';
import InvoiceHistory from '@/app/components/InvoiceHistory';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <InvoiceHistory />
    </div>
  );
}
