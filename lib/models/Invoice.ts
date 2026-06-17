import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    businessEmail: {
        type: String,
        required: true,
    },
    businessPhone: {
        type: String,
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    invoiceDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    clientEmail: {
        type: String,
        required: true,
    },
    clientAddress: {
        type: String,
        required: true,
    },
    items: [
        {
            description: String,
            quantity: Number,
            rate: Number,
            gst: Number,
            total: Number,
        },
    ],
    subtotal: {
        type: Number,
        required: true,
    },
    totalGST: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Invoice ||
    mongoose.model('Invoice', invoiceSchema);
