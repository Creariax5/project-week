// ===================================
// DATA.JS - Database loader from JSON
// ===================================

// Cards data loaded from cards-database.json
// This is auto-synchronized with cards-database.json
var CARDS_DATA = [
    {"id":"0001","name":"Pénélope Leprevost","category":"cavaliers","type":"actif","rarity":"common","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":12000,"image":"images/cards/Carte 1 pénélope-1.png","imageBack":"images/cards/Carte 1 pénélope-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0001","description":"Cavalière française de saut d'obstacles, multiple médaillée olympique"},
    {"id":"0002","name":"Jappeloup","category":"chevaux","type":"legendaire","rarity":"legendary","discipline":"Saut d'obstacles","cavalier":"Pierre Durand","total":500,"years":"1980-1991","image":"images/cards/Carte 2 jappeloup-1.png","imageBack":"images/cards/Carte 2 jappeloup-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0002","description":"Légende olympique française - Champion 1988"},
    {"id":"0003","name":"Charlotte Dujardin","category":"cavaliers","type":"actif","rarity":"ultra-rare","discipline":"Dressage","nationality":"🇬🇧","total":3000,"image":"images/cards/carte 3 coté charlotte-1.png","imageBack":"images/cards/carte 3 coté charlotte-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0003","description":"Cavalière britannique de dressage, multiple championne olympique"},
    {"id":"0004","name":"Nicolas Delmotte","category":"cavaliers","type":"actif","rarity":"rare","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":7000,"image":"images/cards/Carte 4 coté nicola-1.png","imageBack":"images/cards/Carte 4 coté nicola-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0004","description":"Cavalier français de saut d'obstacles, médaillé olympique"},
    {"id":"0005","name":"Urvoso du Roch","category":"chevaux","type":"recent","rarity":"rare","discipline":"Saut d'obstacles","cavalier":"Nicolas Delmotte","total":7000,"image":"images/cards/Carte 5 coté cheval de nicolas-1.png","imageBack":"images/cards/Carte 5 coté cheval de nicolas-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0005","description":"Cheval de Nicolas Delmotte"},
    {"id":"0006","name":"Julien Épaillard","category":"cavaliers","type":"actif","rarity":"rare","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":6000,"image":"images/cards/Carte 6 Julien-1.png","imageBack":"images/cards/Carte 6 Julien-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0006","description":"Champion olympique et vainqueur de nombreux Grand Prix"},
    {"id":"0007","name":"Frankie Dettori","category":"cavaliers","type":"legende","rarity":"legendary","discipline":"Courses","nationality":"🇮🇹","total":500,"image":"images/cards/Carte 7 frankie-1.png","imageBack":"images/cards/Carte 7 frankie-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0007","description":"Jockey légendaire italien, multiple vainqueur de courses prestigieuses"},
    {"id":"0008","name":"Pauline Basquin","category":"cavaliers","type":"actif","rarity":"common","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":12000,"image":"images/cards/Carte 8 Pauline-1.png","imageBack":"images/cards/Carte 8 Pauline-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0008","description":"Jeune talent du saut d'obstacles français"},
    {"id":"0009","name":"Gaspard Maksud","category":"cavaliers","type":"actif","rarity":"common","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":10000,"image":"images/cards/Carte 9 Gaspard-1.png","imageBack":"images/cards/Carte 9 Gaspard-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0009","description":"Cavalier professionnel de saut d'obstacles"},
    {"id":"0010","name":"Manon Deshayes","category":"cavaliers","type":"actif","rarity":"common","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":12000,"image":"images/cards/Carte 10 manon-1.png","imageBack":"images/cards/Carte 10 manon-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0010","description":"Cavalière française de saut d'obstacles"},
    {"id":"0011","name":"Kevin Staut","category":"cavaliers","type":"actif","rarity":"common","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":12000,"image":"images/cards/Carte 11 Kevin-1.png","imageBack":"images/cards/Carte 11 Kevin-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0011","description":"Champion de saut d'obstacles, médaillé olympique"},
    {"id":"0012","name":"Kevin Staut - Édition Or","category":"cavaliers","type":"actif","rarity":"ultra-rare","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":3000,"image":"images/cards/Carte 12 Kevin or-1.png","imageBack":"images/cards/Carte 12 Kevin or-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0012","description":"Champion de saut d'obstacles, médaillé olympique - Édition Or"},
    {"id":"0013","name":"Nina Mallevaey","category":"cavaliers","type":"actif","rarity":"common","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":12000,"image":"images/cards/Carte 13 nina-1.png","imageBack":"images/cards/Carte 13 nina-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0013","description":"Jeune cavalière française prometteuse en saut d'obstacles"},
    {"id":"0014","name":"Nina Mallevaey - Édition Or","category":"cavaliers","type":"actif","rarity":"ultra-rare","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":3000,"image":"images/cards/Carte 14 nina or-1.png","imageBack":"images/cards/Carte 14 nina or-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0014","description":"Jeune cavalière française prometteuse en saut d'obstacles - Édition Or"},
    {"id":"0015","name":"Nina Mallevaey - Action","category":"cavaliers","type":"actif","rarity":"rare","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":7000,"image":"images/cards/Carte 15 nina coté-1.png","imageBack":"images/cards/Carte 15 nina coté-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0015","description":"Jeune cavalière française en action"},
    {"id":"0016","name":"Ace Impact","category":"chevaux","type":"recent","rarity":"ultra-rare","discipline":"Courses","cavalier":"Jockey","total":3000,"image":"images/cards/Carte 16 Ace impact-1.png","imageBack":"images/cards/Carte 16 Ace impact-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0016","description":"Cheval de course champion"},
    {"id":"0017","name":"Totilas","category":"chevaux","type":"legendaire","rarity":"mythic","discipline":"Dressage","cavalier":"Edward Gal","total":200,"years":"2000-2020","image":"images/cards/Carte 17 totilas-1.png","imageBack":"images/cards/Carte 17 totilas-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0017","description":"Phénomène du dressage mondial"},
    {"id":"0018","name":"Nina Mallevaey - Édition Or Spéciale","category":"cavaliers","type":"actif","rarity":"legendary","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":500,"image":"images/cards/Carte 18 nina coté or-1.png","imageBack":"images/cards/Carte 18 nina coté or-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0018","description":"Jeune cavalière française prometteuse - Édition Or Spéciale"},
    {"id":"0019","name":"Kevin Staut - Coldplay","category":"duos","type":"legendaire","rarity":"legendary","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":500,"image":"images/cards/Carte 19 Kevin cold-1.png","imageBack":"images/cards/Carte 19 Kevin cold-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0019","description":"Duo légendaire Kevin Staut et son cheval Coldplay"},
    {"id":"0020","name":"Milton - Édition Or","category":"chevaux","type":"legendaire","rarity":"legendary","discipline":"Saut d'obstacles","cavalier":"John Whitaker","total":400,"image":"images/cards/Carte 20 Milton or-1.png","imageBack":"images/cards/Carte 20 Milton or-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0020","description":"Légendaire cheval gris de John Whitaker - Édition Or"},
    {"id":"0021","name":"Jappeloup - Édition Or","category":"chevaux","type":"legendaire","rarity":"mythic","discipline":"Saut d'obstacles","cavalier":"Pierre Durand","total":200,"years":"1980-1991","image":"images/cards/Carte 21 jappeloup or-1.png","imageBack":"images/cards/Carte 21 jappeloup or-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0021","description":"Légende olympique française - Champion 1988 - Édition Or"},
    {"id":"0022","name":"Pénélope Leprevost - Édition Argent","category":"cavaliers","type":"actif","rarity":"ultra-rare","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":3000,"image":"images/cards/Carte 22 pénélope argent-1.png","imageBack":"images/cards/Carte 22 pénélope argent-2.png","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0022","description":"Cavalière française de saut d'obstacles, multiple médaillée olympique - Édition Argent"},
    {"id":"0023","name":"Big Star","category":"chevaux","type":"recent","rarity":"rare","discipline":"Saut d'obstacles","cavalier":"Nick Skelton","total":7000,"image":"images/cards/cheval-la.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0023","description":"Cheval champion olympique 2016"},
    {"id":"0024","name":"Explosion W","category":"chevaux","type":"recent","rarity":"rare","discipline":"Saut d'obstacles","cavalier":"Peder Fredricson","total":7000,"image":"images/cards/cheval-qui-saute.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0024","description":"Champion suédois de saut d'obstacles"},
    {"id":"0025","name":"Dalera","category":"chevaux","type":"recent","rarity":"rare","discipline":"Dressage","cavalier":"Jessica von Bredow-Werndl","total":6000,"image":"images/cards/coté-1.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0025","description":"Jument de dressage médaillée olympique"},
    {"id":"0026","name":"Pierre Durand","category":"cavaliers","type":"legende","rarity":"legendary","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":500,"image":"images/cards/frankie-dettori.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0026","description":"Champion olympique 1988 avec Jappeloup - Légende française"},
    {"id":"0027","name":"Michel Robert","category":"cavaliers","type":"legende","rarity":"legendary","discipline":"Saut d'obstacles","nationality":"🇫🇷","total":500,"image":"images/cards/mec-qui-saute.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0027","description":"Figure emblématique du saut d'obstacles français"},
    {"id":"0028","name":"John Whitaker","category":"cavaliers","type":"legende","rarity":"legendary","discipline":"Saut d'obstacles","nationality":"🇬🇧","total":400,"image":"images/cards/julien-epaillard.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0028","description":"Légende britannique du saut d'obstacles avec Milton"},
    {"id":"0029","name":"Pierre Durand × Jappeloup","category":"duos","rarity":"mythic","discipline":"Saut d'obstacles","total":200,"image":"images/cards/julien-epaillard.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0029","description":"Duo légendaire olympique 1988 - Histoire de légende"},
    {"id":"0030","name":"Finale Olympique 1988","category":"moments","rarity":"ultra-rare","discipline":"Saut d'obstacles","total":1000,"temporary":true,"image":"images/cards/mec-qui-saute.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0030","description":"Le parcours sans faute historique de Jappeloup"},
    {"id":"0031","name":"Salon du Cheval 2025","category":"event","rarity":"rare","total":5000,"eventOnly":true,"image":"images/cards/cheval-la.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0031","description":"Carte exclusive Salon du Cheval 2025"},
    {"id":"0032","name":"Spectacle Équestre 2026","category":"event","rarity":"ultra-rare","total":2000,"eventOnly":true,"image":"images/cards/frankie-dettori.jpg","qrUrl":"https://creariax5.github.io/project-week/card-detail.html?id=0032","description":"Carte exclusive Spectacle Équestre 2026"}
];

