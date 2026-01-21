// ===================================
// DATA.JS - Database of all cards
// ===================================

var CARDS_DATABASE = {
    disciplines: [
        { id: "0001", name: "Saut d'obstacles - Bronze", category: "disciplines", discipline: "Saut d'obstacles", rarity: "common", color: "#3B82F6", total: 15000, image: "images/cards/cheval-qui-saute.jpg", description: "Épreuve de saut d'obstacles niveau Bronze" },
        { id: "0002", name: "Saut d'obstacles - Argent", category: "disciplines", discipline: "Saut d'obstacles", rarity: "common", color: "#3B82F6", total: 12000, image: "images/cards/mec-qui-saute.jpg", description: "Épreuve de saut d'obstacles niveau Argent" },
        { id: "0003", name: "Saut d'obstacles - Or", category: "disciplines", discipline: "Saut d'obstacles", rarity: "rare", color: "#3B82F6", total: 8000, image: "images/cards/julien-epaillard.jpg", description: "Épreuve de saut d'obstacles niveau Or" },
        { id: "0004", name: "Course de Plat", category: "disciplines", discipline: "Courses", rarity: "common", color: "#F97316", total: 15000, image: "images/cards/frankie-dettori.jpg", description: "Course hippique sur terrain plat" },
        { id: "0005", name: "Course d'Obstacle", category: "disciplines", discipline: "Courses", rarity: "common", color: "#F97316", total: 12000, image: "images/cards/cheval-la.jpg", description: "Course d'obstacles - Steeple-chase" },
        { id: "0006", name: "Dressage Classique", category: "disciplines", discipline: "Dressage", rarity: "common", color: "#10B981", total: 15000, image: "images/cards/coté-1.jpg", description: "Épreuve de dressage classique" },
        { id: "0007", name: "Dressage Artistique", category: "disciplines", discipline: "Dressage", rarity: "rare", color: "#10B981", total: 8000, image: "images/cards/penelope.jpg", description: "Dressage artistique et chorégraphie équestre" },
        { id: "0008", name: "Western - Reining", category: "disciplines", discipline: "Western", rarity: "rare", color: "#8B5CF6", total: 5000, image: "images/cards/cheval-qui-saute.jpg", description: "Discipline western - Reining" },
        { id: "0009", name: "Western - Barrel Racing", category: "disciplines", discipline: "Western", rarity: "ultra-rare", color: "#8B5CF6", total: 3000, image: "images/cards/mec-qui-saute.jpg", description: "Course de barils - Barrel Racing" }
    ],
    cavaliers: [
        { id: "0010", name: "Pénélope Leprevost", category: "cavaliers", type: "actif", rarity: "common", discipline: "Saut d'obstacles", nationality: "🇫🇷", total: 12000, image: "images/cards/penelope-leprevost.png", description: "Cavalière française de saut d'obstacles, multiple médaillée olympique" },
        { id: "0011", name: "Pauline Basquin", category: "cavaliers", type: "actif", rarity: "common", discipline: "Saut d'obstacles", nationality: "🇫🇷", total: 12000, image: "images/cards/penelope.jpg", description: "Jeune talent du saut d'obstacles français" },
        { id: "0012", name: "Gaspard Maksud", category: "cavaliers", type: "actif", rarity: "common", discipline: "Saut d'obstacles", nationality: "🇫🇷", total: 10000, image: "images/cards/mec-qui-saute.jpg", description: "Cavalier professionnel de saut d'obstacles" },
        { id: "0013", name: "Kevin Staut", category: "cavaliers", type: "actif", rarity: "rare", discipline: "Saut d'obstacles", nationality: "🇫🇷", total: 7000, image: "images/cards/julien-epaillard.jpg", description: "Champion de saut d'obstacles, médaillé olympique" },
        { id: "0014", name: "Simon Delestre", category: "cavaliers", type: "actif", rarity: "rare", discipline: "Saut d'obstacles", nationality: "🇫🇷", total: 7000, image: "images/cards/mec-qui-saute.jpg", description: "Grand cavalier français, multiple vainqueur de Grand Prix" },
        { id: "0015", name: "Julien Épaillard", category: "cavaliers", type: "actif", rarity: "rare", discipline: "Saut d'obstacles", nationality: "🇫🇷", total: 6000, image: "images/cards/julien-epaillard.jpg", description: "Champion olympique et vainqueur de nombreux Grand Prix" },
        { id: "0016", name: "Martin Fuchs", category: "cavaliers", type: "actif", rarity: "ultra-rare", discipline: "Saut d'obstacles", nationality: "🇨🇭", total: 3000, image: "images/cards/cheval-qui-saute.jpg", description: "Star suisse du saut d'obstacles" },
        { id: "0017", name: "Isabell Werth", category: "cavaliers", type: "actif", rarity: "ultra-rare", discipline: "Dressage", nationality: "🇩🇪", total: 3000, image: "images/cards/coté-1.jpg", description: "Légende vivante du dressage, multiple championne olympique" },
        { id: "0018", name: "Pierre Durand", category: "cavaliers", type: "legende", rarity: "legendary", discipline: "Saut d'obstacles", nationality: "🇫🇷", total: 500, image: "images/cards/frankie-dettori.jpg", description: "Champion olympique 1988 avec Jappeloup - Légende française" },
        { id: "0019", name: "Michel Robert", category: "cavaliers", type: "legende", rarity: "legendary", discipline: "Saut d'obstacles", nationality: "🇫🇷", total: 500, image: "images/cards/mec-qui-saute.jpg", description: "Figure emblématique du saut d'obstacles français" },
        { id: "0020", name: "John Whitaker", category: "cavaliers", type: "legende", rarity: "legendary", discipline: "Saut d'obstacles", nationality: "🇬🇧", total: 400, image: "images/cards/julien-epaillard.jpg", description: "Légende britannique du saut d'obstacles avec Milton" }
    ],
    chevaux: [
        { id: "0021", name: "Big Star", category: "chevaux", type: "recent", rarity: "rare", discipline: "Saut d'obstacles", cavalier: "Nick Skelton", total: 7000, image: "images/cards/cheval-la.jpg", description: "Cheval champion olympique 2016" },
        { id: "0022", name: "Explosion W", category: "chevaux", type: "recent", rarity: "rare", discipline: "Saut d'obstacles", cavalier: "Peder Fredricson", total: 7000, image: "images/cards/cheval-qui-saute.jpg", description: "Champion suédois de saut d'obstacles" },
        { id: "0023", name: "Dalera", category: "chevaux", type: "recent", rarity: "rare", discipline: "Dressage", cavalier: "Jessica von Bredow-Werndl", total: 6000, image: "images/cards/coté-1.jpg", description: "Jument de dressage médaillée olympique" },
        { id: "0024", name: "Jappeloup", category: "chevaux", type: "legendaire", rarity: "legendary", discipline: "Saut d'obstacles", cavalier: "Pierre Durand", total: 500, years: "1980-1991", image: "images/cards/cheval-qui-saute.jpg", description: "Légende olympique française - Champion 1988" },
        { id: "0025", name: "Totilas", category: "chevaux", type: "legendaire", rarity: "mythic", discipline: "Dressage", cavalier: "Edward Gal", total: 200, years: "2000-2020", image: "images/cards/cheval-la.jpg", description: "Phénomène du dressage mondial" },
        { id: "0026", name: "Milton", category: "chevaux", type: "legendaire", rarity: "legendary", discipline: "Saut d'obstacles", cavalier: "John Whitaker", total: 350, image: "images/cards/cheval-la.jpg", description: "Légendaire cheval gris de John Whitaker" }
    ],
    duos: [
        { id: "0027", name: "Pierre Durand × Jappeloup", category: "duos", rarity: "mythic", discipline: "Saut d'obstacles", total: 200, image: "images/cards/julien-epaillard.jpg", description: "Duo légendaire olympique 1988 - Histoire de légende" }
    ],
    moments: [
        { id: "0028", name: "Finale Olympique 1988", category: "moments", rarity: "ultra-rare", discipline: "Saut d'obstacles", total: 1000, temporary: true, image: "images/cards/mec-qui-saute.jpg", description: "Le parcours sans faute historique de Jappeloup" }
    ],
    event: [
        { id: "0029", name: "Salon du Cheval 2025", category: "event", rarity: "rare", total: 5000, eventOnly: true, image: "images/cards/cheval-la.jpg", description: "Carte exclusive Salon du Cheval 2025" },
        { id: "0030", name: "Spectacle Équestre 2026", category: "event", rarity: "ultra-rare", total: 2000, eventOnly: true, image: "images/cards/frankie-dettori.jpg", description: "Carte exclusive Spectacle Équestre 2026" }
    ]
};

