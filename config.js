const SCROLL_SLAP_CONFIG = {
  // Thresholds (in milliseconds)
  TESTING_MODE: true, // Set to false for production
  INTERVENTION_MIN: 30 * 1000, // 30 seconds for testing
  INTERVENTION_MAX: 60 * 1000, // 60 seconds for testing
  PRODUCTION_MIN: 5 * 60 * 1000, // 5 minutes
  PRODUCTION_MAX: 20 * 60 * 1000, // 20 minutes
  IDLE_THRESHOLD: 60 * 1000, // 60 seconds of inactivity = session ends
  CONTINUE_THRESHOLD: 5 * 60 * 1000, // 5 minutes if user clicks "5 more minutes"

  // Supported websites
  SUPPORTED_SITES: {
    youtube: {
      name: "YouTube",
      patterns: ["youtube.com", "youtu.be"]
    },
    instagram: {
      name: "Instagram",
      patterns: ["instagram.com"]
    },
    reddit: {
      name: "Reddit",
      patterns: ["reddit.com"]
    },
    x: {
      name: "X (Twitter)",
      patterns: ["x.com", "twitter.com"]
    }
  },

  // Personalities and messages
  PERSONALITIES: {
    brutal: {
      name: "BRUTAL MODE   ",
      intro: "BRO, WHAT THE HELL ARE YOU DOING?",
      messages: [
        "The algorithm owns you.",
        "PUT. THE. PHONE. DOWN.",
        "Get a grip.",
        "You just lost another {minutes} minutes.",
        "Your future self is disappointed.",
        "This isn't productive.",
        "The matrix has you.",
        "You're on autopilot."
      ],
      emoji: "  "
    },
    disappointed: {
      name: "DISAPPOINTED MODE   ",
      intro: "You said you'd stop scrolling...",
      messages: [
        "Was this really the plan?",
        "Your future self was counting on you.",
        "You know better than this.",
        "This isn't why you opened this tab.",
        "I'm not mad. I'm just disappointed.",
        "Remember your goals?",
        "Time has slipped away."
      ],
      emoji: "  "
    },
    funny: {
      name: "FUNNY MODE   ",
      intro: "BREAKING NEWS: Person Watches Another Reel",
      messages: [
        "The algorithm thanks you for your service.",
        "ONE MORE REEL™",
        "Your productivity has entered the chat. It's leaving.",
        "Scientists still don't know why you're still scrolling.",
        "Congratulations, you've achieved infinite scroll. Literally.",
        "Your parents called. They miss you."
      ],
      emoji: "  "
    }
  }
};

// Helper function to get current threshold based on mode
function getInterventionThreshold() {
  if (SCROLL_SLAP_CONFIG.TESTING_MODE) {
    return Math.random() * (SCROLL_SLAP_CONFIG.INTERVENTION_MAX - SCROLL_SLAP_CONFIG.INTERVENTION_MIN) + SCROLL_SLAP_CONFIG.INTERVENTION_MIN;
  }
  return Math.random() * (SCROLL_SLAP_CONFIG.PRODUCTION_MAX - SCROLL_SLAP_CONFIG.PRODUCTION_MIN) + SCROLL_SLAP_CONFIG.PRODUCTION_MIN;
}

function getRandomMessage(personality) {
  const messages = SCROLL_SLAP_CONFIG.PERSONALITIES[personality].messages;
  return messages[Math.floor(Math.random() * messages.length)];
}

function formatDuration(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  if (minutes === 0) {
    return `${seconds} seconds`;
  }
  return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} seconds`;
}