// Organize cards by category
var CARDS_DATABASE = {
    cavaliers: [],
    chevaux: [],
    duos: [],
    moments: [],
    event: [],
    disciplines: []
};

// Initialize database from cards data
(function() {
    CARDS_DATA.forEach(function(card) {
        var category = card.category || 'other';
        if (!CARDS_DATABASE[category]) {
            CARDS_DATABASE[category] = [];
        }
        CARDS_DATABASE[category].push(card);
    });
})();

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

// Placeholder function for compatibility (no async loading needed)
async function loadCardsDatabase() {
    return CARDS_DATABASE;
}

// Get all cards as flat array
function getAllCards() {
    return CARDS_DATA;
}

// Get card by ID
function getCardById(id) {
    return CARDS_DATA.find(function(card) { return card.id === id; });
}

// Get cards by category
function getCardsByCategory(category) {
    return CARDS_DATABASE[category] || [];
}

// Get cards by rarity
function getCardsByRarity(rarity) {
    return CARDS_DATA.filter(function(card) { return card.rarity === rarity; });
}

// Hash function for secret codes
function generateSecretCode(cardId) {
    // Utiliser directement l'ID avec un préfixe pour garantir l'unicité
    // Format: SC + cardId padded to 6 chars = 8 chars total
    var prefix = 'SC';
    var paddedId = cardId.toString().padStart(6, '0');
    return (prefix + paddedId).substring(0, 8).toUpperCase();
}

function validateSecretCode(secretCode) {
    var code = secretCode.toUpperCase().trim();
    
    // Accepter différents formats: SC0001, SC00001, SC000001, etc.
    if (code.startsWith('SC') && code.length >= 3) {
        // Extraire la partie numérique après SC
        var numericPart = code.substring(2);
        
        // Vérifier que c'est bien des chiffres
        if (/^\d+$/.test(numericPart)) {
            // Convertir en nombre puis reformater avec 4 chiffres (format des IDs dans la base)
            var cardNumber = parseInt(numericPart, 10);
            var cardId = cardNumber.toString().padStart(4, '0');
            
            // Chercher la carte avec cet ID
            var card = getCardById(cardId);
            if (card) {
                return card.id;
            }
        }
    }
    
    // Si pas de préfixe SC, essayer directement comme un nombre
    if (/^\d+$/.test(code)) {
        var cardNumber = parseInt(code, 10);
        var cardId = cardNumber.toString().padStart(4, '0');
        var card = getCardById(cardId);
        if (card) {
            return card.id;
        }
    }
    
    return null;
}
