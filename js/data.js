// ===================================
// DATA.JS - Database of all cards
// ===================================

var CARDS_DATABASE = {
    disciplines: [],
    cavaliers: [],
    chevaux: [],
    duos: [],
    moments: [],
    event: []
};
var CARDS_LOADED = false;

// Load cards from JSON file
async function loadCardsDatabase() {
    if (CARDS_LOADED) return CARDS_DATABASE;
    
    try {
        const response = await fetch('cards-database.json');
        const data = await response.json();
        
        // Group cards by category
        CARDS_DATABASE = {
            disciplines: [],
            cavaliers: [],
            chevaux: [],
            duos: [],
            moments: [],
            event: []
        };
        
        data.cards.forEach(card => {
            const category = card.category;
            if (CARDS_DATABASE[category]) {
                CARDS_DATABASE[category].push(card);
            }
        });
        
        CARDS_LOADED = true;
        console.log('Cards database loaded:', data.cards.length, 'cards');
        return CARDS_DATABASE;
    } catch (error) {
        console.error('Error loading cards database:', error);
        // Fallback to empty database
        CARDS_DATABASE = {
            disciplines: [],
            cavaliers: [],
            chevaux: [],
            duos: [],
            moments: [],
            event: []
        };
        return CARDS_DATABASE;
    }
}

// Initialize database on load
loadCardsDatabase();

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
