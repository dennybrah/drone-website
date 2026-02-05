// ===================================
// Booking Form Management & Validation
// ===================================

class BookingManager {
    constructor() {
        this.selectedServices = [];
        this.total = 0;
        this.paymentMethod = null;
        this.formData = {};

        this.init();
    }

    init() {
        // Load order summary from URL parameters
        this.loadOrderSummary();

        // Setup form validation
        this.setupValidation();

        // Setup payment selection
        this.setupPaymentSelection();

        // Setup form submission
        this.setupFormSubmission();

        // Restore form data from localStorage if exists
        this.restoreFormData();

        // Auto-save form data
        this.setupAutoSave();
    }

    // ===================================
    // Order Summary from URL Parameters
    // ===================================
    loadOrderSummary() {
        const urlParams = new URLSearchParams(window.location.search);
        const services = urlParams.getAll('service');
        const total = urlParams.get('total');

        const selectedItemsContainer = document.getElementById('orderSummaryItems');
        const totalAmountElement = document.getElementById('summaryTotal');
        const payNowTotal = document.getElementById('payNowTotal');

        if (!selectedItemsContainer || !totalAmountElement) {
            console.error('Order summary elements not found');
            return;
        }

        // Clear loading message
        selectedItemsContainer.innerHTML = '';

        if (services && services.length > 0) {
            this.selectedServices = services;
            this.total = parseInt(total) || 0;

            // Display each service
            services.forEach(service => {
                const item = this.createSummaryItem(service);
                selectedItemsContainer.appendChild(item);
            });

            // Update totals
            const formattedTotal = `$${this.total.toLocaleString()}`;
            totalAmountElement.textContent = formattedTotal;

            if (payNowTotal) {
                payNowTotal.textContent = formattedTotal;
            }
        } else {
            selectedItemsContainer.innerHTML = `
                <p class="empty-message">No services selected</p>
                <p style="text-align: center; margin-top: 1rem;">
                    <a href="/pricing" style="color: #4A8CFF; text-decoration: underline;">
                        ← Return to pricing page to select services
                    </a>
                </p>
            `;
            totalAmountElement.textContent = '$0';

            if (payNowTotal) {
                payNowTotal.textContent = '$0';
            }
        }
    }

    createSummaryItem(serviceName) {
        const item = document.createElement('div');
        item.className = 'summary-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        nameSpan.textContent = serviceName;

        item.appendChild(nameSpan);

        return item;
    }

