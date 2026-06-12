
const STORAGE_KEY = 'reflections';
let reflections = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

const entryForm = document.querySelector("#entryForm");
const titleInput = document.querySelector("#reflection-title");
const entryArea = document.querySelector("#entry-area");

function saveReflections() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
}

function saveEntry(event) {
    event.preventDefault();

    const entryData = {
        title: titleInput.value.trim(),
        body: entryArea.value.trim(),
        submittedAt: new Date().toISOString(),
    };

    console.log("Form submission data:", entryData);

    if (!entryData.title && !entryData.body) {
        alert('Please enter your reflection.');
        return;
    }

    reflections.push(entryData);
    saveReflections();

    titleInput.value = '';
    entryArea.value = '';
}

entryForm.addEventListener("submit", saveEntry);




