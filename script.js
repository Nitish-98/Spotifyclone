function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
let currentSong = new Audio();
let songs = [];

async function getSongs() {
    // Hardcoded song list since we can't fetch directory listing without a server
    return [
        "Aaja Ve Mahiya .mp3",
        "Anjani  Dilawara.mp3",
        "Calaboose .mp3",
        "Dilwa Ke Dukhwa .mp3",
        "Gaand Mein Danda.mp3",
        "Jiya Tu Bihar Ke Lala.mp3",
        "Nitish ji.mp3"
    ];
}

const playMusic = (track, pause = false) => {
    // If track doesn't have .mp3, add it for the file path
    const trackWithExtension = track.endsWith('.mp3') ? track : track + '.mp3';
    currentSong.src = "Songs/" + trackWithExtension;

    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }
    // Display without .mp3 extension
    const displayName = track.replace('.mp3', '');
    document.querySelector(".songinfo").innerHTML = decodeURI(displayName);
    document.querySelector(".time").innerHTML = "00:00 / 00:00";
}

function displaySongs(songsToDisplay, isSearching = false) {
    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    let heading = document.querySelector(".library .heading h2");
    songUl.innerHTML = "";

    if (isSearching) {
        heading.innerHTML = `Search Results (${songsToDisplay.length})`;
    } else {
        heading.innerHTML = "Your Library";
    }

    if (songsToDisplay.length === 0) {
        songUl.innerHTML = '<li style="justify-content: center; color: #a1a1a1; border: none; background: transparent;">No songs found</li>';
        return;
    }

    for (const song of songsToDisplay) {
        let li = document.createElement("li");
        // Remove .mp3 extension and decode URL encoding
        let songName = song.replaceAll("%20", " ").replace('.mp3', '');

        li.innerHTML = `
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${songName}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg" alt="">
            </div>
        `;
        // Store the original filename with .mp3 as data attribute
        li.setAttribute('data-filename', song);

        songUl.appendChild(li);
    }

    Array.from(songUl.getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            const filename = e.getAttribute('data-filename');
            if (filename) {
                playMusic(filename);
            }
        });
    });
}

async function main() {
    songs = await getSongs();
    console.log(songs);
    playMusic(songs[0], true);

    displaySongs(songs, false);

    const searchInput = document.querySelector(".searchbox input");
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm === "") {
            displaySongs(songs, false);
        } else {
            const filteredSongs = songs.filter(song =>
                song.toLowerCase().includes(searchTerm)
            );
            displaySongs(filteredSongs, true);
        }
    });

    // Play/Pause button
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    // Update time and seekbar
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".time").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seekbar click
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Previous button
    previous.addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    // Next button
    next.addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    // Add functionality to card play buttons
    document.querySelectorAll(".card .play button").forEach(button => {
        button.addEventListener("click", () => {
            if (songs.length > 0) {
                playMusic(songs[0]);
            }
        });
    });

    // Auto-play next song when current song ends
    currentSong.addEventListener("ended", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        } else {
            // Loop back to first song
            playMusic(songs[0]);
        }
    });
}

main();

// Check if user is logged in and display profile
function checkUserLogin() {
    const user = JSON.parse(localStorage.getItem('spotifyUser'));
    if (user) {
        // Update Sign up and Log in buttons to show user profile
        const navUl = document.querySelector('.nav ul');
        const signupLi = navUl.children[navUl.children.length - 2];
        const loginLi = navUl.children[navUl.children.length - 1];

        // Hide signup
        signupLi.style.display = 'none';

        // Replace login button with user profile
        loginLi.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="showUserMenu()">
                <img src="${user.avatar}" style="width: 32px; height: 32px; border-radius: 50%;" alt="User" />
                <span style="color: white;">${user.name}</span>
            </div>
        `;
    }
}

function showUserMenu() {
    const user = JSON.parse(localStorage.getItem('spotifyUser'));
    if (confirm(`Logged in as ${user.email}\n\nDo you want to log out?`)) {
        localStorage.removeItem('spotifyUser');
        window.location.reload();
    }
}

checkUserLogin();