// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBish5b5FXkcACm45r4ahZO9GK7I9D8LN8",
  authDomain: "ideeritk.firebaseapp.com",
  projectId: "ideeritk",
  storageBucket: "ideeritk.appspot.com",
  messagingSenderId: "532522853902",
  appId: "1:532522853902:web:d83e847c083fb9d3cdbe5f",
  measurementId: "G-HBV6NDDK24"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to the 'guestbook' collection
const guestbookRef = db.collection('guestbook');

// Function to display comments
function displayComments() {
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = ''; // Clear previous comments

  guestbookRef.orderBy('timestamp', 'desc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const commentData = doc.data();
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<strong>${commentData.name}:</strong> ${commentData.comment}`;
        commentsContainer.appendChild(commentDiv);
      });
    })
    .catch(error => {
      console.error('Error getting documents:', error);
    });
}

// Event listener for form submission
const guestbookForm = document.getElementById('guestbook-form');
guestbookForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment');
  const name = nameInput.value.trim() || 'Anonymous';
  const comment = commentInput.value.trim();
  if (comment !== '') {
    try {
      await guestbookRef.add({
        name: name,
        comment: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      nameInput.value = '';
      commentInput.value = '';
      displayComments(); // Update comments after submission
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
});

// Initial call to display comments
displayComments();
