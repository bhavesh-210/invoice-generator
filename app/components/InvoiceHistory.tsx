'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/utils';
import PDFExport from './PDFExport';

interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    gst: number;
    total: number;
}

interface Invoice {
    _id: string;
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    items: InvoiceItem[];
    subtotal: number;
    totalGST: number;
    totalAmount: number;
}

export default function InvoiceHistory() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchInvoices() {
        try {
            const response = await fetch('/api/invoices');
            const data = await response.json();
            const nextInvoices = Array.isArray(data)
                ? data
                : Array.isArray(data?.invoices)
                  ? data.invoices
                  : [];

            setInvoices(nextInvoices);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            void fetchInvoices();
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this invoice?')) return;

        try {
            const response = await fetch(`/api/invoices/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setInvoices(invoices.filter((inv) => inv._id !== id));
            }
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading invoices...</div>;
    }

    if (invoices.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">
                    No invoices yet. Create one to get started!
                </p>
                <Link
                    href="/"
                    className="text-blue-600 hover:underline mt-4 inline-block">
                    Create Invoice
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="text-left p-4">Invoice #</th>
                        <th className="text-left p-4">Client</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Due Date</th>
                        <th className="text-right p-4">Amount</th>
                        <th className="text-center p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr
                            key={invoice._id}
                            className="border-b hover:bg-gray-50">
                            <td className="p-4 font-semibold">
                                {invoice.invoiceNumber}
                            </td>
                            <td className="p-4">{invoice.clientName}</td>
                            <td className="p-4">
                                {formatDate(new Date(invoice.invoiceDate))}
                            </td>
                            <td className="p-4">
                                {formatDate(new Date(invoice.dueDate))}
                            </td>
                            <td className="p-4 text-right font-semibold">
                                {formatCurrency(invoice.totalAmount)}
                            </td>
                             <td className="p-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Link
                                        href={`/?edit=${invoice._id}`}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 font-semibold transition-colors">
                                        Edit
                                    </Link>
                                    <PDFExport
                                        invoice={invoice}
                                        className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 font-semibold transition-colors"
                                    />
                                    <button
                                        onClick={() => handleDelete(invoice._id)}
                                        className="bg-rose-500 text-white px-3 py-1 rounded text-sm hover:bg-rose-600 font-semibold transition-colors">
                                        Delete
                                    </button>
                                </div>
                             </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
