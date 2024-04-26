// script.js

const suggestionsContainer = document.getElementById('suggestions-container');
const suggestionInput = document.getElementById('suggestionInput');
const nameInput = document.getElementById('nameInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
  const suggestion = suggestionInput.value.trim();
  const name = nameInput.value.trim() || 'Anonymt';

  if (suggestion !== '') {
    addSuggestion(suggestion, name);
    suggestionInput.value = '';
    nameInput.value = '';
  }
});

function addSuggestion(suggestion, name) {
  const suggestionDiv = document.createElement('div');
  suggestionDiv.classList.add('suggestion');
  suggestionDiv.innerHTML = `
    <p><strong>${name}:</strong> ${suggestion}</p>
  `;
  suggestionsContainer.appendChild(suggestionDiv);
}
