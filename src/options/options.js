document.addEventListener('DOMContentLoaded', function() {
    const subscriptionForm = document.getElementById('subscription-form');
    const subscriptionList = document.getElementById('subscription-list');

    // Load subscriptions from storage
    chrome.storage.sync.get(['subscriptions'], function(result) {
        const subscriptions = result.subscriptions || [];
        updateSubscriptionList(subscriptions);
    });

    // Add or update subscription
    subscriptionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newSubscription = {
            name: document.getElementById('service-name').value,
            price: parseFloat(document.getElementById('price').value),
            cycle: document.getElementById('cycle').value,
            nextRenewal: new Date(document.getElementById('next-renewal').value),
            daysLeft: calculateDaysLeft(new Date(document.getElementById('next-renewal').value))
        };
        chrome.storage.sync.get(['subscriptions'], function(result) {
            const subscriptions = result.subscriptions || [];
            subscriptions.push(newSubscription);
            chrome.storage.sync.set({subscriptions: subscriptions}, function() {
                updateSubscriptionList(subscriptions);
                subscriptionForm.reset();
            });
        });
    });

    // Update the subscription list in the options page
    function updateSubscriptionList(subscriptions) {
        subscriptionList.innerHTML = '';
        subscriptions.forEach((subscription, index) => {
            const li = document.createElement('li');
            li.textContent = `${subscription.name} - ${subscription.price} - ${subscription.cycle} - ${subscription.daysLeft} days left`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                subscriptions.splice(index, 1);
                chrome.storage.sync.set({subscriptions: subscriptions}, function() {
                    updateSubscriptionList(subscriptions);
                });
            });
            li.appendChild(deleteButton);
            subscriptionList.appendChild(li);
        });
    }

    // Calculate days left until next renewal
    function calculateDaysLeft(nextRenewalDate) {
        const today = new Date();
        const timeDiff = nextRenewalDate - today;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }
}); 