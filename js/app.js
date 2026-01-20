// ===================================
// APP.JS - Single Page Application
// ===================================

let currentPage = 'home';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    updateStats();
});

function initApp() {
    // Initialize home page
    loadFeaturedCards();
    updateHomeStats();
    
    // Initialize shop
    initShop();
    
    // Initialize scanner
    initScan();
    
    // Initialize collection
    initCollection();
    
    // Update header stats periodically
    setInterval(updateStats, 1000);
}

// Navigation
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected page
    const pageElement = document.getElementById(`page-${page}`);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    currentPage = page;
    
    // Page-specific actions
    if (page === 'collection') {
        loadCollection();
    } else if (page === 'scan') {
        loadRecentScans();
    } else if (page === 'home') {
        updateHomeStats();
        loadFeaturedCards();
    } else if (page === 'shop') {
        updateShopCredits();
    }
}

// Update stats in header
function updateStats() {
    const credits = Credits.getBalance();
    const totalCards = UserCollection.getTotalCards();
    
    document.getElementById('header-credits').textContent = credits;
    document.getElementById('header-cards').textContent = totalCards;
}

// ===================================
// HOME PAGE
// ===================================

function updateHomeStats() {
    const totalCards = UserCollection.getTotalCards();
    const uniqueCards = UserCollection.getUniqueCards();
    const completion = UserCollection.getCompletionRate();
    const credits = Credits.getBalance();
    
    document.getElementById('total-cards-stat').textContent = totalCards;
    document.getElementById('unique-cards-stat').textContent = uniqueCards;
    document.getElementById('completion-stat').textContent = completion + '%';
    document.getElementById('credits-stat').textContent = credits;
}

function loadFeaturedCards() {
    const container = document.getElementById('featured-cards');
    if (!container) return;
    
    const allCards = getAllCards();
    const featured = allCards
        .filter(card => ['legendary', 'mythic', 'ultra-rare'].includes(card.rarity))
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
    container.innerHTML = '';
    
    featured.forEach(card => {
        const owned = UserCollection.hasCard(card.id);
        const cardEl = document.createElement('div');
        cardEl.className = `featured-card ${card.rarity} ${owned ? 'owned' : 'locked'}`;
        cardEl.innerHTML = `
            <div class="card-image-wrapper">
                ${card.image ? `<img src="${card.image}" alt="${card.name}" loading="lazy" decoding="async">` : ''}
            </div>
            <div class="card-info-overlay">
                <h3>${card.name}</h3>
                <span class="rarity-badge">${getRarityLabel(card.rarity)}</span>
            </div>
        `;
        
        cardEl.addEventListener('click', () => {
            if (owned) {
                window.location.href = `card-detail.html?id=${card.id}`;
            }
        });
        
        container.appendChild(cardEl);
    });
}

// ===================================
// SHOP PAGE
// ===================================

function initShop() {
    const packsGrid = document.getElementById('packs-grid');
    if (!packsGrid) return;
    
    const packs = [
        {
            id: 'starter',
            name: 'Pack Débutant',
            price: 100,
            cards: 5,
            description: 'Parfait pour commencer',
            icon: '📦',
            color: '#3B82F6'
        },
        {
            id: 'premium',
            name: 'Pack Premium',
            price: 300,
            cards: 5,
            description: 'Plus de chances de cartes rares',
            icon: '🎁',
            color: '#8B5CF6'
        }
    ];
    
    packsGrid.innerHTML = packs.map(pack => `
        <div class="pack-card" style="border-color: ${pack.color}">
            <div class="pack-icon" style="color: ${pack.color}">${pack.icon}</div>
            <h3 class="pack-name">${pack.name}</h3>
            <p class="pack-description">${pack.description}</p>
            <div class="pack-details">
                <span class="pack-cards">${pack.cards} cartes</span>
                <span class="pack-price">${pack.price} 💰</span>
            </div>
            <button class="buy-pack-btn" onclick="buyPack('${pack.id}', ${pack.price})">
                Acheter
            </button>
        </div>
    `).join('');
}

function updateShopCredits() {
    const credits = Credits.getBalance();
    const creditsDisplay = document.getElementById('shop-credits');
    if (creditsDisplay) {
        creditsDisplay.textContent = credits;
    }
}

