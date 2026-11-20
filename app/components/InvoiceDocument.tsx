import { formatCurrency, formatDate } from '@/lib/utils';

export interface InvoiceDocumentData {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress?: string;
    businessGstin?: string;
    invoiceNumber: string;
    invoiceDate: string | Date;
    dueDate: string | Date;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    items: {
        description: string;
        quantity: number;
        rate: number;
        gst: number;
        total: number;
    }[];
    subtotal: number;
    totalGST: number;
    totalAmount: number;
}

const ink = '#172033';
const muted = '#64748b';
const line = '#dbe2ea';
const money = (value: number) => formatCurrency(Number.isFinite(value) ? value : 0);
const date = (value: string | Date) => value ? formatDate(value) : '—';

export default function InvoiceDocument({ invoice }: { invoice: InvoiceDocumentData }) {
    return (
        <article style={{ width: '794px', minHeight: '1123px', padding: '58px 56px', background: '#fff', color: ink, fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: 1.5 }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, paddingBottom: 28, borderBottom: `2px solid ${ink}` }}>
                <div style={{ maxWidth: 410, overflowWrap: 'anywhere' }}>
                    <div style={{ fontSize: 23, fontWeight: 700, letterSpacing: '-.5px' }}>{invoice.businessName || 'Your business name'}</div>
                    {invoice.businessAddress && <div style={{ marginTop: 8, whiteSpace: 'pre-line', color: muted }}>{invoice.businessAddress}</div>}
                    {invoice.businessEmail && <div style={{ color: muted }}>{invoice.businessEmail}</div>}
                    {invoice.businessPhone && <div style={{ color: muted }}>{invoice.businessPhone}</div>}
                    {invoice.businessGstin && <div style={{ marginTop: 6, color: muted }}>GSTIN: {invoice.businessGstin}</div>}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ color: '#2563eb', fontSize: 29, letterSpacing: '2px', fontWeight: 700 }}>INVOICE</div>
                    <div style={{ marginTop: 8, fontWeight: 700 }}>{invoice.invoiceNumber || 'Invoice number'}</div>
                </div>
            </header>

            <section style={{ display: 'flex', justifyContent: 'space-between', gap: 32, padding: '30px 0 35px' }}>
                <div style={{ width: '55%', overflowWrap: 'anywhere' }}>
                    <div style={{ textTransform: 'uppercase', letterSpacing: '1.5px', color: muted, fontSize: 10, fontWeight: 700, marginBottom: 8 }}>Bill to</div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{invoice.clientName || 'Client name'}</div>
                    {invoice.clientAddress && <div style={{ whiteSpace: 'pre-line', marginTop: 5 }}>{invoice.clientAddress}</div>}
                    {invoice.clientEmail && <div style={{ marginTop: 5, color: muted }}>{invoice.clientEmail}</div>}
                </div>
                <div style={{ minWidth: 190 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}><span style={{ color: muted }}>Issue date</span><strong>{date(invoice.invoiceDate)}</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}><span style={{ color: muted }}>Due date</span><strong>{date(invoice.dueDate)}</strong></div>
                </div>
            </section>

            <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
                <thead>
                    <tr style={{ background: '#f1f5f9', color: ink, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
                        <th style={{ padding: '11px 9px', textAlign: 'left', width: '42%' }}>Description</th>
                        <th style={{ padding: '11px 6px', textAlign: 'right', width: '9%' }}>Qty</th>
                        <th style={{ padding: '11px 6px', textAlign: 'right', width: '17%' }}>Rate</th>
                        <th style={{ padding: '11px 6px', textAlign: 'right', width: '11%' }}>GST</th>
                        <th style={{ padding: '11px 9px', textAlign: 'right', width: '21%' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item, index) => (
                        <tr className="invoice-line" key={index} style={{ borderBottom: `1px solid ${line}`, verticalAlign: 'top' }}>
                            <td style={{ padding: '13px 9px', overflowWrap: 'anywhere', fontWeight: 600 }}>{item.description || 'Item'}</td>
                            <td style={{ padding: '13px 6px', textAlign: 'right' }}>{item.quantity}</td>
                            <td style={{ padding: '13px 6px', textAlign: 'right' }}>{money(item.rate)}</td>
                            <td style={{ padding: '13px 6px', textAlign: 'right' }}>{item.gst}%</td>
                            <td style={{ padding: '13px 9px', textAlign: 'right', fontWeight: 600 }}>{money(item.total)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <section style={{ marginLeft: 'auto', width: 280, paddingTop: 26 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: muted }}><span>Subtotal</span><span style={{ color: ink }}>{money(invoice.subtotal)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: muted }}><span>GST</span><span style={{ color: ink }}>{money(invoice.totalGST)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 14px', marginTop: 10, background: ink, color: '#fff', fontWeight: 700, fontSize: 16 }}><span>Total due</span><span>{money(invoice.totalAmount)}</span></div>
            </section>
            <footer style={{ marginTop: 72, borderTop: `1px solid ${line}`, paddingTop: 16, color: muted, fontSize: 11 }}>
                Thank you for your business.
            </footer>
        </article>
    );
}
