// ===================================
// Interactive Pricing Calculator
// ===================================

class PricingCalculator {
    constructor() {
        this.selectedPackage = null;
        this.selectedAddons = new Map();
        this.total = 0;

        this.init();
    }

    init() {
        // Package selection (radio buttons)
        const packageCards = document.querySelectorAll('.package-card');
        packageCards.forEach(card => {
            const radio = card.querySelector('input[type="radio"]');
            const cardElement = card;

            // Click on card selects radio
            cardElement.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                }
            });

            radio.addEventListener('change', () => {
                this.handlePackageSelection(card, radio.checked);
            });
        });

        // Addon selection (checkboxes)
        const addonCards = document.querySelectorAll('.addon-card');
        addonCards.forEach(card => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            const cardElement = card;

            // Click on card toggles checkbox
            cardElement.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });

            checkbox.addEventListener('change', () => {
                this.handleAddonSelection(card, checkbox.checked);
            });
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            this.proceedToCheckout();
        });
    }

    handlePackageSelection(card, isSelected) {
        // Deselect all packages first
        document.querySelectorAll('.package-card').forEach(pkg => {
            pkg.classList.remove('selected');
        });

        if (isSelected) {
            card.classList.add('selected');
            const packageId = card.dataset.id;
            const packagePrice = parseInt(card.dataset.price);
            const packageName = card.querySelector('h3').textContent;

            this.selectedPackage = {
                id: packageId,
                name: packageName,
                price: packagePrice
            };
        } else {
            this.selectedPackage = null;
        }

        this.updateSummary();
    }

    handleAddonSelection(card, isSelected) {
        const addonId = card.dataset.id;
        const addonPrice = parseInt(card.dataset.price);
        const addonName = card.querySelector('h4').textContent;

        if (isSelected) {
            card.classList.add('selected');
            this.selectedAddons.set(addonId, {
                name: addonName,
                price: addonPrice
            });
        } else {
            card.classList.remove('selected');
            this.selectedAddons.delete(addonId);
        }

        this.updateSummary();
    }

    updateSummary() {
        const selectedItemsContainer = document.getElementById('selected-items');
        const totalAmountElement = document.getElementById('total-amount');
        const checkoutBtn = document.getElementById('checkout-btn');

        // Clear current items
        selectedItemsContainer.innerHTML = '';

        // Calculate total
        let total = 0;

        // Add package if selected
        if (this.selectedPackage) {
            total += this.selectedPackage.price;
            const item = this.createSummaryItem(
                this.selectedPackage.name,
                this.selectedPackage.price,
                'package'
            );
            selectedItemsContainer.appendChild(item);
        }

        // Add addons
        if (this.selectedAddons.size > 0) {
            this.selectedAddons.forEach((addon, id) => {
                total += addon.price;
                const item = this.createSummaryItem(
                    addon.name,
                    addon.price,
                    'addon'
                );
                selectedItemsContainer.appendChild(item);
            });
        }

        // Update total
        this.total = total;
        totalAmountElement.textContent = `$${total.toLocaleString()}`;

        // Show empty message if nothing selected
        if (total === 0) {
            selectedItemsContainer.innerHTML = '<p class="empty-message">No items selected</p>';
            checkoutBtn.disabled = true;
        } else {
            checkoutBtn.disabled = false;
        }

        // Add animation
        totalAmountElement.classList.add('total-updated');
        setTimeout(() => {
            totalAmountElement.classList.remove('total-updated');
        }, 300);
    }

    createSummaryItem(name, price, type) {
        const item = document.createElement('div');
        item.className = 'summary-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        nameSpan.textContent = name;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'item-price';
        priceSpan.textContent = `$${price.toLocaleString()}`;

        item.appendChild(nameSpan);
        item.appendChild(priceSpan);

        return item;
    }

    proceedToCheckout() {
        // Build URL parameters with selected items
        const params = new URLSearchParams();

        if (this.selectedPackage) {
            params.append('service', this.selectedPackage.name);
        }

        this.selectedAddons.forEach((addon) => {
            params.append('service', addon.name);
        });

        params.append('total', this.total);

        // Redirect to booking page with selected services
        window.location.href = `/booking?${params.toString()}`;
    }
}

// Initialize pricing calculator when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    new PricingCalculator();
});
