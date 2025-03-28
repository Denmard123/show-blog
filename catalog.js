let articles = {};

fetch('data/articles.json')
  .then(response => response.json())
  .then(data => {
    articles = data;
    // Optional: langsung tampilkan artikel default setelah data dimuat
    // showArticle("meand");
  });



let currentArticle = "";
let currentIndex = 0;

function showArticle(category) {
    currentArticle = category;
    currentIndex = 0;
    document.getElementById('catalog').classList.add('hidden');
    document.getElementById('article-content').classList.remove('hidden');
    document.getElementById('article-title').innerText = articles[category].title;
    document.getElementById('article-text').innerText = articles[category].text[currentIndex];
}

function showCatalog() {
    document.getElementById('catalog').classList.remove('hidden');
    document.getElementById('article-content').classList.add('hidden');
}

document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        document.getElementById('article-text').innerText = articles[currentArticle].text[currentIndex];
    }
});

document.getElementById('next-btn').addEventListener('click', function() {
    if (currentIndex < articles[currentArticle].text.length - 1) {
        currentIndex++;
        document.getElementById('article-text').innerText = articles[currentArticle].text[currentIndex];
    }
});

let musicFiles = [];

// Fetch file music.json
fetch('data/music.json')
  .then(response => response.json())
  .then(data => {
    // Ubah object jadi array
    musicFiles = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value
    }));

    // Tampilkan list musik setelah data siap
    displayMusicList();
  })
  .catch(error => {
    console.error("Gagal memuat musik:", error);
  });

  function displayMusicList() {
    const musicList = document.getElementById("music-list");
    musicList.innerHTML = "";
  
    Object.entries(musicFiles).forEach(([key, file]) => {
      const musicItem = document.createElement("div");
      musicItem.className = "flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg shadow";
  
      musicItem.innerHTML = `
        <div class="flex items-center gap-3">
          <i data-lucide="headphones" class="w-5 h-5 text-indigo-500"></i>
          <div>
            <h3 class="font-semibold text-gray-800 dark:text-white">${file.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">${file.artist}</p>
          </div>
        </div>
        <audio controls class="w-32">
          <source src="${file.file}" type="audio/mpeg">
          Browsermu tidak mendukung audio
        </audio>
      `;
  
      musicList.appendChild(musicItem);
    });
  
    // Render ikon lucide
    lucide.createIcons();
  }
  
  

  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("music-toggle-btn");
    const musicContainer = document.getElementById("music-container");
  
    // Toggle tampil/sembunyi musik
    toggleBtn.addEventListener("click", function (event) {
      event.stopPropagation(); // Biar gak trigger close dari global click
      musicContainer.classList.toggle("hidden");
    });
  
    // Sembunyikan music card kalau klik di luar
    document.addEventListener("click", function (event) {
      if (!musicContainer.classList.contains("hidden") &&
          !musicContainer.contains(event.target) &&
          !toggleBtn.contains(event.target)) {
        musicContainer.classList.add("hidden");
      }
    });
  });
  
