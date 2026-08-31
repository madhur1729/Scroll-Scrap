// Scroll Slap Content Script
// Responsible for: activity detection, session management, intervention injection

let scrollSession = {
  active: false,
  startTime: null,
  lastActivityTime: null,
  interventionThreshold: null,
  interventionTriggered: false,
  personality: 'brutal'
};

let extensionEnabled = true;
let idleTimer = null;
let interventionCheckTimer = null;

// Initialize
chrome.storage.sync.get(['enabled', 'personality'], (result) => {
  extensionEnabled = result.enabled !== false;
  scrollSession.personality = result.personality || 'brutal';
  console.log('Scroll Slap initialized. Enabled:', extensionEnabled, 'Personality:', scrollSession.personality);
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    if (changes.enabled) {
      extensionEnabled = changes.enabled.newValue;
      console.log('Scroll Slap toggled:', extensionEnabled);
      if (!extensionEnabled) {
        endSession();
      }
    }
    if (changes.personality) {
      scrollSession.personality = changes.personality.newValue;
      console.log('Personality changed to:', scrollSession.personality);
    }
  }
});

// Activity detection listeners
function registerActivity() {
  if (!extensionEnabled) return;

  const now = Date.now();

  // Clear idle timer
  if (idleTimer) {
    clearTimeout(idleTimer);
  }

  // If no active session, start one
  if (!scrollSession.active) {
    startSession();
  }

  scrollSession.lastActivityTime = now;

  // Reset idle timer
  idleTimer = setTimeout(() => {
    console.log('Idle detected. Ending session.');
    endSession();
  }, SCROLL_SLAP_CONFIG.IDLE_THRESHOLD);
}

function startSession() {
  scrollSession.active = true;
  scrollSession.startTime = Date.now();
  scrollSession.lastActivityTime = Date.now();
  scrollSession.interventionThreshold = getInterventionThreshold();
  scrollSession.interventionTriggered = false;

  console.log('   Session started');
  console.log('   Intervention threshold:', formatDuration(scrollSession.interventionThreshold));

  // Start periodic check for intervention
  if (interventionCheckTimer) {
    clearInterval(interventionCheckTimer);
  }
  interventionCheckTimer = setInterval(checkForIntervention, 1000);
}

function endSession() {
  scrollSession.active = false;
  scrollSession.interventionTriggered = false;

  if (idleTimer) {
    clearTimeout(idleTimer);
  }
  if (interventionCheckTimer) {
    clearInterval(interventionCheckTimer);
  }

  console.log('❌ Session ended');
}

function checkForIntervention() {
  if (!scrollSession.active || scrollSession.interventionTriggered) {
    return;
  }

  const elapsedTime = Date.now() - scrollSession.startTime;

  if (elapsedTime >= scrollSession.interventionThreshold) {
    triggerIntervention(elapsedTime);
  }
}

function triggerIntervention(elapsedTime) {
  scrollSession.interventionTriggered = true;

  if (interventionCheckTimer) {
    clearInterval(interventionCheckTimer);
  }

  console.log('   INTERVENTION TRIGGERED');

  const personality = SCROLL_SLAP_CONFIG.PERSONALITIES[scrollSession.personality];
  const randomMessage = getRandomMessage(scrollSession.personality);
  const duration = formatDuration(elapsedTime);

  showIntervention({
    intro: personality.intro,
    message: randomMessage,
    duration: duration,
    personality: scrollSession.personality
  });
}

function showIntervention(data) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'scroll-slap-overlay';
  overlay.id = 'scroll-slap-overlay';

  const personalityEmoji = SCROLL_SLAP_CONFIG.PERSONALITIES[data.personality].emoji;

  overlay.innerHTML = `
    <div class="scroll-slap-modal">
      <div class="scroll-slap-emoji">${personalityEmoji}</div>
      <h1 class="scroll-slap-title">${data.intro}</h1>
      <p class="scroll-slap-message">${data.message}</p>
      <p class="scroll-slap-duration">You've been scrolling for <strong>${data.duration}</strong>.</p>
      <div class="scroll-slap-buttons">
        <button class="scroll-slap-btn scroll-slap-btn-primary" id="scroll-slap-stop">
          GET BACK TO LIFE
        </button>
       
      </div>
    </div>
  `;

  //  <button class="scroll-slap-btn scroll-slap-btn-secondary" id="scroll-slap-continue">
  //         Fine, 5 more minutes   
  //       </button>

  document.body.appendChild(overlay);

  // Event listeners
  document.getElementById('scroll-slap-stop').addEventListener('click', () => {
    removeIntervention();
    endSession();
    // Close the tab after a brief delay
    setTimeout(() => {
      chrome.runtime.sendMessage({ action: 'closeTab' }, (response) => {
        console.log('Tab closed.');
      });
    }, 300);
  });

  document.getElementById('scroll-slap-continue').addEventListener('click', () => {
    removeIntervention();
    // Start a new short session
    scrollSession.active = true;
    scrollSession.startTime = Date.now();
    scrollSession.lastActivityTime = Date.now();
    scrollSession.interventionThreshold = SCROLL_SLAP_CONFIG.CONTINUE_THRESHOLD; // 5 minutes
    scrollSession.interventionTriggered = false;
    console.log('⏱️ Continue session started. Next intervention in 5 minutes.');
    interventionCheckTimer = setInterval(checkForIntervention, 1000);
  });

  // Log intervention
  chrome.runtime.sendMessage({
    action: 'logIntervention',
    personality: data.personality,
    duration: data.duration
  });
}

function removeIntervention() {
  const overlay = document.getElementById('scroll-slap-overlay');
  if (overlay) {
    overlay.classList.add('scroll-slap-fade-out');
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
}

// Attach listeners
document.addEventListener('wheel', registerActivity, { passive: true });
document.addEventListener('scroll', registerActivity, { passive: true });
document.addEventListener('keydown', registerActivity);

console.log('✅ Scroll Slap content script loaded');
