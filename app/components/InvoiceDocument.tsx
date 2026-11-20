import type { CSSProperties } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';

export interface InvoiceDocumentData {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress?: string;
    businessGstin?: string;
    businessFssai?: string;
    placeOfSupply?: string;
    orderReference?: string;
    clientGstin?: string;
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

const border = '1px solid #202020';
const formatMoney = (amount: number) => formatCurrency(Number.isFinite(amount) ? amount : 0);
const date = (value: string | Date) => value ? formatDate(value) : '—';
const cell: CSSProperties = { padding: '7px 6px', borderRight: border, verticalAlign: 'top' };
const heading: CSSProperties = { ...cell, borderBottom: border, fontSize: 11, fontWeight: 700 };
const right: CSSProperties = { textAlign: 'right' };
const label: CSSProperties = { fontWeight: 700, whiteSpace: 'nowrap', paddingRight: 8 };

function numberInWords(value: number) {
    if (!Number.isFinite(value) || value < 0) return '';
    const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const underThousand = (n: number): string => {
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
        return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + underThousand(n % 100) : '');
    };
    let rupees = Math.floor(Math.round(value * 100) / 100);
    const paise = Math.round(value * 100) % 100;
    if (rupees > 999999999) return '';
    const parts: string[] = [];
    for (const [size, name] of [[10000000, 'Crore'], [100000, 'Lakh'], [1000, 'Thousand']] as const) {
        const count = Math.floor(rupees / size);
        if (count) {
            parts.push(underThousand(count) + ' ' + name);
            rupees %= size;
        }
    }
    if (rupees) parts.push(underThousand(rupees));
    const words = parts.join(' ') || 'Zero';
    return 'Rupees ' + words + (paise ? ' and ' + underThousand(paise) + ' Paise' : '') + ' Only';
}

