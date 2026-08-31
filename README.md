# Scroll Slap ��

Break out of doomscrolling with sudden, chaotic, and humorous interventions.

## What is Scroll Slap?

Scroll Slap is a Chrome extension that detects when you're stuck in an endless scrolling loop on social media and hits you with a full-screen intervention designed to snap you back to reality.

Instead of passive notifications, Scroll Slap uses aggressive, personalized messages to break the autopilot and make you consciously decide whether to keep scrolling.

## Features

✅ **Activity Detection** – Tracks scrolling, keyboard navigation, and wheel events  
✅ **Random Interventions** – Unpredictable timing (8–20 minutes) keeps you on guard  
✅ **Personality System** – Choose between Brutal, Disappointed, or Funny modes  
✅ **Full-Screen Overlay** – Impossible to accidentally ignore  
✅ **Easy Controls** – Stop scrolling or give yourself 5 more minutes  
✅ **Testing Mode** – Set thresholds to 30–60 seconds for rapid testing

## V1 Supported Sites

- �� YouTube (including Shorts)
- �� Instagram
- �� Reddit
- �� X (Twitter)

## Installation

### 1. Load the Extension in Chrome/Edge

1. Open `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge)
2. Enable **Developer Mode** (toggle in top-right)
3. Click **Load unpacked**
4. Navigate to the `slap-scroll` folder and select it
5. The extension should now appear in your extensions list

### 2. Verify Installation

1. Go to YouTube, Instagram, Reddit, or X
2. Open the extension popup (click the extension icon)
3. You should see the Scroll Slap settings panel

## How to Use

### Testing the Extension Quickly

1. Open the extension popup
2. Enable **Testing Mode** (reduces thresholds to 30–60 seconds)
3. Open YouTube/Instagram/Reddit/X
4. Start scrolling
5. After 30–60 seconds, the intervention should appear

### Production Mode

1. Disable **Testing Mode** in the popup
2. Interventions will trigger after 5–20 minutes of continuous scrolling
3. Change personalities anytime from the popup

### Understanding the Popup

| Setting                | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **Status**             | Shows if extension is enabled/disabled                                  |
| **Personality**        | Changes the tone of intervention messages (Brutal, Disappointed, Funny) |
| **Intervention Range** | Shows current threshold window                                          |
| **Testing Mode**       | Reduces thresholds to 30–60s for rapid testing                          |
| **Monitored Sites**    | Select which sites to monitor (currently all selected)                  |
| **Session Stats**      | Displays intervention count and last intervention time                  |

### Actions When Intervention Appears

**GET BACK TO LIFE**  
Closes the popup and resets your scrolling session. Use this to actually stop.

**Fine, 5 more minutes ��**  
Closes the popup but starts a new 5-minute countdown. Next intervention appears in 5 minutes.

## Architecture

```
slap-scroll/
├── manifest.json              # Extension configuration (Manifest V3)
├── config.js                  # Personalities, messages, thresholds
├── background.js              # Service worker (logging, state)
├── content.js                 # Activity tracking, intervention trigger
├── styles.css                 # Overlay styling & animations
├── popup/
│   ├── popup.html            # Settings UI
│   ├── popup.js              # Settings logic
│   └── popup.css             # Settings styling
├── assets/
│   └── icon16.svg            # Extension icon
└── README.md
```

## How It Works

1. **Content Script Loads** → Attaches listeners to wheel, scroll, keyboard events
2. **User Scrolls** → First activity starts a session with random threshold
3. **Idle Detection** → 60 seconds with no activity ends the session
4. **Threshold Reached** → Intervention overlay is injected into the page
5. **User Responds** → Either stops (resets session) or continues (5-min countdown)

## Development Notes

### Testing Different Sites

Test on each supported site to ensure:

- Activity detection works (scroll, keyboard nav, wheel events)
- Overlay appears full-screen without lag
- Overlay blocks interaction with underlying content
- Buttons respond correctly

### Performance

- Content script runs on supported sites only
- Minimal overhead: event listeners + periodic timer check
- Overlay removed from DOM immediately after dismissal

### Debugging

Open Chrome DevTools on any supported site and check the console for logs:

- `✅ Scroll Slap content script loaded`
- `�� Session started`
- `�� Intervention threshold: {time}`
- `�� INTERVENTION TRIGGERED`

## Future Versions

**V2** – Better detection (cross-site scrolling, late-night tracking)  
**V3** – Personalization (learn user patterns, optimize interventions)  
**V4** – Intervention marketplace (custom voices, messages, styles)

## Known Limitations (V1)

- Interventions only trigger once per session (by design for V1)
- No backend/analytics beyond local storage
- No custom messages yet (fixed personalities only)
- No cross-device synchronization

## Troubleshooting

### Overlay not appearing?

1. Check if extension is enabled in popup
2. Verify you're on a supported site
3. Check console for error messages
4. Try enabling Testing Mode for shorter thresholds

### Not detecting activity?

1. Make sure you're scrolling (wheel events, keyboard nav)
2. Some sites with custom scroll handlers might need adjustment
3. Check console for activity logs

### Buttons not responding?

1. Reload the page and try again
2. Check for JavaScript errors in console

## Philosophy

Scroll Slap should feel like:

> Your brutally honest friend suddenly grabbing you by the shoulders and asking why you're still watching Reels.

Not like:

> Another app lecturing you about screen time.

## Credits

Built with Manifest V3, vanilla JavaScript, and chaotic energy.

---

**Version 1.0** • Break the autopilot

# Scroll Slap V1 – Quick Start Guide

## �� Get Running in 2 Minutes

### Step 1: Load the Extension

**Chrome:**

1. Open `chrome://extensions/`
2. Toggle **Developer mode** ON (top-right)
3. Click **Load unpacked**
4. Select the `slap-scroll` folder
5. Done! ✅

