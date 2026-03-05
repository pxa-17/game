# 🎭 THE HAUNTED GALLERY

A terrifyingly fun game where your friend explores a dark, haunted art gallery to find hidden caricature portraits!

## 🎮 How to Play

1. Open `index.html` in any modern web browser
2. Click **"ENTER THE DARKNESS"** to start
3. Use **WASD** or **Arrow Keys** to move
4. Your flashlight reveals the darkness - explore carefully!
5. Find all **42 hidden portraits** to escape
6. When you find a portrait, click **"Download Image"** to save it!

## ⚠️ Warning: It Gets Scary!

- The gallery is pitch black with only your flashlight
- Creeping stalkers hunt you in the dark
- If they catch you... **jumpscare!**
- But don't worry - you keep all found portraits even if caught!

## 🖼️ Adding Your Caricature Images

The game comes with placeholder portraits. Here's how to add your real caricatures:

### Step 1: Prepare Your Images
- Put all your caricature images in an `images/` folder
- Name them sequentially: `portrait-1.png`, `portrait-2.png`, etc.
- Supported formats: PNG, JPG, WebP
- For best results, use images around 500x500px

### Step 2: Update the Code

Open `index.html` and find the `generateRewards()` function. Look for this section:

```javascript
// Around line 280
const placeholder = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect fill="%23111" width="300" height="300"/><text fill="%23666" x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="monospace">Portrait #${reward.id + 1}</text></svg>`;

img.src = reward.imageData || placeholder;
```

### Step 3: Easy Image Loading

Add this JavaScript at the top of the script (before `generateRewards`):

```javascript
// Store your image paths here
const imagePaths = [];
for (let i = 1; i <= 42; i++) {
    imagePaths.push(`images/portrait-${i}.png`); // Adjust filename as needed
}

// Preload images
const loadedImages = [];
let imagesLoaded = 0;

function preloadImages() {
    imagePaths.forEach((path, index) => {
        const img = new Image();
        img.onload = () => {
            loadedImages[index] = img;
            imagesLoaded++;
        };
        img.onerror = () => {
            loadedImages[index] = null;
            imagesLoaded++;
        };
        img.src = path;
    });
}

// Then update showReward function to use loadedImages
img.src = loadedImages[reward.id] ? loadedImages[reward.id].src : placeholder;

// And update the gallery too!
```

### Step 4: Customizing the Jokes

Find the `getJokeText()` function and replace the jokes array with your personalized inside jokes:

```javascript
const jokes = [
    "Remember when you tried to cook? 🔥",
    "Your dancing is... unique 💃",
    // Add up to 42 personalized jokes!
];
```

## 🎯 Features

- ✅ **42 Hidden Portraits** scattered across a massive dark map
- ✅ **Genuinely Scary Enemies** that hunt you
- ✅ **Download Button** for each found portrait
- ✅ **Gallery** to view all collected portraits
- ✅ **Save Progress** - game saves automatically
- ✅ **Heartbeat Sensor** - pulses when near unfound portraits
- ✅ **Atmospheric Sound** - creepy ambient audio
- ✅ **Jumpscares** - for the thrill factor!

## 🚀 Hosting for Your Friend

To share this as a surprise:

1. **Option A - GitHub Pages (Free)**
   - Create a GitHub repository
   - Upload all files
   - Go to Settings > Pages > Deploy from main branch
   - Send the link to your friend!

2. **Option B - Vercel (Free)**
   - Drag and drop the folder to Vercel.com
   - Get your instant link

3. **Option C - Local (For testing)**
   - Just open index.html in browser
   - Host locally if you want them to play on the same computer

## 🔧 Troubleshooting

**Images not loading?**
- Check browser console (F12) for errors
- Make sure image paths are correct and relative to index.html

**Sound not working?**
- Click anywhere on the page first (browser autoplay policy)

**Game too scary/easy?**
- Adjust `flashlightRadius` for more/less visibility
- Adjust `enemy.speed` for faster/slower monsters

---

*Made with ❤️ for an awesome friend!*
