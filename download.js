// List of available songs
const songs = [
    "Aaja Ve Mahiya .mp3",
    "Anjani  Dilawara.mp3",
    "Calaboose .mp3",
    "Dilwa Ke Dukhwa .mp3",
    "Gaand Mein Danda.mp3",
    "Jiya Tu Bihar Ke Lala.mp3",
    "Nitish ji.mp3"
];

// Function to download a song
function downloadSong(filename, button) {
    // Prevent multiple downloads
    if (button.classList.contains('downloading')) {
        return;
    }

    // Update button state
    button.classList.add('downloading');
    button.innerHTML = '⏳ Downloading...';

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = 'Songs/' + filename;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset button after a short delay
    setTimeout(() => {
        button.classList.remove('downloading');
        button.innerHTML = '⬇ Download';
    }, 2000);
}

// Populate the download list
function populateDownloadList() {
    const downloadList = document.getElementById('downloadList');
    
    songs.forEach((song, index) => {
        // Remove .mp3 extension for display
        const displayName = song.replace('.mp3', '');
        
        const downloadItem = document.createElement('div');
        downloadItem.className = 'download-item';
        
        downloadItem.innerHTML = `
            <div class="song-details">
                <span class="song-number">${index + 1}</span>
                <div class="song-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                </div>
                <span class="song-name">${displayName}</span>
            </div>
            <button class="download-btn" onclick="downloadSong('${song}', this)">
                ⬇ Download
            </button>
        `;
        
        downloadList.appendChild(downloadItem);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateDownloadList();
});