    // ===================================
    // Form Validation
    // ===================================
    setupValidation() {
        const form = document.getElementById('bookingForm');

        // Validate on blur for each input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Remove error on input
            input.addEventListener('input', () => {
                input.classList.remove('error');
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.style.display = 'none';
                }
            });
        });

        // Real-time validation for critical fields
        const addressInput = document.getElementById('address');
        const sqftInput = document.getElementById('sqft');
        const emailInput = document.getElementById('email');

        if (addressInput) {
            addressInput.addEventListener('input', () => this.validateAddress());
        }

        if (sqftInput) {
            sqftInput.addEventListener('input', () => this.validateSQFT());
        }

        if (emailInput) {
            emailInput.addEventListener('input', () => this.validateEmail());
        }
    }

    validateField(field) {
        const fieldName = field.name || field.id;

        switch (fieldName) {
            case 'address':
                return this.validateAddress();
            case 'vacancy':
                return this.validateVacancy();
            case 'sqft':
                return this.validateSQFT();
            case 'preferredDate':
                return this.validateDate();
            case 'preferredTime':
                return this.validateTime();
            case 'name':
                return this.validateName();
            case 'email':
                return this.validateEmail();
            case 'phone':
                return this.validatePhone();
            case 'paymentMethod':
                return this.validatePaymentMethod();
            case 'terms':
                return this.validateTerms();
            default:
                return true;
        }
    }

    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return false;

        field.classList.add('error');

        let errorMsg = field.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
        }

        errorMsg.textContent = message;
        errorMsg.style.display = 'block';

        return false;
    }

    clearError(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        field.classList.remove('error');

        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'none';
        }
    }

    // Individual field validators
    validateAddress() {
        const address = document.getElementById('address').value.trim();
        if (address.length < 10) {
            return this.showError('address', 'Please enter a complete address (minimum 10 characters)');
        }
        this.clearError('address');
        return true;
    }

    validateVacancy() {
        const vacancy = document.querySelector('input[name="vacancy"]:checked');
        if (!vacancy) {
            return this.showError('vacancy-occupied', 'Please select property status');
        }
        return true;
    }

    validateSQFT() {
        const sqft = parseInt(document.getElementById('sqft').value);
        if (!sqft || sqft < 100) {
            return this.showError('sqft', 'Square footage must be at least 100 sq ft');
        }
        if (sqft > 50000) {
            return this.showError('sqft', 'Square footage seems unusually large. Please verify.');
        }
        this.clearError('sqft');
        return true;
    }

    validateDate() {
        const dateInput = document.getElementById('preferredDate');
        const selectedDate = new Date(dateInput.value);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        if (!dateInput.value) {
            return this.showError('preferredDate', 'Please select a preferred date');
        }

        if (selectedDate < tomorrow) {
            return this.showError('preferredDate', 'Appointment must be scheduled for tomorrow or later');
        }

        this.clearError('preferredDate');
        return true;
    }

    validateTime() {
        const time = document.getElementById('preferredTime').value;
        if (!time) {
            return this.showError('preferredTime', 'Please select a preferred time');
        }
        this.clearError('preferredTime');
        return true;
    }

    validateName() {
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            return this.showError('name', 'Please enter your full name');
        }
        this.clearError('name');
        return true;
    }

    validateEmail() {
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return this.showError('email', 'Please enter a valid email address');
        }
        this.clearError('email');
        return true;
    }

    validatePhone() {
        const phone = document.getElementById('phone').value.trim();
        // Basic phone validation - at least 10 digits
        const phoneDigits = phone.replace(/\D/g, '');

        if (phoneDigits.length < 10) {
            return this.showError('phone', 'Please enter a valid phone number');
        }
        this.clearError('phone');
        return true;
    }

    validatePaymentMethod() {
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!paymentMethod) {
            alert('Please select a payment method');
            return false;
        }
        return true;
    }

    validateTerms() {
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            alert('Please agree to the terms and conditions');
            return false;
        }
        return true;
    }

    validateForm() {
        let isValid = true;

        // First check if services are selected
        if (this.total === 0 || this.selectedServices.length === 0) {
            alert('Please select services from the pricing page first.');
            window.location.href = '/pricing';
            return false;
        }

        // Validate all required fields
        isValid = this.validateAddress() && isValid;
        isValid = this.validateVacancy() && isValid;
        isValid = this.validateSQFT() && isValid;
        isValid = this.validateDate() && isValid;
        isValid = this.validateTime() && isValid;
        isValid = this.validateName() && isValid;
        isValid = this.validateEmail() && isValid;
        isValid = this.validatePhone() && isValid;
        isValid = this.validatePaymentMethod() && isValid;
        isValid = this.validateTerms() && isValid;

        return isValid;
    }

    // ===================================
    // Payment Selection
    // ===================================
    setupPaymentSelection() {
        const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');

        paymentOptions.forEach(radio => {
            radio.addEventListener('change', () => {
                this.paymentMethod = radio.value;
                this.updateSubmitButton();
            });
        });

        // Enable submit button when terms are checked
        const termsCheckbox = document.getElementById('terms');
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', () => {
                this.updateSubmitButton();
            });
        }
    }

    updateSubmitButton() {
        const submitBtn = document.getElementById('placeOrderBtn');
        const terms = document.getElementById('terms');

        // Enable button only if: terms checked, payment method selected, AND services selected (total > 0)
        if (terms && terms.checked && this.paymentMethod && this.total > 0) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // ===================================
    // Form Submission
    // ===================================
    setupFormSubmission() {
        const form = document.getElementById('bookingForm');
        const submitBtn = document.getElementById('placeOrderBtn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted!');

            // Validate form
            if (!this.validateForm()) {
                alert('Please fix the errors in the form before submitting');
                return;
            }

            // Collect form data
            this.collectFormData();
            console.log('Form data collected:', this.formData);
            console.log('Payment method:', this.paymentMethod);

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                if (this.paymentMethod === 'pay-now') {
                    console.log('Initiating Stripe checkout...');
                    await this.initiateStripeCheckout();
                } else if (this.paymentMethod === 'invoice') {
                    console.log('Sending invoice request...');
                    await this.sendInvoiceRequest();
                } else {
                    console.error('Unknown payment method:', this.paymentMethod);
                    alert('Please select a payment method');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('There was an error processing your request. Please try again or contact us directly.\n\nError: ' + error.message);
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    collectFormData() {
        this.formData = {
            // Services
            services: this.selectedServices,
            total: this.total,

            // Property Details
            address: document.getElementById('address').value.trim(),
            unit: document.getElementById('unit').value.trim(),
            gateCode: document.getElementById('gateCode').value.trim(),
            vacancy: document.querySelector('input[name="vacancy"]:checked')?.value || '',
            mlsNumber: document.getElementById('mlsNumber').value.trim(),
            sqft: parseInt(document.getElementById('sqft').value),

            // Appointment
            preferredDate: document.getElementById('preferredDate').value,
            preferredTime: document.getElementById('preferredTime').value,
            alternateDate: document.getElementById('alternateDate').value,
            alternateTime: document.getElementById('alternateTime').value,

            // Contact Information
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            company: document.getElementById('company').value.trim(),
            referral: document.getElementById('referral').value,

            // Special Instructions
            specialInstructions: document.getElementById('specialInstructions').value.trim(),

            // Payment Method
            paymentMethod: this.paymentMethod
        };

        // Store in localStorage for confirmation page
        localStorage.setItem('bookingData', JSON.stringify(this.formData));

        return this.formData;
    }

    // ===================================
    // Stripe Checkout Integration
    // ===================================
    async initiateStripeCheckout() {
        console.log('Checking Stripe...');

        // Check if Stripe is loaded
        if (typeof Stripe === 'undefined') {
            console.error('Stripe not loaded!');
            alert('Payment system not loaded. Please refresh the page and try again.');
            throw new Error('Stripe not loaded');
        }

        console.log('Stripe is loaded');

        try {
            console.log('Creating checkout session...');

            // Create checkout session via Netlify Function
            const response = await fetch('/.netlify/functions/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: this.total,
                    services: this.selectedServices,
                    email: this.formData.email,
                    metadata: {
                        address: this.formData.address,
                        appointment: `${this.formData.preferredDate} at ${this.formData.preferredTime}`,
                        name: this.formData.name,
                        phone: this.formData.phone
                    }
                })
            });

            console.log('Checkout response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Checkout error response:', errorText);
                throw new Error(`Failed to create checkout session: ${response.status}`);
            }

            const session = await response.json();
            console.log('Session created:', session);

            // Initialize Stripe with your publishable key
            // TODO: Replace with your actual Stripe publishable key
            console.log('Initializing Stripe with key...');
            const stripe = Stripe('pk_test_YOUR_STRIPE_KEY_HERE');

            console.log('Redirecting to Stripe Checkout...');
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.error('Stripe redirect error:', result.error);
                throw new Error(result.error.message);
            }

        } catch (error) {
            console.error('Stripe checkout error:', error);
            throw error;
        }
    }

    // ===================================
    // Invoice Request Submission
    // ===================================
    async sendInvoiceRequest() {
        console.log('Creating invoice form submission...');
        const formData = new FormData();
        formData.append('form-name', 'booking-invoice');

        // Add all booking data
        formData.append('name', this.formData.name);
        formData.append('email', this.formData.email);
        formData.append('phone', this.formData.phone);
        formData.append('services', this.formData.services.join(', '));
        formData.append('total', this.total);
        formData.append('address', this.formData.address);
        formData.append('unit', this.formData.unit);
        formData.append('gateCode', this.formData.gateCode);
        formData.append('vacancy', this.formData.vacancy);
        formData.append('mlsNumber', this.formData.mlsNumber);
        formData.append('sqft', this.formData.sqft);
        formData.append('preferredDate', this.formData.preferredDate);
        formData.append('preferredTime', this.formData.preferredTime);
        formData.append('alternateDate', this.formData.alternateDate);
        formData.append('alternateTime', this.formData.alternateTime);
        formData.append('company', this.formData.company);
        formData.append('referral', this.formData.referral);
        formData.append('specialInstructions', this.formData.specialInstructions);

        console.log('Submitting form to /booking...');

        try {
            const response = await fetch('/booking', {
                method: 'POST',
                body: formData
            });

            console.log('Response status:', response.status);
            console.log('Response OK:', response.ok);

            if (response.ok) {
                // Generate order number
                const orderNumber = this.generateOrderNumber();
                console.log('Order number generated:', orderNumber);

                // Redirect to confirmation page
                const confirmUrl = `/confirmation?order=${orderNumber}&status=invoice&email=${encodeURIComponent(this.formData.email)}`;
                console.log('Redirecting to:', confirmUrl);
                window.location.href = confirmUrl;
            } else {
                const responseText = await response.text();
                console.error('Response error:', responseText);
                throw new Error(`Form submission failed with status ${response.status}`);
            }

        } catch (error) {
            console.error('Invoice request error:', error);
            throw error;
        }
    }

    generateOrderNumber() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10).replace(/-/g, '');
        const time = now.toTimeString().slice(0, 5).replace(':', '');
        const random = Math.floor(Math.random() * 900) + 100;
        return `LVM-${date}-${time}-${random}`;
    }

    // ===================================
    // Auto-save & Restore Form Data
    // ===================================
    setupAutoSave() {
        const form = document.getElementById('bookingForm');
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.saveFormProgress();
            });
        });
    }

    saveFormProgress() {
        const formProgress = {
            address: document.getElementById('address').value,
            unit: document.getElementById('unit').value,
            gateCode: document.getElementById('gateCode').value,
            vacancy: document.querySelector('input[name="vacancy"]:checked')?.value || '',
            mlsNumber: document.getElementById('mlsNumber').value,
            sqft: document.getElementById('sqft').value,
            preferredDate: document.getElementById('preferredDate').value,
            preferredTime: document.getElementById('preferredTime').value,
            alternateDate: document.getElementById('alternateDate').value,
            alternateTime: document.getElementById('alternateTime').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            referral: document.getElementById('referral').value,
            specialInstructions: document.getElementById('specialInstructions').value
        };

        localStorage.setItem('bookingProgress', JSON.stringify(formProgress));
    }

    restoreFormData() {
        const savedProgress = localStorage.getItem('bookingProgress');

        if (savedProgress) {
            const data = JSON.parse(savedProgress);

            // Restore field values
            if (data.address) document.getElementById('address').value = data.address;
            if (data.unit) document.getElementById('unit').value = data.unit;
            if (data.gateCode) document.getElementById('gateCode').value = data.gateCode;
            if (data.mlsNumber) document.getElementById('mlsNumber').value = data.mlsNumber;
            if (data.sqft) document.getElementById('sqft').value = data.sqft;
            if (data.preferredDate) document.getElementById('preferredDate').value = data.preferredDate;
            if (data.preferredTime) document.getElementById('preferredTime').value = data.preferredTime;
            if (data.alternateDate) document.getElementById('alternateDate').value = data.alternateDate;
            if (data.alternateTime) document.getElementById('alternateTime').value = data.alternateTime;
            if (data.name) document.getElementById('name').value = data.name;
            if (data.email) document.getElementById('email').value = data.email;
            if (data.phone) document.getElementById('phone').value = data.phone;
            if (data.company) document.getElementById('company').value = data.company;
            if (data.referral) document.getElementById('referral').value = data.referral;
            if (data.specialInstructions) document.getElementById('specialInstructions').value = data.specialInstructions;

            // Restore vacancy radio button
            if (data.vacancy) {
                const vacancyRadio = document.querySelector(`input[name="vacancy"][value="${data.vacancy}"]`);
                if (vacancyRadio) vacancyRadio.checked = true;
            }
        }
    }
}

// Initialize booking manager when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Set minimum date for date pickers (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const preferredDateInput = document.getElementById('preferredDate');
    const alternateDateInput = document.getElementById('alternateDate');

    if (preferredDateInput) {
        preferredDateInput.setAttribute('min', minDate);
    }

    if (alternateDateInput) {
        alternateDateInput.setAttribute('min', minDate);
    }

    // Initialize booking manager
    new BookingManager();
});
