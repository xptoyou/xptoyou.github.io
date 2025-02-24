<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level Viewer</title>
    <style>
        .grid {
            display: grid;
            grid-template-columns: repeat(40, 20px);
            grid-auto-rows: 20px;
            gap: 1px;
        }
        .tile {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            border: 1px solid black;
        }
        .tile.type-2 { background-color: green; } /* Grass */
        .tile.type-7 { background-color: brown; } /* Dirt */
        .tile.type-10 { background-color: gray; } /* Stone */
    </style>
</head>
<body>
    <h1>Level Viewer</h1>
    <p id="message">Loading level...</p>
    <div class="grid" id="levelGrid"></div>
    <h2>Level Video</h2>
    <video id="levelVideo" width="400" controls style="display:none;"></video>
    
    <script>
        // Get level ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const levelId = urlParams.get("id");
        
        if (!levelId) {
            document.getElementById("message").textContent = "Error: No level ID provided.";
        } else {
            fetch("levels.json") // Load levels.json from GitHub
                .then(response => response.json())
                .then(levels => {
                    if (!levels[levelId]) {
                        document.getElementById("message").textContent = "Error: Level not found.";
                        return;
                    }
                    
                    document.getElementById("message").textContent = `Playing Level: ${levelId}`;
                    const levelData = levels[levelId];
                    const grid = document.getElementById("levelGrid");
                    grid.innerHTML = ""; // Clear grid
                    
                    levelData.tiles.forEach(row => {
                        row.forEach(tile => {
                            const tileElement = document.createElement("div");
                            tileElement.classList.add("tile");
                            tileElement.classList.add(`type-${tile}`);
                            tileElement.textContent = tile;
                            grid.appendChild(tileElement);
                        });
                    });
                    
                    // Load video if available
                    if (levelData.video && levelData.video !== "None") {
                        const videoElement = document.getElementById("levelVideo");
                        videoElement.src = levelData.video;
                        videoElement.style.display = "block";
                    }
                })
                .catch(error => {
                    document.getElementById("message").textContent = "Error loading levels.";
                });
        }
    </script>
</body>
</html>
