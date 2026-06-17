import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invoice from '@/lib/models/Invoice';

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
    try {
        await dbConnect();
        const { id } = await context.params;
        const invoice = await Invoice.findById(id);

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

export async function DELETE(request: NextRequest, context: RouteContext) {
    try {
        await dbConnect();
        const { id } = await context.params;
        await Invoice.findByIdAndDelete(id);

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

export async function PUT(request: NextRequest, context: RouteContext) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id } = await context.params;

        const invoice = await Invoice.findByIdAndUpdate(id, body, {
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
