let totalWatchTime = 0; // Toplam izleme süresi
let currentEpisode = null; // Şu an izlenen bölüm
let lastRecordedTime = 0; // En son kaydedilen video zamanı
let skipButtonClicked = false; // Tıklama durumu takibi için bayrak

// Mesajları güvenli bir şekilde göndermek için yardımcı fonksiyon
function sendMessageSafely(message) {
  if (chrome.runtime && chrome.runtime.sendMessage) {
    try {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Mesaj gönderimi sırasında bir hata oluştu:", chrome.runtime.lastError.message);
        } else {
          console.log("Mesaj başarıyla gönderildi:", response);
        }
      });
    } catch (error) {
      console.error("Mesaj gönderimi sırasında beklenmeyen bir hata oluştu:", error);
    }
  } else {
    console.error("chrome.runtime.sendMessage tanımlı değil. Eklenti bağlamında çalıştığınızdan emin olun.");
  }
}

// Her saniye izleme süresini ve bölümü kontrol eder
function trackWatchTime() {
  try {
    const videoPlayer = document.querySelector("video");

    if (videoPlayer && !videoPlayer.paused) {
      const currentTime = Math.floor(videoPlayer.currentTime); // Videonun oynatma süresi

      // Süre sadece ileriye gidiyorsa artır
      if (currentTime > lastRecordedTime) {
        const timeDifference = currentTime - lastRecordedTime;
        totalWatchTime += timeDifference; // Fark kadar ekle
        lastRecordedTime = currentTime; // En son kaydedilen zamanı güncelle
        console.log(`Süre artırıldı: ${totalWatchTime} saniye`);
      } else if (currentTime < lastRecordedTime) {
        console.warn("Videonun oynatma süresi geriye düştü. Süre eklenmedi.");
        lastRecordedTime = currentTime; // Videonun geriye sarılması durumunda güncelle
      }

      // Bölüm adını kontrol et
      const episodeTitle = document.querySelector(".atvwebplayersdk-title-text");
      if (episodeTitle) {
        const episodeName = episodeTitle.textContent.trim();

        // Bölüm değiştiğinde yeni bölüme geçişi kontrol et
        if (currentEpisode !== episodeName) {
          currentEpisode = episodeName;
          console.log(`Yeni bölüm tespit edildi: ${episodeName}`);

          // Bölüm bilgilerini background.js'e gönder
          sendMessageSafely({
            type: "updateEpisode",
            episodeName: episodeName,
          });

          // Yeni bölüm başladığında toplam süreyi sıfırla
          totalWatchTime = 0;
          lastRecordedTime = 0;
        }
      } else {
        console.log("Bölüm başlığı bulunamadı.");
      }
    } else {
      console.log("Video duraklatıldı veya video bulunamadı.");
    }

    // Süre değiştiğinde background.js'e gönder
    sendMessageSafely({
      type: "updateWatchTime",
      watchTime: totalWatchTime,
    });
  } catch (error) {
    console.error("trackWatchTime sırasında hata:", error);
  }
}

// Özeti atla butonunu kontrol et ve otomatik tıkla
function skipSummary() {
  try {
    const skipButton = Array.from(document.querySelectorAll("button")).find(
      (button) =>
        button.textContent.includes("Skip Recap") ||
        button.textContent.includes("Özeti Atla")
    );

    if (skipButton && !skipButtonClicked && skipButton.offsetParent !== null) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      skipButton.dispatchEvent(event);
      console.log("Skip Recap butonuna tıklama olayı tetiklendi.");

      skipButtonClicked = true;

      // Tıklama durumunu 5 saniye sonra sıfırla
      setTimeout(() => {
        skipButtonClicked = false;
        console.log("Skip Recap butonu tekrar tıklanabilir.");
      }, 5000);
    } else if (!skipButton) {
      console.log("Skip Recap butonu bulunamadı veya görünür değil.");
    }
  } catch (error) {
    console.error("Özeti atlama işlemi sırasında bir hata oluştu:", error);
  }
}

// Videoyu ve DOM değişikliklerini dinle
const videoObserver = new MutationObserver(() => {
  const videoPlayer = document.querySelector("video");
  if (videoPlayer) {
    console.log("Video bulundu!");
    setInterval(trackWatchTime, 1000); // Her saniyede bir trackWatchTime çalıştır
    videoObserver.disconnect(); // Video bulunduğunda gözlemlemeyi durdur
  }
});

videoObserver.observe(document.body, { childList: true, subtree: true });

// Skip Recap butonunu dinle
const skipObserver = new MutationObserver(() => {
  skipSummary();
});

skipObserver.observe(document.body, { childList: true, subtree: true });
