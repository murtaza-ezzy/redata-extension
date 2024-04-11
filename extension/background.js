const timeSpentOnSite = {};

// Keep track of the current active tab
let currentTab = {
    id: null,
    url: null,
    startTime: Date.now(),
};

// Function to update the time spent on a site
function updateTimeSpent(tabId, url) {
    const currentTime = Date.now();
    if (currentTab.id !== null) {
        const domain = new URL(currentTab.url).hostname;
        const timeSpent = currentTime - currentTab.startTime; // time in milliseconds
        const dateKey = (new Date()).toISOString().split('T')[0]; // Get current date as 'YYYY-MM-DD'

        if (!timeSpentOnSite[dateKey]) {
            timeSpentOnSite[dateKey] = {};
        }

        if (!timeSpentOnSite[dateKey][domain]) {
            timeSpentOnSite[dateKey][domain] = 0;
        }

        // Update time in minutes
        timeSpentOnSite[dateKey][domain] += timeSpent / 60000; // Convert milliseconds to minutes
    }
    // Update the current active tab info
    currentTab.id = tabId;
    currentTab.url = url;
    currentTab.startTime = currentTime;

    console.log(timeSpentOnSite);
}

// Listen for tab switching
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        // Update time only if the URL is accessible (not a chrome:// page or similar)
        if (tab.url) {
            updateTimeSpent(activeInfo.tabId, tab.url);
        }
    });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if updated tab is the active one and has completed loading
    if (changeInfo.status === 'complete' && tab.active) {
        updateTimeSpent(tabId, tab.url);
    }
});

// Listen for when the active window changes
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        // The browser lost focus
        updateTimeSpent(null, null);
    } else {
        chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
            if (tabs[0].url) {
                updateTimeSpent(tabs[0].id, tabs[0].url);
            }
        });
    }
});

// When the browser is closing, update the time spent
chrome.windows.onRemoved.addListener(() => {
    updateTimeSpent(null, null);
});