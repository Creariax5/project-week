// ===================================
// UTILS.JS - Utility functions
// ===================================

// Local Storage Management
var Storage = Storage || {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },
    
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// User Collection Management
var UserCollection = UserCollection || {
    getCollection() {
        return Storage.get('userCollection', []);
    },
    
    addCard(cardId) {
        const collection = this.getCollection();
        const existingCard = collection.find(c => c.id === cardId);
        
        if (existingCard) {
            existingCard.count++;
            existingCard.lastObtained = new Date().toISOString();
        } else {
            collection.push({
                id: cardId,
                count: 1,
                obtainedAt: new Date().toISOString(),
                lastObtained: new Date().toISOString(),
                favorite: false
            });
        }
        
        Storage.set('userCollection', collection);
        return collection;
    },
    
    removeCard(cardId, count = 1) {
        const collection = this.getCollection();
        const cardIndex = collection.findIndex(c => c.id === cardId);
        
        if (cardIndex !== -1) {
            collection[cardIndex].count -= count;
            if (collection[cardIndex].count <= 0) {
                collection.splice(cardIndex, 1);
            }
        }
        
        Storage.set('userCollection', collection);
        return collection;
    },
    
    hasCard(cardId) {
        const collection = this.getCollection();
        return collection.some(c => c.id === cardId);
    },
    
    getCardCount(cardId) {
        const collection = this.getCollection();
        const card = collection.find(c => c.id === cardId);
        return card ? card.count : 0;
    },
    
    toggleFavorite(cardId) {
        const collection = this.getCollection();
        const card = collection.find(c => c.id === cardId);
        if (card) {
            card.favorite = !card.favorite;
            Storage.set('userCollection', collection);
        }
        return card?.favorite;
    },
    
    getTotalCards() {
        const collection = this.getCollection();
        return collection.reduce((total, card) => total + card.count, 0);
    },
    
    getUniqueCards() {
        return this.getCollection().length;
    },
    
    getCompletionRate() {
        const totalAvailable = getAllCards().length;
        const owned = this.getUniqueCards();
        return Math.round((owned / totalAvailable) * 100);
    }
};

// Credits Management
var Credits = Credits || {
    getBalance() {
        return Storage.get('userCredits', 500);
    },
    
    add(amount) {
        const current = this.getBalance();
        const newBalance = current + amount;
        Storage.set('userCredits', newBalance);
        return newBalance;
    },
    
    subtract(amount) {
        const current = this.getBalance();
        if (current >= amount) {
            const newBalance = current - amount;
            Storage.set('userCredits', newBalance);
            return newBalance;
        }
        return null; // Insufficient funds
    },
    
    canAfford(amount) {
        return this.getBalance() >= amount;
    }
};

// Pack Opening Logic
var PackOpening = PackOpening || {
    openPack(packType) {
        const weights = RARITY_WEIGHTS[packType];
        const cards = [];
        
        for (let i = 0; i < 5; i++) {
            const card = this.drawCard(weights);
            cards.push(card);
        }
        
        return cards;
    },
    
    drawCard(weights) {
        const random = Math.random();
        let cumulative = 0;
        let selectedRarity = 'common';
        
        for (const [rarity, weight] of Object.entries(weights)) {
            cumulative += weight;
            if (random <= cumulative) {
                selectedRarity = rarity;
                break;
            }
        }
        
        const cardsOfRarity = getCardsByRarity(selectedRarity);
        if (cardsOfRarity.length === 0) {
            // Fallback to common if no cards of selected rarity
            const commonCards = getCardsByRarity('common');
            return commonCards[Math.floor(Math.random() * commonCards.length)];
        }
        
        return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
    }
};

// Modal Management
var Modal = Modal || {
    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },
    
    close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },
    
    closeAll() {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
};

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
        return date.toLocaleDateString('fr-FR');
    } else if (days > 0) {
        return `Il y a ${days}j`;
    } else if (hours > 0) {
        return `Il y a ${hours}h`;
    } else if (minutes > 0) {
        return `Il y a ${minutes}min`;
    } else {
        return 'À l\'instant';
    }
}

// Generate unique ID
function generateId() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
}

// Rarity color mapping
function getRarityColor(rarity) {
    const colors = {
        'common': '#9CA3AF',
        'rare': '#3B82F6',
        'ultra-rare': '#8B5CF6',
        'legendary': '#F59E0B',
        'mythic': '#EF4444'
    };
    return colors[rarity] || colors.common;
}

