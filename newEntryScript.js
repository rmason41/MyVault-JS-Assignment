
const STORAGE_KEY = 'reflections';

function loadReflections() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveReflections(reflections) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function formatDateTime(isoString) {
    const date = new Date(isoString);
    const dateString = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const timeString = date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    });
    return `${dateString} · ${timeString}`;
}

function renderRecentEntries() {
    const recentContainer = document.querySelector('#recent-entries');
    if (!recentContainer) return;

    const storedReflections = loadReflections();
    const recentItems = storedReflections.slice(-4).reverse();

    if (recentItems.length === 0) {
        recentContainer.innerHTML = `
            <div class="quick-card-empty">
                <p>No recent reflections yet.</p>
                <a href="new-entry.html">Add your first entry</a>
            </div>
        `;
        return;
    }

    recentContainer.innerHTML = recentItems.map(entry => `
        <div class="quick-card">
            <p>${formatDateTime(entry.submittedAt)}</p>
            <h2>${entry.title || 'Untitled Reflection'}</h2>
            <p>${entry.body ? entry.body.substring(0, 120) + (entry.body.length > 120 ? '...' : '') : 'No content yet.'}</p>
        </div>
    `).join('');
}

function renderVaultEntries() {
    const vaultContainer = document.querySelector('#vault-entries');
    if (!vaultContainer) return;

    const storedReflections = loadReflections().slice().reverse();

    if (storedReflections.length === 0) {
        vaultContainer.innerHTML = `
            <div class="vault-card-empty">
                <p>Your vault is empty.</p>
                <a href="new-entry.html">Create your first reflection</a>
            </div>
        `;
        return;
    }

    vaultContainer.innerHTML = storedReflections.map(entry => `
        <div class="vault-card">
            <p>${formatDateTime(entry.submittedAt)}</p>
            <h2>${entry.title || 'Untitled Reflection'}</h2>
            <p>${entry.body || 'No content yet.'}</p>
        </div>
    `).join('');
}

function saveEntry(event, titleInput, entryArea) {
    event.preventDefault();

    const oldReflections = loadReflections();
    const entryData = {
        title: titleInput.value.trim(),
        body: entryArea.value.trim(),
        submittedAt: new Date().toISOString(),
    };

    if (!entryData.title && !entryData.body) {
        alert('Please enter your reflection.');
        return;
    }

    oldReflections.push(entryData);
    saveReflections(oldReflections);
    renderRecentEntries();
    renderVaultEntries();

    titleInput.value = '';
    entryArea.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.querySelector("#entryForm");
    const titleInput = document.querySelector("#reflection-title");
    const entryArea = document.querySelector("#entry-area");

    if (entryForm) {
        entryForm.addEventListener("submit", event => saveEntry(event, titleInput, entryArea));
    }

    renderRecentEntries();
    renderVaultEntries();
});




