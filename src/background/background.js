// This file will handle background tasks such as notifications

// Example: Set up a listener for alarms (if needed)
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'subscriptionReminder') {
        // Handle the alarm
    }
}); 