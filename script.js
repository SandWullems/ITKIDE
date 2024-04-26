// Initialize Firebase
// Replace YOUR_API_KEY, YOUR_AUTH_DOMAIN, YOUR_PROJECT_ID with your Firebase config
firebase.initializeApp({
    apiKey: "AIzaSyBish5b5FXkcACm45r4ahZO9GK7I9D8LN8",
    authDomain: "ideeritk.firebaseapp.com",
    projectId: "ideeritk",
    storageBucket: "ideeritk.appspot.com",
    messagingSenderId: "532522853902",
    appId: "1:532522853902:web:d83e847c083fb9d3cdbe5f",
    measurementId: "G-HBV6NDDK24"
  });
  
  const db = firebase.firestore();
  
  const suggestionsContainer = document.getElementById('suggestions-container');
  const suggestionInput = document.getElementById('suggestionInput');
  const nameInput = document.getElementById('nameInput');
  const sendButton = document.getElementById('sendButton');
  
  sendButton.addEventListener('click', async () => {
    const suggestion = suggestionInput.value.trim();
    const name = nameInput.value.trim() || 'Anonymt';
  
    if (suggestion !== '') {
      try {
        await db.collection('suggestions').add({
          suggestion: suggestion,
          name: name,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        // Clear input fields after successful submission
        suggestionInput.value = '';
        nameInput.value = '';
      } catch (error) {
        console.error('Error adding suggestion: ', error);
        // Handle error (e.g., show an alert to the user)
      }
    }
  });
  
  // Real-time listener to display suggestions
  db.collection('suggestions')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      suggestionsContainer.innerHTML = ''; // Clear previous suggestions
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
  