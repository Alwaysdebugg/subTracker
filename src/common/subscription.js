// Subscription data structure and related calculations

// Calculate days left until next renewal
function calculateDaysLeft(nextRenewalDate) {
    const today = new Date();
    const timeDiff = nextRenewalDate - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
} 