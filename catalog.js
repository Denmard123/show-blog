const articles = {
    meand: {
        title: "Me and ?",
        text: [
            "Aku dan dunia, atau aku dan kehampaan? Aku tak tahu. Mungkin aku hanyalah pejalan yang tersesat di persimpangan pikiran sendiri, bertanya-tanya apakah langkah ini menuju rumah atau justru semakin menjauh dari segalanya.",
            "Kadang aku menatap cermin, mencoba mengenali siapa yang ada di dalamnya. Apakah aku masih aku? Ataukah aku hanyalah bayangan dari ekspektasi orang lain? Suara-suara di kepalaku berbicara dalam bisik yang tak pernah benar-benar sunyi.",
            "Di sini, tak ada jawaban pasti—hanya tanya yang menggantung, seperti senja yang enggan pergi. Aku berjalan, meski tak tahu ke mana, sebab diam bukan pilihan. Mungkin aku akan menemukan sesuatu di tengah kebingungan ini, atau mungkin aku hanya akan semakin tersesat."
        ]
    },
    trauma: {
        title: "Trauma",
        text: [
            "Ada luka yang tak berdarah, tapi perihnya menetap di antara detik yang terus berjalan. Ia bersembunyi di balik tawa yang dipaksakan, di sela-sela kata yang tak pernah terucap. Trauma bukan hanya tentang apa yang terjadi, tapi juga bagaimana bayangannya terus mengikuti.",
            "Malam-malam panjang terasa lebih sunyi, bukan karena ketiadaan suara, tetapi karena teriakan yang hanya bergema dalam dada. Ada bagian dari diri yang ingin melupakan, tapi ada pula yang terus mengingat, seakan-akan lupa berarti mengkhianati diri sendiri.",
            "Namun, dari kepingan yang berserakan, mungkin ada cara untuk kembali utuh, perlahan. Kita tidak harus baik-baik saja hari ini, tidak juga besok, tetapi selama masih ada langkah kecil yang diambil, berarti masih ada harapan untuk menyusun kembali diri yang pernah hancur."
        ]
    },
    deeptalk: {
        title: "Deep Talk",
        text: [
            "Pernahkah kau merasa ada kata yang ingin keluar, tapi tersangkut di dada? Seperti ada beban yang ingin dibagikan, namun tak ada ruang yang cukup aman untuk menampungnya. Kita hidup di dunia yang ramai, tapi sering kali merasa sendiri.",
            "Kadang, percakapan bukan sekadar berbicara—ia adalah seni menyelami hati yang tak terjamah. Setiap kata memiliki bobotnya sendiri, membawa kisah yang mungkin tak pernah didengar sebelumnya. Mendengar bukan hanya tentang telinga, tapi juga tentang keberanian untuk memahami tanpa menghakimi.",
            "Mari berbicara, bukan untuk didengar, tapi untuk benar-benar dipahami. Sebab di dunia yang penuh kebisingan, tempat terbaik bukanlah di mana kita berbicara paling keras, tetapi di mana kita didengar dengan paling tulus."
        ]
    }
};


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

const musicFiles = ["Beanie.mp3"];

document.getElementById("music-toggle-btn").addEventListener("click", function () {
    const musicList = document.getElementById("music-list");

    if (musicList.childElementCount === 0) {
        displayMusicList(); // Load list pas pertama kali diklik
    }

    musicList.classList.toggle("hidden");
});

// Fungsi untuk menampilkan daftar musik
function displayMusicList() {
    const musicList = document.getElementById("music-list");
    musicList.innerHTML = "";

    musicFiles.forEach(file => {
        const filePath = `audio/${file}`;

        const item = document.createElement("div");
        item.classList.add(
            "flex", "items-center", "justify-between",
            "p-3", "rounded-lg", "hover:bg-gray-200", "dark:hover:bg-gray-600",
            "transition"
        );

        const title = document.createElement("span");
        title.innerText = file.replace(".mp3", "");
        title.classList.add("text-gray-700", "dark:text-gray-300", "font-medium");

        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = filePath;
        audio.classList.add("w-full", "max-w-xs", "md:max-w-sm", "lg:max-w-md");
        audio.setAttribute("controlsList", "nodownload");
        audio.addEventListener("contextmenu", (e) => e.preventDefault()); // Blokir klik kanan

        item.append(title, audio);
        musicList.appendChild(item);
    });
}

// Tutup list jika klik di luar
document.addEventListener("click", function (event) {
    const musicContainer = document.getElementById("music-container");
    const musicList = document.getElementById("music-list");

    if (!musicContainer.contains(event.target)) {
        musicList.classList.add("hidden");
    }
});

// Blokir shortcut untuk download atau view source
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && (e.key === "s" || e.key === "u")) {
        e.preventDefault();
    }
});
