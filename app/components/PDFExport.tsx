'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { formatDate, formatCurrency } from '@/lib/utils';

interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    gst: number;
    total: number;
}

interface Invoice {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    invoiceNumber: string;
    invoiceDate: string | Date;
    dueDate: string | Date;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    items: InvoiceItem[];
    subtotal: number;
    totalGST: number;
    totalAmount: number;
}

interface PDFExportProps {
    invoice: Invoice;
}

export default function PDFExport({ invoice }: PDFExportProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!contentRef.current) return;

        try {
            const canvas = await html2canvas(contentRef.current, { scale: 2 });
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);
            pdf.save(`Invoice-${invoice.invoiceNumber}.pdf`);
        } catch (error) {
            console.error(error);
            alert('Error generating PDF');
        }
    };

    return (
        <>
            <div ref={contentRef} style={{ display: 'none' }}>
                <InvoicePDFTemplate invoice={invoice} />
            </div>
            <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700">
                Download PDF
            </button>
        </>
    );
}

function InvoicePDFTemplate({ invoice }: { invoice: Invoice }) {
    return (
        <div style={{ padding: '40px', fontSize: '12px', fontFamily: 'Arial' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '28px', color: '#2563eb', margin: 0 }}>
                    {invoice.businessName}
                </h1>
                <p>{invoice.businessEmail}</p>
                <p>{invoice.businessPhone}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Invoice #:</strong>{' '}
                                {invoice.invoiceNumber}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <strong>Date:</strong>{' '}
                                {formatDate(new Date(invoice.invoiceDate))}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Bill To:</strong>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <strong>Due Date:</strong>{' '}
                                {formatDate(new Date(invoice.dueDate))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <strong>{invoice.clientName}</strong>
                <p>{invoice.clientEmail}</p>
                <p>{invoice.clientAddress}</p>
            </div>

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginBottom: '20px',
                }}>
                <thead>
                    <tr
                        style={{
                            backgroundColor: '#f3f4f6',
                            borderBottom: '2px solid #000',
                        }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>
                            Description
                        </th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>
                            Qty
                        </th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>
                            Rate
                        </th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>
                            GST %
                        </th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item: InvoiceItem, idx: number) => (
                        <tr
                            key={idx}
                            style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px' }}>
                                {item.description}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                                {item.quantity}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                                {formatCurrency(item.rate)}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                                {item.gst}%
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                                {formatCurrency(item.total)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Subtotal:</strong>{' '}
                    {formatCurrency(invoice.subtotal)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>GST:</strong> {formatCurrency(invoice.totalGST)}
                </div>
                <div
                    style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        padding: '10px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                    }}>
                    Total: {formatCurrency(invoice.totalAmount)}
                </div>
            </div>

            <div
                style={{
                    marginTop: '40px',
                    textAlign: 'center',
                    fontSize: '10px',
                    color: '#666',
                }}>
                Thank you for your business!
            </div>
        </div>
    );
}
