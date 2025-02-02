function selectOutputPath() {
    const folderInput = document.createElement('input');
    const url= document.getElementById('url');
    folderInput.type = 'file';
    folderInput.webkitdirectory = true;

    if(url.value===''){
        document.getElementById('message').textContent = 'Paste url First !!!'; 
    }

    folderInput.addEventListener('change', function (event) {
        if (event.target.files.length > 0) {
            const firstFile = event.target.files[0];
            const folderPath = firstFile.webkitRelativePath.split('/')[0];
            document.getElementById('output-path').value = folderPath;
            document.getElementById('message').textContent = `Output folder selected: ${folderPath}`;
        } else {
            document.getElementById('message').textContent = 'No folder selected. Please try again.';
        }
    });

    folderInput.click();
}

document.getElementById('platform').addEventListener('change', function () {
    const body = document.body;
    const heading = document.getElementById('form-heading');
    const downloadBtn = document.getElementById('download-btn');
    const selectPathBtn = document.getElementById('select-path');
    const url= document.getElementById('url');

    if (this.value === "youtube") {

        heading.textContent = 'YouTube Video Download';
        url.placeholder = "Paste the YouTube link...";
        body.style.backgroundImage = "linear-gradient(to bottom, #ff0000, #000000)";
        heading.style.color = "#ffffff";
        downloadBtn.style.backgroundColor = "#ff0000";
        selectPathBtn.style.backgroundColor = "#ff0000";

        // Hover effect for buttons in JavaScript (on youtube platform)
        downloadBtn.addEventListener("mouseover", function() {
            downloadBtn.style.backgroundColor = "#660219"; // Darker red on hover
        });
        downloadBtn.addEventListener("mouseout", function() {
            downloadBtn.style.backgroundColor = "#ff0000"; // Original red when not hovering
        });

        selectPathBtn.addEventListener("mouseover", function() {
            selectPathBtn.style.backgroundColor = "#660219"; // Darker red on hover
        });
        selectPathBtn.addEventListener("mouseout", function() {
            selectPathBtn.style.backgroundColor = "#ff0000"; // Original red when not hovering
        });
    } else {
        location.reload();
    }
});

document.getElementById('download-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const platform = document.getElementById('platform').value;
    const outputPath = document.getElementById('output-path').value;

    if (!outputPath) {
        document.getElementById('message').textContent = 'Please select an output folder before submitting.';
        return;
    }
    if((platform === "youtube" && (url.startsWith("https://youtu.be/") || url.startsWith("https://youtube.com/")))|| (platform === "spotify" && url.startsWith("https://open.spotify.com/"))){
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
