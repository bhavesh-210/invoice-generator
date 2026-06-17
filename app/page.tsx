import InvoiceForm from './components/InvoiceForm';

export default function Home() {
    return (
        <section className="bg-slate-50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <InvoiceForm />
            </div>
        </section>
    );
}
