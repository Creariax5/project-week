// ===================================
// SCAN.JS - QR Code Scanner with Real Camera
// ===================================

var html5QrcodeScanner = html5QrcodeScanner || null;
var currentCameraId = currentCameraId || null;
var cameras = cameras || [];

if (!window.scanInitialized) {
    window.scanInitialized = true;
    document.addEventListener('DOMContentLoaded', () => {
        initScan();
    });
}

function initScan() {
    setupScannerControls();
    loadRecentScans();
    setupScanModal();
}

function setupScannerControls() {
    const startBtn = document.getElementById('start-scan');
    const stopBtn = document.getElementById('stop-scan');
    const switchBtn = document.getElementById('switch-camera');
    const manualInput = document.getElementById('manual-code');
    const submitManualBtn = document.getElementById('submit-manual');
    
    if (startBtn) {
        startBtn.addEventListener('click', startScanning);
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', stopScanning);
    }
    
    if (switchBtn) {
        switchBtn.addEventListener('click', switchCamera);
    }
    
    if (submitManualBtn && manualInput) {
        submitManualBtn.addEventListener('click', () => {
            const code = manualInput.value.trim().toUpperCase();
            if (code.length === 8) {
                const cardId = extractCardIdFromUrl(code);
                if (cardId) {
                    scanCard(cardId);
                    manualInput.value = '';
                } else {
                    showToast('❌ Code invalide', 'error');
                }
            } else {
                showToast('⚠️ Le code doit faire 8 caractères', 'error');
            }
        });
        
        manualInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitManualBtn.click();
            }
        });
        
        // Auto-uppercase
        manualInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
    }
}

async function startScanning() {
    try {
        const startBtn = document.getElementById('start-scan');
        const stopBtn = document.getElementById('stop-scan');
        const switchBtn = document.getElementById('switch-camera');
        const instruction = document.getElementById('scan-instruction');
        
        // Get available cameras
        try {
            cameras = await Html5Qrcode.getCameras();
        } catch (err) {
            console.error('Erreur lors de la détection des caméras:', err);
            showToast('Impossible de détecter les caméras. Veuillez autoriser l\'accès à la caméra.', 'error');
            instruction.textContent = '⚠️ Veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur';
            instruction.style.color = '#EF4444';
            return;
        }
        
        if (cameras && cameras.length > 0) {
            // Use back camera by default (better for scanning)
            currentCameraId = cameras.length > 1 ? cameras[1].id : cameras[0].id;
            
            // Initialize scanner
            html5QrcodeScanner = new Html5Qrcode("qr-reader");
            
            const config = {
                fps: 10,
                qrbox: function(viewfinderWidth, viewfinderHeight) {
                    // Square QR box
                    let minEdgePercentage = 0.7;
                    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
                    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
                    return {
                        width: qrboxSize,
                        height: qrboxSize
                    };
                },
                aspectRatio: 1.0
            };
            
            // Start scanning
            await html5QrcodeScanner.start(
                currentCameraId,
                config,
                onScanSuccess,
                onScanFailure
            );
            
            // Update UI
            startBtn.style.display = 'none';
            stopBtn.style.display = 'inline-block';
            if (cameras.length > 1) {
                switchBtn.style.display = 'inline-block';
            }
            instruction.textContent = '📷 Scanner actif - Placez le QR code dans le cadre';
            instruction.style.color = '#10B981';
            
            showToast('Scanner activé !', 'success');
        } else {
            showToast('Aucune caméra détectée. Vérifiez que votre appareil dispose d\'une caméra.', 'error');
            instruction.textContent = '⚠️ Aucune caméra détectée';
            instruction.style.color = '#EF4444';
        }
    } catch (err) {
        console.error('Erreur lors du démarrage du scanner:', err);
        const instruction = document.getElementById('scan-instruction');
        
        if (err.name === 'NotFoundError' || err.message.includes('not found')) {
            showToast('Aucune caméra trouvée. Vérifiez les permissions.', 'error');
            instruction.textContent = '⚠️ Aucune caméra disponible. Vérifiez les permissions dans les paramètres.';
        } else if (err.name === 'NotAllowedError' || err.message.includes('permission')) {
            showToast('Accès à la caméra refusé. Veuillez autoriser l\'accès.', 'error');
            instruction.textContent = '⚠️ Accès à la caméra refusé. Cliquez sur "Autoriser" dans votre navigateur.';
        } else {
            showToast('Erreur: Impossible d\'accéder à la caméra', 'error');
            instruction.textContent = '⚠️ Erreur: ' + err.message;
        }
        
        instruction.style.color = '#EF4444';
    }
}