// Rarity stars
function getRarityStars(rarity) {
    const stars = {
        'common': '★',
        'rare': '★★',
        'ultra-rare': '★★★',
        'legendary': '★★★★',
        'mythic': '★★★★★'
    };
    return stars[rarity] || '★';
}

// Rarity label in French
function getRarityLabel(rarity) {
    const labels = {
        'common': 'Commun',
        'rare': 'Rare',
        'ultra-rare': 'Ultra Rare',
        'legendary': 'Légendaire',
        'mythic': 'Mythique'
    };
    return labels[rarity] || 'Commun';
}

// Category label in French
function getCategoryLabel(category) {
    const labels = {
        'disciplines': 'Discipline',
        'cavaliers': 'Cavalier',
        'chevaux': 'Cheval',
        'duos': 'Duo Mythique',
        'moments': 'Moment de Légende',
        'event': 'Événement'
    };
    return labels[category] || category;
}

// Animate number counting
function animateNumber(element, start, end, duration = 1000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #36c1d2;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===================================
// IMAGE OPTIMIZATION
// ===================================

// Image cache pour éviter les rechargements
var ImageCache = ImageCache || {
    cache: new Map(),
    
    load(src, onLoad, onError) {
        // Vérifier si l'image est déjà en cache
        if (this.cache.has(src)) {
            const cached = this.cache.get(src);
            if (cached.loaded) {
                onLoad && onLoad(cached.img);
                return cached.img;
            }
        }
        
        // Créer une nouvelle image
        const img = new Image();
        this.cache.set(src, { img, loaded: false });
        
        img.onload = () => {
            this.cache.set(src, { img, loaded: true });
            onLoad && onLoad(img);
        };
        
        img.onerror = () => {
            this.cache.delete(src);
            onError && onError();
        };
        
        img.src = src;
        return img;
    },
    
    preload(sources) {
        sources.forEach(src => this.load(src));
    },
    
    clear() {
        this.cache.clear();
    }
};

// Lazy load observer pour les images
var LazyImageObserver = LazyImageObserver || {
    observer: null,
    
    init() {
        if (!('IntersectionObserver' in window)) {
            return; // Fallback pour les anciens navigateurs
        }
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        ImageCache.load(src, 
                            () => {
                                img.src = src;
                                img.classList.add('loaded');
                                img.removeAttribute('data-src');
                            },
                            () => {
                                img.classList.add('error');
                            }
                        );
                    }
                    
                    this.observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px', // Charger les images 50px avant qu'elles soient visibles
            threshold: 0.01
        });
    },
    
    observe(img) {
        if (this.observer) {
            this.observer.observe(img);
        }
    }
};

// Créer une image optimisée
function createOptimizedImage(src, alt, placeholder = '🏇') {
    const container = document.createElement('div');
    container.className = 'image-container';
    container.style.position = 'relative';
    
    if (!src) {
        container.innerHTML = `<div class="placeholder-image">${placeholder}</div>`;
        return container;
    }
    
    // Placeholder pendant le chargement
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'image-placeholder';
    placeholderDiv.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1);';
    placeholderDiv.innerHTML = placeholder;
    container.appendChild(placeholderDiv);
    
    // Image
    const img = document.createElement('img');
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s;';
    
    ImageCache.load(src,
        () => {
            img.src = src;
            img.style.opacity = '1';
            placeholderDiv.style.display = 'none';
        },
        () => {
            container.innerHTML = `<div class="placeholder-image">${placeholder}</div>`;
        }
    );
    
    container.appendChild(img);
    return container;
}

// Précharger les images critiques
function preloadCriticalImages() {
    const criticalImages = [];
    
    // Trouver les images visibles dans le viewport
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            criticalImages.push(img.src);
        }
    });
    
    ImageCache.preload(criticalImages);
}

// Compresser l'URL d'image (utiliser des versions WebP si disponibles)
function getOptimizedImageUrl(url, width = null) {
    if (!url) return null;
    
    // Si le navigateur supporte WebP, essayer de charger la version WebP
    if (supportsWebP()) {
        const webpUrl = url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        return webpUrl;
    }
    
    return url;
}

// Vérifier le support WebP
function supportsWebP() {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
}

// Initialiser le lazy loading au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        LazyImageObserver.init();
        preloadCriticalImages();
    });
} else {
    LazyImageObserver.init();
    preloadCriticalImages();
}
