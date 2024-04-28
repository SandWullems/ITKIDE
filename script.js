<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guestbook</title>
  <style>
    /* CSS Styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f0f0;
    }
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
    }
    .comment {
      margin-bottom: 10px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Guestbook</h1>
    <div id="comments-container"></div>
    <form id="guestbook-form">
      <label for="name">Your Name:</label>
      <input type="text" id="name" name="name">
      <br>
      <label for="comment">Your Comment:</label>
      <textarea id="comment" name="comment"></textarea>
      <br>
      <button type="submit">Submit</button>
    </form>
  </div>

  <!-- Firebase and Firestore SDKs -->
  <script src="https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"></script>

  <script type="module">
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
  </script>
</body>
</html>