// Rarity weights for pack opening
var RARITY_WEIGHTS = RARITY_WEIGHTS || {
    starter: {
        common: 0.75,
        rare: 0.20,
        'ultra-rare': 0.04,
        legendary: 0.01,
        mythic: 0.001
    },
    premium: {
        common: 0.45,
        rare: 0.35,
        'ultra-rare': 0.15,
        legendary: 0.04,
        mythic: 0.01
    },
    legendary: {
        common: 0.20,
        rare: 0.40,
        'ultra-rare': 0.25,
        legendary: 0.12,
        mythic: 0.03
    },
    event: {
        common: 0.10,
        rare: 0.30,
        'ultra-rare': 0.35,
        legendary: 0.20,
        mythic: 0.05
    }
};

// Get all cards as flat array
function getAllCards() {
    const allCards = [];
    Object.keys(CARDS_DATABASE).forEach(category => {
        CARDS_DATABASE[category].forEach(card => {
            allCards.push(card);
        });
    });
    return allCards;
}

// Get card by ID
function getCardById(id) {
    const allCards = getAllCards();
    return allCards.find(card => card.id === id);
}

// Get cards by category
function getCardsByCategory(category) {
    return CARDS_DATABASE[category] || [];
}

// Get cards by rarity
function getCardsByRarity(rarity) {
    return getAllCards().filter(card => card.rarity === rarity);
}

// Hash function for secret codes
function generateSecretCode(cardId) {
    // Utiliser directement l'ID avec un préfixe pour garantir l'unicité
    // Format: SC + cardId padded to 6 chars = 8 chars total
    const prefix = 'SC';
    const paddedId = cardId.toString().padStart(6, '0');
    return (prefix + paddedId).substring(0, 8).toUpperCase();
}

function validateSecretCode(secretCode) {
    const code = secretCode.toUpperCase();
    
    // Format attendu: SC + 6 chiffres (ex: SC000001)
    if (code.startsWith('SC') && code.length === 8) {
        // Extraire l'ID en enlevant le préfixe et les zéros initiaux
        const cardId = code.substring(2).replace(/^0+/, '') || '0';
        const card = getCardById(cardId);
        if (card) {
            return card.id;
        }
    }
    
    return null;
}
