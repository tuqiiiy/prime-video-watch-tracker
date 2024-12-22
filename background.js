chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Gelen mesaj:", message);

  if (message.type === "updateWatchTime") {
    chrome.storage.local.get("totalWatchTime", (data) => {
      const previousWatchTime = data.totalWatchTime || 0;
      const updatedWatchTime = message.watchTime; // Gelen süreyi doğrudan al
      console.log(`Güncellenmiş izleme süresi: ${updatedWatchTime}`);
      chrome.storage.local.set({ totalWatchTime: updatedWatchTime });
      sendResponse({ success: true });
    });
  }

  if (message.type === "updateEpisode") {
    chrome.storage.local.get("watchedEpisodes", (data) => {
      const watchedEpisodes = data.watchedEpisodes || {};
      watchedEpisodes[message.episodeName] = (watchedEpisodes[message.episodeName] || 0) + 1;
      console.log(`Bölüm güncellendi: ${message.episodeName}`);
      chrome.storage.local.set({ watchedEpisodes });
      sendResponse({ success: true });
    });
  }

  // Asynchronous response için true döndürün
  return true;
});
