document.addEventListener("DOMContentLoaded", () => {
  // Veriyi yükle ve arayüzü güncelle
  function loadAndUpdateUI() {
    chrome.storage.local.get(["totalWatchTime", "watchedEpisodes"], (data) => {
      try {
        const watchTimeInSeconds = data.totalWatchTime || 0;

        // Süreyi saat, dakika ve saniyeye çevir
        const hours = Math.floor(watchTimeInSeconds / 3600);
        const minutes = Math.floor((watchTimeInSeconds % 3600) / 60);
        const seconds = watchTimeInSeconds % 60;

        // Toplam süreyi göster
        const watchTimeElement = document.getElementById("watchTime");
        watchTimeElement.textContent = `Toplam İzleme Süresi: ${hours} saat, ${minutes} dakika, ${seconds} saniye`;

        // Tekrar izlenen bölümleri listele
        const episodesList = document.getElementById("episodesList");
        episodesList.innerHTML = ""; // Mevcut listeyi temizle

        const watchedEpisodes = data.watchedEpisodes || {};
        if (Object.keys(watchedEpisodes).length > 0) {
          Object.keys(watchedEpisodes).forEach((episode) => {
            const count = watchedEpisodes[episode];
            const li = document.createElement("li");
            li.textContent = `${episode} - ${count} kez tekrar izlenmiş`;
            episodesList.appendChild(li);
          });
        } else {
          // Eğer tekrar izlenen bölüm yoksa bilgi göster
          const li = document.createElement("li");
          li.textContent = "Henüz bir bölüm tekrar izlenmemiş.";
          episodesList.appendChild(li);
        }
      } catch (error) {
        console.error("Veri yükleme sırasında bir hata oluştu:", error);
        const watchTimeElement = document.getElementById("watchTime");
        watchTimeElement.textContent = "Veri yüklenirken hata oluştu!";
      }
    });
  }

  // İlk yükleme sırasında veriyi çek ve UI'yi güncelle
  loadAndUpdateUI();

  // Yenileme butonuna tıklama işlevi
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", () => {
    loadAndUpdateUI();
    console.log("Veriler yenilendi.");
  });
});
