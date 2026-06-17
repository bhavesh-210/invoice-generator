export const calculateLineTotal = (
    quantity: number,
    rate: number,
    gst: number,
) => {
    const subtotal = quantity * rate;
    const gstAmount = (subtotal * gst) / 100;
    return subtotal + gstAmount;
};

export interface InvoiceItem {
    quantity: number;
    rate: number;
    gst: number;
}

export const calculateInvoiceTotals = (items: InvoiceItem[]) => {
    let subtotal = 0;
    let totalGST = 0;

    items.forEach((item) => {
        const lineSubtotal = item.quantity * item.rate;
        const gstAmount = (lineSubtotal * item.gst) / 100;
        subtotal += lineSubtotal;
        totalGST += gstAmount;
    });

    return {
        subtotal: Math.round(subtotal * 100) / 100,
        totalGST: Math.round(totalGST * 100) / 100,
        totalAmount: Math.round((subtotal + totalGST) * 100) / 100,
    };
};

export const generateInvoiceNumber = () => {
    const timestamp = Date.now();
    return `INV-${timestamp}`;
};

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
};
