'use client';

import { useState } from 'react';
import { calculateInvoiceTotals, generateInvoiceNumber } from '@/lib/utils';
import InvoicePreview from './InvoicePreview';
import PDFExport from './PDFExport';

interface Item {
    description: string;
    quantity: number;
    rate: number;
    gst: number;
    total: number;
}

export default function InvoiceForm() {
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
    const [invoiceDate, setInvoiceDate] = useState(
        new Date().toISOString().split('T')[0],
    );
    const [dueDate, setDueDate] = useState('');

    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientAddress, setClientAddress] = useState('');

    const [items, setItems] = useState<Item[]>([
        { description: '', quantity: 1, rate: 0, gst: 18, total: 0 },
    ]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const totals = calculateInvoiceTotals(items);

    const handleAddItem = () => {
        setItems([
            ...items,
            { description: '', quantity: 1, rate: 0, gst: 18, total: 0 },
        ]);
    };

    const handleRemoveItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (
        index: number,
        field: keyof Pick<Item, 'description' | 'quantity' | 'rate' | 'gst'>,
        value: string | number,
    ) => {
        const newItems = [...items];

        if (field === 'description') {
            newItems[index].description = String(value);
        }

        if (field === 'quantity') {
            newItems[index].quantity = Number(value);
        }

        if (field === 'rate') {
            newItems[index].rate = Number(value);
        }

        if (field === 'gst') {
            newItems[index].gst = Number(value);
        }

        if (field === 'quantity' || field === 'rate' || field === 'gst') {
            const quantity = newItems[index].quantity;
            const rate = newItems[index].rate;
            const gst = newItems[index].gst;
            const subtotal = quantity * rate;
            const gstAmount = (subtotal * gst) / 100;
            newItems[index].total = subtotal + gstAmount;
        }

        setItems(newItems);
    };

    const handleSaveInvoice = async () => {
        if (
            !businessName ||
            !businessEmail ||
            !clientName ||
            !dueDate ||
            items.length === 0
        ) {
            setMessage('Please fill all required fields');
            return;
        }

        setLoading(true);
        try {
            const invoiceData = {
                businessName,
                businessEmail,
                businessPhone,
                invoiceNumber,
                invoiceDate: new Date(invoiceDate),
                dueDate: new Date(dueDate),
                clientName,
                clientEmail,
                clientAddress,
                items,
                subtotal: totals.subtotal,
                totalGST: totals.totalGST,
                totalAmount: totals.totalAmount,
            };

            const response = await fetch('/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invoiceData),
            });

            if (response.ok) {
                setMessage('✓ Invoice saved successfully!');
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                const errorData = await response.json().catch(() => ({}));
                setMessage(errorData.error || 'Error saving invoice');
            }
        } catch (error) {
            console.error('Error saving invoice:', error);
            const errMsg = error instanceof Error ? error.message : 'Error saving invoice';
            setMessage(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                    Create Invoice
                </h2>

                {message && (
                    <div
                        className={`mb-4 rounded-lg p-3 text-sm font-medium ${message.includes('✓') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {message}
                    </div>
                )}

                <div className="mb-6">
                    <h3 className="mb-4 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">
                        Your Business
                    </h3>
                    <input
                        type="text"
                        placeholder="Business Name *"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="mb-3 w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                        type="email"
                        placeholder="Email *"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                        className="mb-3 w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div className="mb-6">
                    <h3 className="mb-4 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">
                        Invoice Details
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <input
                            type="text"
                            placeholder="Invoice #"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            className="rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <input
                            type="date"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            className="rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <input
                            type="date"
                            placeholder="Due Date *"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="mb-4 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">
                        Client Details
                    </h3>
                    <input
                        type="text"
                        placeholder="Client Name *"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="mb-3 w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                        type="email"
                        placeholder="Client Email *"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="mb-3 w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <textarea
                        placeholder="Client Address"
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        rows={3}
                    />
                </div>

                <div className="mb-6">
                    <h3 className="mb-4 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">
                        Items
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="grid items-end gap-2 md:grid-cols-5">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className="rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            'quantity',
                                            parseFloat(e.target.value),
                                        )
                                    }
                                    className="rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                                <input
                                    type="number"
                                    placeholder="Rate"
                                    value={item.rate}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            'rate',
                                            parseFloat(e.target.value),
                                        )
                                    }
                                    className="rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                                <input
                                    type="number"
                                    placeholder="GST %"
                                    value={item.gst}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            'gst',
                                            parseFloat(e.target.value),
                                        )
                                    }
                                    className="rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                                <button
                                    onClick={() => handleRemoveItem(index)}
                                    className="rounded-md bg-red-500 px-2 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleAddItem}
                        className="mt-3 rounded-md bg-emerald-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-600">
                        + Add Item
                    </button>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleSaveInvoice}
                        disabled={loading}
                        className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                        {loading ? 'Saving...' : 'Save Invoice'}
                    </button>
                    <PDFExport
                        invoice={{
                            businessName,
                            businessEmail,
                            businessPhone,
                            invoiceNumber,
                            invoiceDate,
                            dueDate,
                            clientName,
                            clientEmail,
                            clientAddress,
                            items,
                            ...totals,
                        }}
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                    Preview
                </h2>
                <InvoicePreview
                    business={{
                        name: businessName,
                        email: businessEmail,
                        phone: businessPhone,
                    }}
                    invoice={{
                        number: invoiceNumber,
                        date: invoiceDate,
                        dueDate: dueDate,
                    }}
                    client={{
                        name: clientName,
                        email: clientEmail,
                        address: clientAddress,
                    }}
                    items={items}
                    totals={totals}
                />
            </div>
        </div>
    );
}
