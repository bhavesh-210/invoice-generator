import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all invoices
export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch invoices from database
    return NextResponse.json({ invoices: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

// POST - Create a new invoice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // TODO: Save invoice to database
    return NextResponse.json({ invoice: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