export default function InvoiceDocument({ invoice }: { invoice: InvoiceDocumentData }) {
    return (
        <article style={{ width: 794, minHeight: 1123, padding: 20, background: '#fff', color: '#111', fontFamily: 'Georgia, Times New Roman, serif', fontSize: 11, lineHeight: 1.3, boxSizing: 'border-box' }}>
            <div style={{ border, minHeight: 1083, display: 'flex', flexDirection: 'column' }}>
                <header style={{ textAlign: 'center', borderBottom: border, padding: '12px 18px', fontFamily: 'Arial, sans-serif', fontWeight: 800, fontSize: 20, letterSpacing: 1, overflowWrap: 'anywhere' }}>
                    {invoice.businessName || 'YOUR BUSINESS'}
                </header>
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 15, letterSpacing: '.6px', padding: '20px 8px' }}>
                    {invoice.businessGstin ? 'TAX INVOICE' : 'INVOICE'}
                </div>

                <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, padding: '0 20px 25px', minHeight: 218 }}>
                    <div style={{ overflowWrap: 'anywhere' }}>
                        <div style={{ fontWeight: 700, marginBottom: 12 }}>Invoice To:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '102px 1fr', rowGap: 5 }}>
                            <span style={label}>Name:</span><span>{invoice.clientName || 'Client name'}</span>
                            {invoice.clientGstin && <><span style={label}>GSTIN:</span><span>{invoice.clientGstin}</span></>}
                            <span style={label}>Customer Address:</span><span style={{ whiteSpace: 'pre-line' }}>{invoice.clientAddress || '—'}</span>
                            {invoice.clientEmail && <><span style={label}>Email:</span><span>{invoice.clientEmail}</span></>}
                        </div>
                    </div>
                    <div style={{ overflowWrap: 'anywhere' }}>
                        <div style={{ fontWeight: 700, marginBottom: 12 }}>Invoice issued by:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '105px 1fr', rowGap: 5 }}>
                            <span style={label}>Business:</span><span>{invoice.businessName || 'Your business'}</span>
                            {invoice.businessGstin && <><span style={label}>GSTIN:</span><span>{invoice.businessGstin}</span></>}
                            {invoice.businessFssai && <><span style={label}>FSSAI License:</span><span>{invoice.businessFssai}</span></>}
                            {invoice.businessAddress && <><span style={label}>Address:</span><span style={{ whiteSpace: 'pre-line' }}>{invoice.businessAddress}</span></>}
                            {invoice.businessPhone && <><span style={label}>Phone:</span><span>{invoice.businessPhone}</span></>}
                            {invoice.businessEmail && <><span style={label}>Email:</span><span>{invoice.businessEmail}</span></>}
                            {invoice.placeOfSupply && <><span style={label}>Place of Supply:</span><span>{invoice.placeOfSupply}</span></>}
                        </div>
                    </div>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, padding: '0 20px 20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '102px 1fr', rowGap: 5 }}>
                        <span style={label}>Document:</span><span>INV</span>
                        <span style={label}>Invoice No:</span><span>{invoice.invoiceNumber || '—'}</span>
                        {invoice.orderReference && <><span style={label}>Order ID:</span><span>{invoice.orderReference}</span></>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '105px 1fr', rowGap: 5 }}>
                        <span style={label}>Invoice Date:</span><span>{date(invoice.invoiceDate)}</span>
                        <span style={label}>Due Date:</span><span>{date(invoice.dueDate)}</span>
                    </div>
                </section>

                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', borderTop: border, borderBottom: border }}>
                    <thead>
                        <tr>
                            <th style={{ ...heading, width: '6%', textAlign: 'center' }}>Sr No</th>
                            <th style={{ ...heading, width: '32%', textAlign: 'center' }}>Description</th>
                            <th style={{ ...heading, width: '7%', textAlign: 'center' }}>Qty</th>
                            <th style={{ ...heading, width: '15%', ...right }}>Unit Price</th>
                            <th style={{ ...heading, width: '17%', ...right }}>Taxable Value</th>
                            <th style={{ ...heading, width: '9%', ...right }}>GST</th>
                            <th style={{ ...heading, width: '14%', ...right, borderRight: 0 }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => {
                            const taxable = item.quantity * item.rate;
                            return (
                                <tr key={index} className="invoice-line" style={{ borderBottom: border }}>
                                    <td style={{ ...cell, textAlign: 'center' }}>{index + 1}.</td>
                                    <td style={{ ...cell, overflowWrap: 'anywhere' }}>{item.description || 'Item'}</td>
                                    <td style={{ ...cell, textAlign: 'center' }}>{item.quantity}</td>
                                    <td style={{ ...cell, ...right }}>{formatMoney(item.rate)}</td>
                                    <td style={{ ...cell, ...right }}>{formatMoney(taxable)}</td>
                                    <td style={{ ...cell, ...right }}>{item.gst}%</td>
                                    <td style={{ ...cell, ...right, borderRight: 0 }}>{formatMoney(item.total)}</td>
                                </tr>
                            );
                        })}
                        <tr style={{ fontWeight: 700 }}>
                            <td style={cell}></td>
                            <td style={{ ...cell, textAlign: 'center' }}>Subtotal</td>
                            <td style={cell}></td><td style={cell}></td><td style={cell}></td><td style={cell}></td>
                            <td style={{ ...cell, ...right, borderRight: 0 }}>{formatMoney(invoice.subtotal)}</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '18px 20px 10px' }}>
                    <div style={{ width: 275 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}><strong>Taxable amount</strong><span>{formatMoney(invoice.subtotal)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}><strong>Total GST</strong><span>{formatMoney(invoice.totalGST)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: border, fontSize: 13 }}><strong>Invoice Total</strong><strong>{formatMoney(invoice.totalAmount)}</strong></div>
                    </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ borderTop: border, padding: '9px 12px', display: 'flex', justifyContent: 'space-between', gap: 20 }}>
                        <strong>Invoice total in words</strong>
                        <strong style={{ textAlign: 'right' }}>{numberInWords(invoice.totalAmount)}</strong>
                    </div>
                    <div style={{ borderTop: border, minHeight: 65, display: 'flex', alignItems: 'end', padding: '10px 12px' }}>
                        <strong>Issued by {invoice.businessName || 'Your business'}</strong>
                    </div>
                    <footer style={{ borderTop: border, textAlign: 'center', padding: '10px 12px', overflowWrap: 'anywhere' }}>
                        <div style={{ fontWeight: 700 }}>{invoice.businessName || 'Your business'}</div>
                        {invoice.businessAddress && <div style={{ whiteSpace: 'pre-line' }}>{invoice.businessAddress}</div>}
                        {invoice.businessGstin && <div>GSTIN: {invoice.businessGstin}</div>}
                    </footer>
                </div>
            </div>
        </article>
    );
}