function buyPack(packType, price) {
    if (!Credits.canAfford(price)) {
        showToast('Crédits insuffisants !', 'error');
        return;
    }
    
    Credits.subtract(price);
    updateShopCredits();
    updateStats();
    
    const cards = PackOpening.openPack(packType);
    
    cards.forEach(card => {
        UserCollection.addCard(card.id);
    });
    
    showPackOpening(cards);
}

function showPackOpening(cards) {
    const modal = document.getElementById('pack-modal');
    const container = document.getElementById('pack-cards-container');
    
    container.innerHTML = `
        <h2>Pack ouvert ! 🎉</h2>
        <div class="opened-cards">
            ${cards.map(card => `
                <div class="opened-card ${card.rarity}">
                    <div class="card-image">
                        ${card.image ? `<img src="${card.image}" alt="${card.name}" loading="lazy">` : ''}
                    </div>
                    <h3>${card.name}</h3>
                    <span class="rarity-badge">${getRarityLabel(card.rarity)}</span>
                </div>
            `).join('')}
        </div>
        <button class="primary-btn" onclick="closePackModal()">Continuer</button>
    `;
    
    modal.classList.add('active');
}

function closePackModal() {
    document.getElementById('pack-modal').classList.remove('active');
    updateHomeStats();
}

// ===================================
// COLLECTION PAGE
// ===================================

function initCollection() {
    const categoryFilter = document.getElementById('category-filter');
    const rarityFilter = document.getElementById('rarity-filter');
    const ownedFilter = document.getElementById('owned-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', loadCollection);
    }
    if (rarityFilter) {
        rarityFilter.addEventListener('change', loadCollection);
    }
    if (ownedFilter) {
        ownedFilter.addEventListener('change', loadCollection);
    }
}

function loadCollection() {
    const grid = document.getElementById('collection-grid');
    if (!grid) return;
    
    let cards = getAllCards();
    
    const categoryFilter = document.getElementById('category-filter')?.value || 'all';
    const rarityFilter = document.getElementById('rarity-filter')?.value || 'all';
    const ownedFilter = document.getElementById('owned-filter')?.value || 'all';
    
    if (categoryFilter !== 'all') {
        cards = cards.filter(card => card.category === categoryFilter);
    }
    
    if (rarityFilter !== 'all') {
        cards = cards.filter(card => card.rarity === rarityFilter);
    }
    
    if (ownedFilter === 'owned') {
        cards = cards.filter(card => UserCollection.hasCard(card.id));
    } else if (ownedFilter === 'missing') {
        cards = cards.filter(card => !UserCollection.hasCard(card.id));
    }
    
    grid.innerHTML = '';
    
    cards.forEach(card => {
        const owned = UserCollection.hasCard(card.id);
        const count = UserCollection.getCardCount(card.id);
        
        const cardEl = document.createElement('div');
        cardEl.className = `collection-card ${card.rarity} ${owned ? 'owned' : 'locked'}`;
        cardEl.innerHTML = `
            <div class="card-thumbnail">
                ${card.image && owned ? `<img src="${card.image}" alt="${card.name}" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
            </div>
            <div class="card-info">
                <h3 class="card-name">${owned ? card.name : '???'}</h3>
                <p class="card-rarity">${getRarityLabel(card.rarity)}</p>
                ${owned ? `<span class="card-count">×${count}</span>` : '<span class="locked-badge">🔒</span>'}
            </div>
        `;
        
        if (owned) {
            cardEl.addEventListener('click', () => {
                window.location.href = `card-detail.html?id=${card.id}`;
            });
        }
        
        grid.appendChild(cardEl);
    });
    
    updateCollectionProgress();
}

function updateCollectionProgress() {
    const total = getAllCards().length;
    const owned = UserCollection.getUniqueCards();
    const percentage = Math.round((owned / total) * 100);
    
    const progressBar = document.getElementById('collection-progress');
    const ownedCount = document.getElementById('owned-count');
    const totalCount = document.getElementById('total-count');
    
    if (progressBar) progressBar.style.width = percentage + '%';
    if (ownedCount) ownedCount.textContent = owned;
    if (totalCount) totalCount.textContent = total;
}
