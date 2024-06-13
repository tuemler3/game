// spiel.js

// Wähle das Spielfeld und die Spielfiguren aus
const spielfeld = document.getElementById('spielfeld');
const spieler = document.getElementById('spieler');
const punkt = document.getElementById('punkt');

// Initiale Position des Spielers
let spielerPosition = {
    left: 0,
    top: 0
};

// Geschwindigkeit des Spielers
const schrittGroesse = 20;

// Funktion zum Bewegen des Spielers
function bewegeSpieler(e) {
    switch(e.key) {
        case 'ArrowUp':
            if (spielerPosition.top > 0) {
                spielerPosition.top -= schrittGroesse;
            }
            break;
        case 'ArrowDown':
            if (spielerPosition.top < spielfeld.offsetHeight - spieler.offsetHeight) {
                spielerPosition.top += schrittGroesse;
            }
            break;
        case 'ArrowLeft':
            if (spielerPosition.left > 0) {
                spielerPosition.left -= schrittGroesse;
            }
            break;
        case 'ArrowRight':
            if (spielerPosition.left < spielfeld.offsetWidth - spieler.offsetWidth) {
                spielerPosition.left += schrittGroesse;
            }
            break;
    }
    spieler.style.top = spielerPosition.top + 'px';
    spieler.style.left = spielerPosition.left + 'px';
    ueberpruefeKollision();
}

// Funktion zur Überprüfung der Kollision
function ueberpruefeKollision() {
    const spielerRect = spieler.getBoundingClientRect();
    const punktRect = punkt.getBoundingClientRect();

    if (spielerRect.left < punktRect.right &&
        spielerRect.right > punktRect.left &&
        spielerRect.top < punktRect.bottom &&
        spielerRect.bottom > punktRect.top) {
        alert('Punkt gesammelt!');
        // Neuen Punkt an zufälliger Position platzieren
        platzierenPunkt();
    }
}

// Funktion zum Platzieren des Punkts an einer zufälligen Position
function platzierenPunkt() {
    const maxLeft = spielfeld.offsetWidth - punkt.offsetWidth;
    const maxTop = spielfeld.offsetHeight - punkt.offsetHeight;
    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop);
    punkt.style.left = randomLeft + 'px';
    punkt.style.top = randomTop + 'px';
}

// Event-Listener für Tastendrücke
document.addEventListener('keydown', bewegeSpieler);

// Initialer Punkt platzieren
platzierenPunkt();
