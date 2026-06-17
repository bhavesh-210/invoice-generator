'use client';

import React from 'react';

interface PDFExportProps {
  invoice?: any;
  onExport?: () => void;
}

export default function PDFExport({ invoice, onExport }: PDFExportProps) {
  const handleExport = () => {
    // TODO: Implement PDF export functionality
    onExport?.();
  };

  return (
    <button onClick={handleExport} disabled={!invoice}>
      Export as PDF
    </button>
  );
}
