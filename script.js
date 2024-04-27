<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Import Firestore
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

  // Get a reference to the 'guestbook' collection in Firestore
  const db = getFirestore(app);
  const guestbookCollection = collection(db, 'guestbook');

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
        // Add comment to Firestore
        await addDoc(guestbookCollection, {
          name: name,
          comment: comment,
          timestamp: serverTimestamp() // Auto-generated timestamp
        });
        // Clear form inputs after successful submission
        nameInput.value = '';
        commentInput.value = '';
      } catch (error) {
        console.error('Error adding comment to Firestore:', error);
      }
    }
  });
</script>
