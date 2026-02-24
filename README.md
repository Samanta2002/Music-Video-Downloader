# 🎵 Music-Video-Downloader 🎥  

A simple and efficient **Windows-based** music and video downloader for YouTube & Spotify. No installation required—just set up the environment variable and start downloading!  

## 🚀 Features  
- 📥 **Download YouTube Videos & Playlists**  
- 🎵 **Download Music from Spotify**  
- 🔄 **Convert YouTube videos to MP4 format**  
- ⚡ **Fast & lightweight EXE file**  
- 🖥️ **Windows-only support**  

## 🛠️ Setup Instructions  

### **1️⃣ Clone the Repository**  

    git clone https://github.com/Samanta2002/Music-Video-Downloader.git
                  
    cd Music-Video-Downloader


### **2️⃣ Set ups**

**Step 1: install ffmpeg and spotdl.**

**Step 2: Locate the /bin folder inside the ffmpeg folder and put "spotdl.exe" inside it.**

**Step 3: Copy the full path of the /bin directory.**

**Step 4: Add it to the Windows Environment Variables under PATH:**

        a. Press Win + R, type sysdm.cpl, and hit Enter.
        b. Go to Advanced > Environment Variables.
        c. Under System Variables, select Path and click Edit.
        d. Click New, paste the copied path, and save.
        
**Step 5: Create a folder static and put the .html, .css, and .js files inside the folder.**

**Step 6: Run the command in the terminal**

       pyinstaller --onefile --clean --noupx --add-data "static;static" --add-binary "ffmpeg/bin/ffmpeg.exe;ffmpeg" --add-binary "ffmpeg/bin/spotdl.exe;spotdl" --hidden-import yt_dlp app.py

### **3️⃣ Run the Application**

    a. After setting up the environment variable, you can run the "app.exe".
    b. After downloading press "ctrl+c" to close the console.
