
// Select output folder and handle validation
function selectOutputPath() {
    const folderInput = document.createElement('input');
    const url = document.getElementById('url');
    folderInput.type = 'file';
    folderInput.webkitdirectory = true;

    if (url.value === '') {
        document.getElementById('message').textContent = 'Paste URL first !!!';
    }

    folderInput.addEventListener('change', function (event) {
        if (event.target.files.length > 0) {
            const firstFile = event.target.files[0];
            const folderPath = firstFile.webkitRelativePath.split('/')[0];
            document.getElementById('output-path').value = folderPath;
            document.getElementById('message').textContent = `Output folder selected: ${folderPath}`;
        } else {
            document.getElementById('message').textContent = 'No folder or an empty folder has been selected. Please try again.';
        }
    });

    folderInput.click();
}

// Change UI when platform is switched
document.getElementById('platform').addEventListener('change', function () {
    const body = document.body;
    const heading = document.getElementById('form-heading');
    const downloadBtn = document.getElementById('download-btn');
    const selectPathBtn = document.getElementById('select-path');
    const url = document.getElementById('url');
    const bgImage = document.querySelector('.right-pane img')

    if (this.value === "youtube") {
        heading.textContent = 'YouTube Video Download';
        url.placeholder = "Paste the YouTube link...";
        body.style.backgroundImage = "linear-gradient(to bottom, #ff0000, #000000)";
        heading.style.color = "#ffffff";
        downloadBtn.style.backgroundColor = "#ff0000";
        selectPathBtn.style.backgroundColor = "#ff0000";

        bgImage.src = 'static/img2.png';

        downloadBtn.addEventListener("mouseover", function () {
            downloadBtn.style.backgroundColor = "#660219";
        });
        downloadBtn.addEventListener("mouseout", function () {
            downloadBtn.style.backgroundColor = "#ff0000";
        });

        selectPathBtn.addEventListener("mouseover", function () {
            selectPathBtn.style.backgroundColor = "#660219";
        });
        selectPathBtn.addEventListener("mouseout", function () {
            selectPathBtn.style.backgroundColor = "#ff0000";
        });
    } else {
        location.reload(); // Reset for Spotify or others
    }
});

// Handle form submission to start the download
document.getElementById('download-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const platform = document.getElementById('platform').value;
    const outputPath = document.getElementById('output-path').value;

    if (!outputPath) {
        document.getElementById('message').textContent = 'Please select an output folder before submitting.';
        return;
    }

    const isYouTube = platform === "youtube" && (url.startsWith("https://youtu.be/") || url.startsWith("https://www.youtube.com/"));
    const isSpotify = platform === "spotify" && url.startsWith("https://open.spotify.com/");

    if (isYouTube || isSpotify) {
        try {
            document.getElementById('message').textContent = 'Downloading.........';
            const response = await fetch('http://localhost:5000/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, platform, outputPath })
            });

            const result = await response.json();
            document.getElementById('message').textContent = response.ok ? result.message : 'Download failed. Please check the URL or try again later.';
        } catch (error) {
            document.getElementById('message').textContent = 'An unexpected error occurred. Please try again.';
        }
    } else {
        document.getElementById('message').textContent = 'Please provide a valid URL or select a valid platform.';
    }
});

// Typewriter effect for text animation
const sentences = [
    "Stream. Download. Repeat.",
    "All your favorite music and video here.",
    "YouTube or Spotify? You choose.",
    "Built for passionate listeners and learners."
];

const speed = 60;
const pause = 1500;
const typewriter = document.getElementById("typewriter");
let sentenceIndex = 0;
let charIndex = 0;
let typing = true;

function typeLoop() {
    const currentSentence = sentences[sentenceIndex];

    if (typing) {
        typewriter.textContent = currentSentence.slice(0, charIndex++);
        if (charIndex > currentSentence.length) {
            typing = false;
            setTimeout(() => setTimeout(typeLoop, 500), pause);
        } else {
            setTimeout(typeLoop, speed);
        }
    } else {
        typewriter.textContent = currentSentence.slice(0, --charIndex);
        if (charIndex === 0) {
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
            typing = true;
            setTimeout(typeLoop, speed);
        } else {
            setTimeout(typeLoop, speed / 2);
        }
    }
}

typeLoop();

// Floating musical notes
const container = document.getElementById('music-container');
const musicalSymbols = ['♪', '♫', '♬', '♩', '♭', '♯', '𝄞', '𝄢'];


function createNote() {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerText = musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)];

    note.style.left = Math.random() * 100 + 'vw';
    note.style.animationDuration = (3 + Math.random() * 2) + 's';
    note.style.fontSize = (40 + Math.random() * 60) + 'px';

    container.appendChild(note);

    setTimeout(() => {
        note.remove();
    }, 5000);
}

setInterval(createNote, 500); // Create notes at regular intervals
