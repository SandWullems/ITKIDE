// script.js

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBish5b5FXkcACm45r4ahZO9GK7I9D8LN8",
    authDomain: "ideeritk.firebaseapp.com",
    projectId: "ideeritk",
    storageBucket: "ideeritk.appspot.com",
    messagingSenderId: "532522853902",
    appId: "1:532522853902:web:d83e847c083fb9d3cdbe5f",
    measurementId: "G-HBV6NDDK24"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Add a suggestion to Firestore
  function addSuggestion() {
    const suggestion = document.getElementById('suggestionInput').value.trim();
    const name = document.getElementById('nameInput').value.trim() || 'Anonymt';
  
    if (suggestion !== '') {
      db.collection('suggestions').add({
        suggestion: suggestion,
        name: name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log('Suggestion added successfully');
      })
      .catch((error) => {
        console.error('Error adding suggestion: ', error);
      });
  
      // Clear input fields
      document.getElementById('suggestionInput').value = '';
      document.getElementById('nameInput').value = '';
    }
  }
  
  // Real-time listener for suggestions
  window.addEventListener('DOMContentLoaded', () => {
    const suggestionsContainer = document.getElementById('suggestions-container');
  
    db.collection('suggestions').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      suggestionsContainer.innerHTML = ''; // Clear existing suggestions
  
      snapshot.forEach((doc) => {
        const suggestionData = doc.data();
        const suggestionDiv = document.createElement('div');
        suggestionDiv.classList.add('suggestion');
        suggestionDiv.innerHTML = `
          <p><strong>${suggestionData.name}:</strong> ${suggestionData.suggestion}</p>
        `;
        suggestionsContainer.appendChild(suggestionDiv);
      });
    });
  });
  