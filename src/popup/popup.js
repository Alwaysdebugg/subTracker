document.addEventListener('DOMContentLoaded', function() {
    const subscriptionList = document.getElementById('subscription-list');
    const addSubscriptionButton = document.getElementById('add-subscription');

    // Load subscriptions from storage
    chrome.storage.sync.get(['subscriptions'], function(result) {
        const subscriptions = result.subscriptions || [];
        updateSubscriptionList(subscriptions);
    });

    // Update the subscription list in the popup
    function updateSubscriptionList(subscriptions) {
        subscriptionList.innerHTML = '';
        subscriptions.forEach(subscription => {
            const li = document.createElement('li');
            li.textContent = `${subscription.name} - ${subscription.daysLeft} days left`;
            if (subscription.daysLeft <= 7) {
                li.style.color = 'red'; // Highlight if less than 7 days left
            }
            subscriptionList.appendChild(li);
        });
    }

    // Navigate to options page
    addSubscriptionButton.addEventListener('click', function() {
        chrome.runtime.openOptionsPage();
    });
}); 