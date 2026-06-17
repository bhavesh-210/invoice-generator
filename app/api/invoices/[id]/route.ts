import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invoice from '@/lib/models/Invoice';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        await dbConnect();
        const invoice = await Invoice.findById(params.id);

        if (!invoice) {
            return NextResponse.json(
                { error: 'Invoice not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(invoice, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch invoice:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invoice' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        await dbConnect();
        await Invoice.findByIdAndDelete(params.id);

        return NextResponse.json(
            { message: 'Invoice deleted' },
            { status: 200 },
        );
    } catch (error) {
        console.error('Failed to delete invoice:', error);
        return NextResponse.json(
            { error: 'Failed to delete invoice' },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        await dbConnect();
        const body = await request.json();

        const invoice = await Invoice.findByIdAndUpdate(params.id, body, {
            new: true,
        });

        if (!invoice) {
            return NextResponse.json(
                { error: 'Invoice not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(invoice, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : undefined;
        return NextResponse.json(
            { error: message || 'Failed to update invoice' },
            { status: 500 },
        );
    }
}
