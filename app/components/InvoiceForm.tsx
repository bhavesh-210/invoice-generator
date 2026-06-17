'use client';

import React, { useState } from 'react';

interface InvoiceFormProps {
  onSubmit?: (data: any) => void;
}

export default function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="clientName">Client Name:</label>
        <input
          id="clientName"
          name="clientName"
          type="text"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Invoice</button>
    </form>
  );
}