async function stopScanning() {
    try {
        if (html5QrcodeScanner) {
            await html5QrcodeScanner.stop();
            html5QrcodeScanner.clear();
            html5QrcodeScanner = null;
        }
        
        const startBtn = document.getElementById('start-scan');
        const stopBtn = document.getElementById('stop-scan');
        const switchBtn = document.getElementById('switch-camera');
        const instruction = document.getElementById('scan-instruction');
        
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        switchBtn.style.display = 'none';
        instruction.textContent = 'Placez le QR code de la carte dans le cadre';
        instruction.style.color = '';
        
        showToast('Scanner arrêté', 'info');
    } catch (err) {
        console.error('Erreur lors de l\'arrêt du scanner:', err);
    }
}

async function switchCamera() {
    if (cameras.length < 2) return;
    
    try {
        await stopScanning();
        
        // Switch to next camera
        const currentIndex = cameras.findIndex(cam => cam.id === currentCameraId);
        const nextIndex = (currentIndex + 1) % cameras.length;
        currentCameraId = cameras[nextIndex].id;
        
        await startScanning();
        showToast('Caméra changée', 'info');
    } catch (err) {
        console.error('Erreur lors du changement de caméra:', err);
        showToast('Erreur lors du changement de caméra', 'error');
    }
}

function onScanSuccess(decodedText, decodedResult) {
    console.log('QR Code scanné:', decodedText);
    
    // Extract card ID from URL
    const cardId = extractCardIdFromUrl(decodedText);
    
    console.log('Card ID extrait:', cardId);
    
    if (cardId) {
        // Stop scanning temporarily
        html5QrcodeScanner.pause(true);
        
        // Process the scanned card
        scanCard(cardId);
        
        // Resume after 3 seconds
        setTimeout(() => {
            if (html5QrcodeScanner) {
                html5QrcodeScanner.resume();
            }
        }, 3000);
    } else {
        console.error('Impossible d\'extraire l\'ID de:', decodedText);
        showToast(`QR Code invalide. URL: ${decodedText.substring(0, 50)}...`, 'error');
    }
}

function onScanFailure(error) {
    // This is called frequently, so we don't show errors
    // console.warn('Scan failed:', error);
}

function extractCardIdFromUrl(url) {
    // Try to validate as secret code first (8 characters alphanumeric)
    if (/^[A-Z0-9]{8}$/i.test(url.trim())) {
        const cardId = validateSecretCode(url.trim());
        if (cardId) {
            return cardId;
        }
    }
    
    // Extract card ID from URL like: https://creariax5.github.io/project-week/card-detail.html?id=DISC-001
    let match = url.match(/[?&]id=([A-Z]+-\d+)/i);
    
    // If not found, try old format
    if (!match) {
        match = url.match(/\/card\/([A-Z]+-\d+)/i);
    }
    
    // If still not found, check if URL itself is just the card ID
    if (!match && /^[A-Z]+-\d+$/i.test(url)) {
        return url.toUpperCase();
    }
    
    return match ? match[1].toUpperCase() : null;
}

function scanCard(cardId) {
    showToast(`🔍 Recherche carte ${cardId}...`, 'info');
    
    const card = getCardById(cardId);
    
    if (!card) {
        showToast(`❌ Carte ${cardId} non trouvée !`, 'error');
        return;
    }
    
    showToast(`✅ Carte trouvée: ${card.name}`, 'success');
    
    try {
        // Add to collection
        UserCollection.addCard(cardId);
        
        // Save to recent scans
        saveRecentScan(card);
        
        // Show success modal
        showScanSuccess(card);
        
        // Reload recent scans
        loadRecentScans();
    } catch (error) {
        showToast('❌ Erreur: ' + error.message, 'error');
    }
}

