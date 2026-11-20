'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import InvoiceDocument, { type InvoiceDocumentData } from './InvoiceDocument';

interface PDFExportProps {
    invoice: InvoiceDocumentData;
    className?: string;
}

export default function PDFExport({ invoice, className }: PDFExportProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [busy, setBusy] = useState(false);

    const handleDownloadPDF = async () => {
        if (!contentRef.current || busy) return;
        setBusy(true);
        try {
            const element = contentRef.current;
            const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pageWidth = 190;
            const maxSlice = Math.floor(canvas.width * 277 / pageWidth);
            const scale = canvas.height / element.getBoundingClientRect().height;
            const safeBreaks = Array.from(element.querySelectorAll('.invoice-line'))
                .map(row => Math.floor((row.getBoundingClientRect().bottom - element.getBoundingClientRect().top) * scale))
                .filter(y => y > 0 && y < canvas.height);
            let top = 0;
            let page = 0;

            while (top < canvas.height) {
                const target = Math.min(top + maxSlice, canvas.height);
                const breakAt = safeBreaks.filter(y => y > top + maxSlice * 0.65 && y <= target).pop();
                const bottom = target === canvas.height ? target : (breakAt ?? target);
                const part = document.createElement('canvas');
                part.width = canvas.width;
                part.height = bottom - top;
                const context = part.getContext('2d');
                if (!context) throw new Error('Could not create the PDF page');
                context.fillStyle = '#fff';
                context.fillRect(0, 0, part.width, part.height);
                context.drawImage(canvas, 0, top, canvas.width, part.height, 0, 0, part.width, part.height);
                if (page > 0) pdf.addPage();
                pdf.addImage(part.toDataURL('image/png'), 'PNG', 10, 10, pageWidth, part.height * pageWidth / part.width);
                top = bottom;
                page++;
            }
            const safeNumber = (invoice.invoiceNumber || 'draft').replace(/[^a-z0-9_-]/gi, '-');
            pdf.save(`Invoice-${safeNumber}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Could not generate the PDF. Please try again.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <>
            <div ref={contentRef} aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 0, width: 794, pointerEvents: 'none' }}>
                <InvoiceDocument invoice={invoice} />
            </div>
            <button type="button" onClick={handleDownloadPDF} disabled={busy}
                className={className || 'bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-50'}>
                {busy ? 'Preparing PDF...' : 'Download PDF'}
            </button>
        </>
    );
}
