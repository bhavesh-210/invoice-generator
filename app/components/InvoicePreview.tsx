import { formatDate, formatCurrency } from '@/lib/utils';

interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    gst: number;
    total: number;
}

interface InvoicePreviewProps {
    business: { name: string; email: string; phone: string };
    invoice: { number: string; date: string; dueDate: string };
    client: { name: string; email: string; address: string };
    items: InvoiceItem[];
    totals: { subtotal: number; totalGST: number; totalAmount: number };
}

export default function InvoicePreview({
    business,
    invoice,
    client,
    items,
    totals,
}: InvoicePreviewProps) {
    return (
        <div className="bg-white p-8 rounded border-2 border-gray-300 min-h-96">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-blue-600">
                        {business.name || 'Your Business'}
                    </h1>
                    <p className="text-gray-600">{business.email}</p>
                    <p className="text-gray-600">{business.phone}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold">
                        Invoice #{invoice.number}
                    </p>
                    <p className="text-sm">
                        Date: {formatDate(new Date(invoice.date))}
                    </p>
                    <p className="text-sm">
                        Due: {formatDate(new Date(invoice.dueDate))}
                    </p>
                </div>
            </div>

            <hr className="mb-6" />

            <div className="mb-6">
                <p className="font-semibold">Bill To:</p>
                <p className="font-bold">{client.name || 'Client Name'}</p>
                <p className="text-sm text-gray-600">{client.email}</p>
                <p className="text-sm text-gray-600">{client.address}</p>
            </div>

            <table className="w-full mb-6 text-sm">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="text-left p-2">Description</th>
                        <th className="text-right p-2">Qty</th>
                        <th className="text-right p-2">Rate</th>
                        <th className="text-right p-2">GST %</th>
                        <th className="text-right p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-2">{item.description || '-'}</td>
                            <td className="text-right p-2">{item.quantity}</td>
                            <td className="text-right p-2">
                                {formatCurrency(item.rate)}
                            </td>
                            <td className="text-right p-2">{item.gst}%</td>
                            <td className="text-right p-2">
                                {formatCurrency(item.total)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mb-6">
                <div className="w-64">
                    <div className="flex justify-between p-2 border-b">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(totals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                        <span>GST:</span>
                        <span>{formatCurrency(totals.totalGST)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-100 font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(totals.totalAmount)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
                <p>Thank you for your business!</p>
            </div>
        </div>
    );
}
