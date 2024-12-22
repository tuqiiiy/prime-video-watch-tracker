# Prime Video Watch Tracker

**Prime Video Watch Tracker** is a Chrome extension designed for Amazon Prime Video users to track their watch time and the episodes they rewatch. This extension helps you analyze your viewing habits and easily view your series and movie statistics.

## 🚀 Features

- **Total Watch Time Tracking**:
  - Tracks the total time spent on Amazon Prime Video in seconds, minutes, and hours.

- **Episode Rewatch Tracking**:
  - Keeps a record of which episodes you’ve rewatched and how many times.

- **Automatic Skip Recap**:
  - Automatically clicks the "Skip Recap" button at the start of episodes.

- **User-Friendly Interface**:
  - Displays your watch time and rewatched episodes in a clean and modern popup.

## 🛠️ Installation

1. **From Chrome Web Store**:
   - Coming soon...

2. **Manual Installation**:
   - Download or clone this repository:
     ```bash
     git clone https://github.com/username/prime-video-watch-tracker.git
     ```
   - Go to `chrome://extensions/` in your Chrome browser.
   - Enable "Developer Mode" in the top-right corner.
   - Click "Load unpacked" and select the project folder.

## 📋 Usage

1. Open a show or movie on Amazon Prime Video.
2. The extension will automatically start tracking your watch time.
3. Open the popup to view your total watch time and rewatched episodes.

## 💡 How It Works

- **Content Script**:
  - Tracks watch time and rewatched episodes.
  - Monitors the video player and DOM changes on Amazon Prime Video.
  
- **Background Script**:
  - Stores and manages data using Chrome's storage API.
  
- **Popup Interface**:
  - Displays stored data in a user-friendly interface.

## 📌 Requirements

- Chrome browser (v88 or later).
- Amazon Prime Video subscription.

## 📂 File Structure

- `manifest.json`: Extension configuration file.
- `content.js`: Collects data from the Amazon Prime Video player.
- `background.js`: Handles data storage and management.
- `popup.html`, `popup.js`: The user interface and interaction logic.

## 📧 Feedback and Contribution

- Use the **Issues** section to report bugs or suggest new features.
- To contribute, create a `fork` of the repository, make your changes, and submit a **pull request**.

## 🌟 Support

If you like this extension, please give it a star (`⭐`) on GitHub!

---
