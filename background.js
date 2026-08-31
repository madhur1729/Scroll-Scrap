// Scroll Slap Background Service Worker

// Initialize storage with defaults
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['enabled', 'personality', 'interventions'], (result) => {
    if (result.enabled === undefined) {
      chrome.storage.sync.set({
        enabled: true,
        personality: 'brutal',
        interventions: 0,
        stopped: 0,
        continued: 0
      });
      console.log('Scroll Slap initialized with defaults');
    }
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logIntervention') {
    chrome.storage.sync.get(['interventions', 'stopped', 'continued'], (result) => {
      const newCount = (result.interventions || 0) + 1;
      chrome.storage.sync.set({
        interventions: newCount,
        lastInterventionTime: Date.now()
      });
      console.log('Intervention logged. Total:', newCount);
    });
    sendResponse({ status: 'logged' });
  } else if (request.action === 'closeTab') {
    // Close the current tab
    if (sender.tab && sender.tab.id) {
      chrome.tabs.remove(sender.tab.id, () => {
        console.log('Tab closed:', sender.tab.id);
        sendResponse({ status: 'tab_closed' });
      });
    }
  }
});
