# Spotify Clone

A fully functional Spotify web player clone built with HTML, CSS, and vanilla JavaScript.

## Features

- **Music Player Controls**: Play, pause, next, and previous buttons
- **Song Library**: Display list of available songs with play functionality
- **Seekbar**: Click to jump to any part of the song
- **Auto-play**: Automatically plays the next song when current song ends
- **Responsive Cards**: Hover effects on playlist cards
- **Time Display**: Shows current time and total duration
- **Interactive UI**: Smooth transitions and hover effects

## How to Use

1. Open `index.html` in a web browser
2. Click on any song in the library to play it
3. Use the playbar controls at the bottom to:
   - Play/Pause the current song
   - Skip to next or previous song
   - Seek through the song by clicking on the seekbar
4. Click on playlist cards to start playing from the first song

## Project Structure

```
Spotifyclone/
├── index.html          # Main HTML file
├── style.css           # Main stylesheet
├── utility.css         # Utility classes
├── script.js           # JavaScript functionality
├── Songs/              # Music files folder
└── *.svg               # Icon files
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Audio API

## Notes

- Songs are loaded from the `Songs/` folder
- The player automatically loops back to the first song after the last one
- All SVG icons are included for UI elements
