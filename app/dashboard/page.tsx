import InvoiceHistory from '../components/InvoiceHistory';

export default function DashboardPage() {
    return (
        <main className="bg-slate-50 py-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-3xl font-bold text-slate-900">
                    Invoice Dashboard
                </h1>
                <InvoiceHistory />
            </div>
        </main>
    );
}
