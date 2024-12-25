// Utility functions for chrome.storage operations

// Save subscriptions to storage
function saveSubscriptions(subscriptions, callback) {
    chrome.storage.sync.set({subscriptions: subscriptions}, callback);
}

// Load subscriptions from storage
function loadSubscriptions(callback) {
    chrome.storage.sync.get(['subscriptions'], function(result) {
        callback(result.subscriptions || []);
    });
} 