// ===================================
// Confirmation Page Logic
// ===================================

class ConfirmationManager {
    constructor() {
        this.bookingData = {};
        this.init();
    }

    init() {
        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const orderNumber = urlParams.get('order');
        const paymentStatus = urlParams.get('status');
        const email = urlParams.get('email');

        // Load booking data from localStorage
        const storedData = localStorage.getItem('bookingData');
        if (storedData) {
            this.bookingData = JSON.parse(storedData);
        }

        // Populate confirmation page
        this.displayOrderNumber(orderNumber);
        this.displayServices();
        this.displayPropertyDetails();
        this.displayAppointment();
        this.displayContactInfo(email);
        this.displayPaymentStatus(paymentStatus, email);
        this.displayTotal();

        // Update subtitle based on payment status
        this.updateSubtitle(paymentStatus);

        // Clear booking data from localStorage after displaying
        // (User can still use browser back button to see data)
        // Uncomment the line below if you want to clear immediately:
        // localStorage.removeItem('bookingData');
    }

    displayOrderNumber(orderNumber) {
        const orderNumberElement = document.getElementById('orderNumber');
        if (orderNumber) {
            orderNumberElement.textContent = orderNumber;
        } else {
            // Generate order number if not provided (fallback)
            orderNumberElement.textContent = this.generateOrderNumber();
        }
    }

    generateOrderNumber() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10).replace(/-/g, '');
        const time = now.toTimeString().slice(0, 5).replace(':', '');
        const random = Math.floor(Math.random() * 900) + 100;
        return `LVM-${date}-${time}-${random}`;
    }

    displayServices() {
        const servicesContainer = document.getElementById('servicesBooked');

        if (this.bookingData.services && this.bookingData.services.length > 0) {
            const servicesList = document.createElement('ul');
            this.bookingData.services.forEach(service => {
                const li = document.createElement('li');
                li.textContent = service;
                servicesList.appendChild(li);
            });
            servicesContainer.appendChild(servicesList);
        } else {
            servicesContainer.innerHTML = '<p>No services data available</p>';
        }
    }

    displayPropertyDetails() {
        const propertyContainer = document.getElementById('propertyDetails');
        const data = this.bookingData;

        if (data.address) {
            const details = [];

            details.push(`<p><strong>Address:</strong> ${data.address || 'N/A'}</p>`);

            if (data.unit) {
                details.push(`<p><strong>Unit Number:</strong> ${data.unit}</p>`);
            }

            if (data.gateCode) {
                details.push(`<p><strong>Gate Code:</strong> ${data.gateCode}</p>`);
            }

            details.push(`<p><strong>Property Status:</strong> ${data.vacancy || 'N/A'}</p>`);

            if (data.mlsNumber) {
                details.push(`<p><strong>MLS Number:</strong> ${data.mlsNumber}</p>`);
            }

            details.push(`<p><strong>Square Footage:</strong> ${data.sqft ? data.sqft.toLocaleString() : 'N/A'} sq ft</p>`);

            propertyContainer.innerHTML = details.join('');
        } else {
            propertyContainer.innerHTML = '<p>No property details available</p>';
        }
    }

    displayAppointment() {
        const appointmentContainer = document.getElementById('appointmentDetails');
        const data = this.bookingData;

        if (data.preferredDate) {
            const details = [];

            details.push(`<p><strong>Preferred Date:</strong> ${this.formatDate(data.preferredDate)}</p>`);
            details.push(`<p><strong>Preferred Time:</strong> ${data.preferredTime || 'N/A'}</p>`);

            if (data.alternateDate) {
                details.push(`<p><strong>Alternate Date:</strong> ${this.formatDate(data.alternateDate)}</p>`);
                if (data.alternateTime) {
                    details.push(`<p><strong>Alternate Time:</strong> ${data.alternateTime}</p>`);
                }
            }

            appointmentContainer.innerHTML = details.join('');
        } else {
            appointmentContainer.innerHTML = '<p>No appointment details available</p>';
        }
    }

    displayContactInfo(emailFromUrl) {
        const contactContainer = document.getElementById('contactDetails');
        const data = this.bookingData;

        const email = emailFromUrl || data.email;

        if (data.name || email) {
            const details = [];

            details.push(`<p><strong>Name:</strong> ${data.name || 'N/A'}</p>`);
            details.push(`<p><strong>Email:</strong> ${email || 'N/A'}</p>`);
            details.push(`<p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>`);

            if (data.company) {
                details.push(`<p><strong>Company/Agency:</strong> ${data.company}</p>`);
            }

            if (data.referral) {
                details.push(`<p><strong>Referral Source:</strong> ${data.referral}</p>`);
            }

            if (data.specialInstructions) {
                details.push(`<p><strong>Special Instructions:</strong></p>`);
                details.push(`<p style="padding-left: 0; margin-top: 0.5rem; white-space: pre-wrap;">${data.specialInstructions}</p>`);
            }

            contactContainer.innerHTML = details.join('');
        } else {
            contactContainer.innerHTML = '<p>No contact information available</p>';
        }
    }

    displayPaymentStatus(status, email) {
        const paymentContainer = document.getElementById('paymentStatus');
        const paymentSection = paymentContainer.closest('.detail-section');

        if (status === 'paid') {
            paymentSection.classList.add('paid');
            paymentContainer.innerHTML = `
                <p><strong>Status:</strong> Payment Successful ✓</p>
                <p>A confirmation has been sent to <strong>${email || 'your email'}</strong></p>
                <p>Transaction ID: ${this.generateTransactionId()}</p>
            `;
        } else if (status === 'invoice') {
            paymentSection.classList.add('invoice');
            paymentContainer.innerHTML = `
                <p><strong>Status:</strong> Invoice Requested</p>
                <p>We'll send an invoice to <strong>${email || 'your email'}</strong> within 1 business day</p>
                <p>Payment terms: Due upon receipt</p>
            `;
        } else {
            paymentContainer.innerHTML = '<p>Payment information not available</p>';
        }
    }

    displayTotal() {
        const totalElement = document.getElementById('totalAmount');
        const payNowTotal = document.getElementById('payNowTotal');
        const invoiceTotal = document.getElementById('invoiceTotal');

        const total = this.bookingData.total || 0;
        const formattedTotal = `$${total.toLocaleString()}`;

        if (totalElement) {
            totalElement.textContent = formattedTotal;
        }

        if (payNowTotal) {
            payNowTotal.textContent = formattedTotal;
        }

        if (invoiceTotal) {
            invoiceTotal.textContent = formattedTotal;
        }
    }

    updateSubtitle(status) {
        const subtitleElement = document.getElementById('confirmationSubtitle');

        if (status === 'paid') {
            subtitleElement.textContent = 'Your payment has been processed successfully';
        } else if (status === 'invoice') {
            subtitleElement.textContent = "We'll send your invoice within 1 business day";
        } else {
            subtitleElement.textContent = 'Thank you for choosing Las Vegas Logic Media';
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';

        const date = new Date(dateString + 'T00:00:00'); // Add time to prevent timezone issues
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return date.toLocaleDateString('en-US', options);
    }

    generateTransactionId() {
        // Generate a fake transaction ID for display purposes
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let txId = 'TXN-';
        for (let i = 0; i < 12; i++) {
            txId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return txId;
    }
}

// Initialize confirmation page when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    new ConfirmationManager();
});
