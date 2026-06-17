import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invoice from '@/lib/models/Invoice';

export async function GET() {
    try {
        await dbConnect();
        const invoices = await Invoice.find({}).sort({ createdAt: -1 });
        return NextResponse.json(invoices, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch invoices:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invoices' },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        const invoice = new Invoice(body);
        await invoice.save();

        return NextResponse.json(invoice, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : undefined;
        return NextResponse.json(
            { error: message || 'Failed to create invoice' },
            { status: 500 },
        );
    }
}
