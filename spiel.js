// raketenspiel.js

// Wähle das Spielfeld und die Rakete aus
const spielfeld = document.getElementById('spielfeld');
const rakete = document.getElementById('rakete');

// Initiale Position und Winkel der Rakete
let raketePosition = {
    x: spielfeld.offsetWidth / 2,
    y: spielfeld.offsetHeight / 2,
    winkel: 0
};

// Geschwindigkeit und Beschleunigung der Rakete
let geschwindigkeit = {
    x: 0,
    y: 0
};
const schub = 0.1;
const gravitation = 0.05;

// Funktion zum Drehen der Rakete
function dreheRakete(richtung) {
    if (richtung === 'links') {
        raketePosition.winkel -= 5;
    } else if (richtung === 'rechts') {
        raketePosition.winkel += 5;
    }
    rakete.style.transform = `translate(-50%, -50%) rotate(${raketePosition.winkel}deg)`;
}

// Funktion zum Schub der Rakete
function gibSchub() {
    geschwindigkeit.x += schub * Math.sin(raketePosition.winkel * Math.PI / 180);
    geschwindigkeit.y -= schub * Math.cos(raketePosition.winkel * Math.PI / 180);
}

// Funktion zur Aktualisierung der Raketenposition
function aktualisierePosition() {
    // Gravitation hinzufügen
    geschwindigkeit.y += gravitation;

    // Neue Position berechnen
    raketePosition.x += geschwindigkeit.x;
    raketePosition.y += geschwindigkeit.y;

    // Begrenzungen des Spielfelds beachten
    if (raketePosition.x < 0) raketePosition.x = 0;
    if (raketePosition.x > spielfeld.offsetWidth) raketePosition.x = spielfeld.offsetWidth;
    if (raketePosition.y < 0) raketePosition.y = 0;
    if (raketePosition.y > spielfeld.offsetHeight) raketePosition.y = spielfeld.offsetHeight;

    // Rakete auf der neuen Position setzen
    rakete.style.left = raketePosition.x + 'px';
    rakete.style.top = raketePosition.y + 'px';
}

// Event-Listener für Tastendrücke
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            dreheRakete('links');
            break;
        case 'ArrowRight':
            dreheRakete('rechts');
            break;
        case 'ArrowUp':
            gibSchub();
            break;
    }
});

// Aktualisiere die Position der Rakete in regelmäßigen Abständen
setInterval(aktualisierePosition, 20);
