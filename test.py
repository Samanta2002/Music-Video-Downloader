from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Import CORS
import subprocess
import yt_dlp
import os
import socket
import webbrowser

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return send_from_directory(".", "index.html")  # Serve the HTML file from the same directory

# Helper function to get the local IP address
def get_local_ip():
    hostname = socket.gethostname()
    return socket.gethostbyname(hostname)

# Function to download YouTube videos
def download_youtube_video(video_url, output_path):
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    options = {
        'format': 'bestvideo+bestaudio/best',  # Download best video and best audio
        'outtmpl': f'{output_path}/%(title)s.%(ext)s',  # Save with video title as file name
        'quiet': False,  # Show download progress
        'noplaylist': True,  # Do not download entire playlists
        'geo_bypass': True,  # Bypass geographical restrictions
    }

    try:
        with yt_dlp.YoutubeDL(options) as ydl:
            print("Starting download...")
            ydl.download([video_url])
            print("Download complete!")
        return "Download complete!"
    except Exception as e:
        print(f"Error occurred: {e}")
        return f"Error: {e}"


# Function to download Spotify music using SpotDL
def download_spotify_music(spotify_url, output_path):
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    command = ["spotdl", "--output", f"{output_path}", spotify_url]
    try:
        print(f"Running command: {' '.join(command)}")
        result = subprocess.run(command, capture_output=True, text=True)

        if result.returncode == 0:
            print("Download complete!")
            return "Download complete!"
        else:
            print(f"Error occurred: {result.stderr}")
            return f"Error occurred: {result.stderr}"
    except Exception as e:
        print(f"Unexpected error: {e}")
        return f"Unexpected error: {e}"


@app.route('/download', methods=['POST'])
def download():
    data = request.get_json()
    url = data.get('url')
    platform = data.get('platform')
    output_path = data.get('outputPath')

    if not url:
        return jsonify({"message": "URL is required."}), 400
    else:
        # Download based on the platform
        if platform == "spotify":
           message = download_spotify_music(url, output_path)
        elif platform == "youtube":
           message = download_youtube_video(url, output_path)
           
        return jsonify({"message": message}), 200

if __name__ == "__main__":
    # Open the app in the default browser
    webbrowser.open("http://127.0.0.1:5000")
    # Start the Flask app
    app.run(host='localhost', port=5000, debug=False)
