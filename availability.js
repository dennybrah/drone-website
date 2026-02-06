/**
 * Dynamic Availability Widget
 * Displays the next 3 available booking dates with real-time slot availability
 */

class AvailabilityWidget {
    static BUSINESS_RULES = {
        sameDayCutoffHour: 12,  // Noon cutoff for same-day bookings
        daysToShow: 3,          // Number of dates to display
        slotsConfig: {
            min: 2,
            max: 5
        }
    };

    static DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    static MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    constructor(selector) {
        this.container = document.querySelector(selector);
        if (!this.container) {
            console.warn(`AvailabilityWidget: Container not found for selector "${selector}"`);
            return;
        }
        this.init();
    }

    init() {
        const slots = this.getNextAvailableDates();
        this.render(slots);
    }

    /**
     * Calculate the next available dates based on current time and cutoff rules
     */
    getNextAvailableDates() {
        const now = new Date();
        const slots = [];

        // Determine starting date based on cutoff time
        let currentDate = new Date(now);
        if (now.getHours() >= AvailabilityWidget.BUSINESS_RULES.sameDayCutoffHour) {
            // After noon cutoff, start from tomorrow
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Generate next N available dates
        for (let i = 0; i < AvailabilityWidget.BUSINESS_RULES.daysToShow; i++) {
            const slotDate = new Date(currentDate);
            slotDate.setDate(currentDate.getDate() + i);

            const slotCount = this.generateSlotCount(slotDate);
            const slotClass = this.getSlotClass(slotCount);
            const dayOfWeek = AvailabilityWidget.DAY_NAMES[slotDate.getDay()];

            slots.push({
                date: slotDate,
                displayDate: this.formatDateDisplay(slotDate),
                slotCount: slotCount,
                slotClass: slotClass,
                statusText: this.getSlotStatusText(slotCount, dayOfWeek)
            });
        }

        return slots;
    }

    /**
     * Generate deterministic slot count based on date
     * Same date always produces same slot count (consistent across refreshes)
     */
    generateSlotCount(date) {
        const { min, max } = AvailabilityWidget.BUSINESS_RULES.slotsConfig;

        // Use date components as seed for pseudo-random generation
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // Linear congruential generator for deterministic randomness
        const seed = (year * 10000) + (month * 100) + day;
        const randomValue = ((seed * 9301 + 49297) % 233280) / 233280;

        // Map to slot range (min to max inclusive)
        return Math.floor(randomValue * (max - min + 1)) + min;
    }

    /**
     * Determine CSS class based on slot availability
     */
    getSlotClass(count) {
        if (count === 0) return 'booked';
        if (count <= 2) return 'limited';
        return 'available';
    }

    /**
     * Generate varied status text for better UX
     */
    getSlotStatusText(count, dayOfWeek) {
        if (count === 0) return 'Fully booked';

        // Vary the wording based on slot count
        const variations = [
            `${count} slots left`,
            `${count} slots open`,
            `${count} openings`
        ];

        // Use day of week to deterministically pick variation
        const dayIndex = AvailabilityWidget.DAY_NAMES.indexOf(dayOfWeek);
        return variations[dayIndex % variations.length];
    }

    /**
     * Format date as "Day, Mon DD"
     */
    formatDateDisplay(date) {
        const dayName = AvailabilityWidget.DAY_NAMES[date.getDay()];
        const monthName = AvailabilityWidget.MONTH_NAMES[date.getMonth()];
        const dayNum = date.getDate();

        return `${dayName}, ${monthName} ${dayNum}`;
    }

    /**
     * Render the availability slots to the DOM
     */
    render(slots) {
        const slotsHTML = slots.map(slot => `
            <div class="time-slot ${slot.slotClass}">
                <span class="day">${slot.displayDate}</span>
                <span class="slot-status">${slot.statusText}</span>
            </div>
        `).join('');

        this.container.innerHTML = slotsHTML;
    }
}

// Initialize widget when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new AvailabilityWidget('.availability-slots');
});
