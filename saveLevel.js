// Function to generate a random level ID
function generateLevelID() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Function to save a new level
function saveNewLevel(levelData) {
    fetch("levels.json")
        .then(response => response.json())
        .then(levels => {
            const levelID = generateLevelID();
            levels[levelID] = levelData;
            
            // Convert updated levels to JSON
            const updatedLevels = JSON.stringify(levels, null, 4);
            
            // Download updated levels.json file
            const blob = new Blob([updatedLevels], { type: "application/json" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "levels.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Redirect to the new level URL
            window.location.href = `level.html?id=${levelID}`;
        })
        .catch(error => console.error("Error loading levels.json", error));
}