function saveRecentScan(card) {
    let recentScans = AppStorage.get('recentScans', []);
    
    // Add to beginning
    recentScans.unshift({
        cardId: card.id,
        scannedAt: new Date().toISOString()
    });
    
    // Keep only last 10
    recentScans = recentScans.slice(0, 10);
    
    AppStorage.set('recentScans', recentScans);
}

function loadRecentScans() {
    const recentScans = AppStorage.get('recentScans', []);
    const container = document.getElementById('recent-scans');
    
    if (!container) return;
    
    if (recentScans.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucune carte scannée récemment</p>';
        return;
    }
    
    container.innerHTML = '';
    
    recentScans.forEach(scan => {
        const card = getCardById(scan.cardId);
        if (!card) return;
        
        const count = UserCollection.getCardCount(card.id);
        
        const cardEl = document.createElement('div');
        cardEl.className = 'recent-card-item';
        cardEl.innerHTML = `
            <div class="recent-card-thumbnail ${card.rarity}">
                ${card.image ? `<img src="${card.image}" alt="${card.name}" loading="lazy" decoding="async">` : `<div class="placeholder-icon">${card.icon || '🏇'}</div>`}
            </div>
            <div class="recent-card-info">
                <h4>${card.name}</h4>
                <p class="card-rarity-badge">${getRarityLabel(card.rarity)}</p>
                <span class="scan-time">${formatDate(scan.scannedAt)}</span>
            </div>
            <div class="card-count-badge">×${count}</div>
        `;
        
        cardEl.addEventListener('click', () => {
            window.location.href = `card-detail.html?id=${card.id}`;
        });
        
        container.appendChild(cardEl);
    });
}

function setupScanModal() {
    const modal = document.getElementById('scan-modal');
    const closeBtn = document.getElementById('close-scan');
    const overlay = document.getElementById('modal-overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeScanModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeScanModal);
    }
}

function showScanSuccess(card) {
    const modal = document.getElementById('scan-modal');
    const resultContainer = document.getElementById('scan-result');
    
    if (!modal || !resultContainer) return;
    
    const count = UserCollection.getCardCount(card.id);
    const isNew = count === 1;
    
    resultContainer.innerHTML = `
        <div class="scan-success-animation">
            <div class="success-icon ${isNew ? 'new' : 'duplicate'}">
                ${isNew ? '⭐' : '✓'}
            </div>
            <h2>${isNew ? 'Nouvelle carte !' : 'Carte ajoutée !'}</h2>
            <p class="success-subtitle">${isNew ? 'Première obtention' : `Vous en avez maintenant ${count}`}</p>
        </div>
        
        <div class="scanned-card">
            <div class="trading-card ${card.rarity}">
                <div class="card-header">
                    <span class="card-category">${getCategoryLabel(card.category)}</span>
                    <span class="card-rarity">${getRarityStars(card.rarity)}</span>
                </div>
                <div class="card-image-container">
                    <div class="card-image">
                        ${card.image ? `<img src="${card.image}" alt="${card.name}" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);" onerror="this.outerHTML='<div class=\"placeholder-image\">${card.icon || '🏇'}</div>'">` : `<div class="placeholder-image">${card.icon || '🏇'}</div>`}
                    </div>
                </div>
                <div class="card-info">
                    <h2 class="card-name">${card.name}</h2>
                    <p class="card-subtitle">${getRarityLabel(card.rarity)}</p>
                </div>
                <div class="card-footer">
                    <span class="card-number">#${card.id}</span>
                    <span class="card-edition">×${count}</span>
                </div>
            </div>
        </div>
        
        <div class="scan-actions">
            <button class="action-btn primary" onclick="viewCardDetails('${card.id}')">
                Voir les détails
            </button>
            <button class="action-btn secondary" onclick="closeScanModal()">
                Continuer à scanner
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Play success sound or vibration
    if (navigator.vibrate) {
        navigator.vibrate(isNew ? [100, 50, 100] : 100);
    }
}

function closeScanModal() {
    const modal = document.getElementById('scan-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function viewCardDetails(cardId) {
    window.location.href = `card-detail.html?id=${cardId}`;
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.stop().catch(err => console.error(err));
    }
});
