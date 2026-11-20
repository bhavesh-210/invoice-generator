import InvoiceDocument from './InvoiceDocument';

interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    gst: number;
    total: number;
}

interface InvoicePreviewProps {
    business: { name: string; email: string; phone: string; address?: string; gstin?: string };
    invoice: { number: string; date: string; dueDate: string };
    client: { name: string; email: string; address: string };
    items: InvoiceItem[];
    totals: { subtotal: number; totalGST: number; totalAmount: number };
}

export default function InvoicePreview({ business, invoice, client, items, totals }: InvoicePreviewProps) {
    return (
        <div style={{ width: '100%', overflowX: 'auto', background: '#e8edf3', padding: '16px' }}>
            <div style={{ width: 794, transformOrigin: 'top left' }}>
                <InvoiceDocument invoice={{
                    businessName: business.name,
                    businessEmail: business.email,
                    businessPhone: business.phone,
                    businessAddress: business.address,
                    businessGstin: business.gstin,
                    invoiceNumber: invoice.number,
                    invoiceDate: invoice.date,
                    dueDate: invoice.dueDate,
                    clientName: client.name,
                    clientEmail: client.email,
                    clientAddress: client.address,
                    items,
                    ...totals,
                }} />
            </div>
        </div>
    );
}