**Edge:**

1. Open `edge://extensions/`
2. Toggle **Developer mode** ON (bottom-left)
3. Click **Load unpacked**
4. Select the `slap-scroll` folder
5. Done! ✅

### Step 2: Test It

1. Open **YouTube**, **Instagram**, **Reddit**, or **X**
2. Click the extension icon (�� Scroll Slap)
3. **Enable Testing Mode** (this sets thresholds to 30–60 seconds)
4. Start scrolling on the site
5. After 30–60 seconds → �� **INTERVENTION** appears

### Step 3: Try the Controls

When the intervention popup appears:

- **GET BACK TO LIFE** → Closes popup, resets session
- **Fine, 5 more minutes ��** → Closes popup, restart timer for 5 min

---

## ��️ Popup Settings Explained

| Button/Setting      | What It Does                                        |
| ------------------- | --------------------------------------------------- |
| **Status Badge**    | Shows if extension is active/inactive               |
| **BRUTAL ��**       | Aggressive, confrontational messages                |
| **DISAPPOINTED ��** | Guilt-tripping, moral messages                      |
| **FUNNY ��**        | Humorous, meme-style messages                       |
| **Testing Mode**    | Changes thresholds to 30–60 sec (default: 5–20 min) |
| **Monitored Sites** | Checkboxes for YouTube, Instagram, Reddit, X        |
| **Session Stats**   | Shows intervention count & last intervention time   |

---

## �� Testing Scenarios

### Scenario 1: Basic Intervention

1. Enable Testing Mode
2. Go to YouTube
3. Scroll for 30–60 seconds
4. Popup appears ✅

### Scenario 2: Continue Scrolling

1. When popup appears, click "Fine, 5 more minutes"
2. Popup closes
3. Wait 5 minutes and scroll
4. New popup appears ✅

### Scenario 3: Session Reset

1. Scroll for a few seconds
2. Stop scrolling (no activity)
3. Wait 60+ seconds
4. Start scrolling again
5. New session begins ✅

### Scenario 4: Multiple Sites

1. Test on YouTube, Instagram, Reddit, and X
2. Verify intervention appears on all sites ✅

---

## �� Console Debugging

Open **DevTools** (F12) on any supported site and watch the console:

```
✅ Scroll Slap content script loaded
�� Session started
�� Intervention threshold: 45 seconds
�� INTERVENTION TRIGGERED
```

---

## ⚙️ Production vs. Testing

| Mode                | Min Threshold | Max Threshold | Use Case                        |
| ------------------- | ------------- | ------------- | ------------------------------- |
| **Testing Mode**    | 30 sec        | 60 sec        | Quick testing & development     |
| **Production Mode** | 5 min         | 20 min        | Real-world doomscroll detection |

**To switch:** Toggle "Testing Mode" in the popup

---

## �� Troubleshooting

**Q: Popup not appearing?**  
A: Check if extension is enabled in the popup. Verify Testing Mode is on. Check console for errors.

**Q: Activity not detected?**  
A: Make sure you're scrolling/using keyboard. Some sites may need adjustment.

**Q: Buttons not responding?**  
A: Reload the page. Check console for JavaScript errors.

**Q: Extension not loading?**  
A: Make sure you selected the `slap-scroll` folder (not parent folder). Verify Developer Mode is ON.

---

## �� What's Next?

Now that V1 is running, you can:

✅ Test on different sites (YouTube, Instagram, Reddit, X)  
✅ Try different personalities (Brutal, Disappointed, Funny)  
✅ Experiment with thresholds in Testing Mode  
✅ Check console logs to verify activity detection

For V2 and beyond, see the ideas in `README.md` under "Future Versions".

---

**Happy scroll-slapping!** ��
