// Function to fetch comments from Firestore
async function fetchComments() {
  try {
    const snapshot = await db.collection('comments').get();
    const comments = snapshot.docs.map(doc => doc.data());
    displayComments(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

// Function to submit a new comment to Firestore
async function submitComment(name, comment) {
  try {
    await db.collection('comments').add({ name, comment });
    fetchComments(); // Refresh comments after submission
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
}

// Function to display comments
function displayComments(comments) {
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = '';
  if (comments.length === 0) {
    commentsContainer.innerHTML = '<p>No comments yet.</p>';
  } else {
    comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      commentDiv.innerHTML = `<strong>${comment.name}:</strong> ${comment.comment}`;
      commentsContainer.appendChild(commentDiv);
    });
  }
}

// Event listener for form submission
const guestbookForm = document.getElementById('guestbook-form');
guestbookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment');
  const name = nameInput.value.trim() || 'Anonymous';
  const comment = commentInput.value.trim();
  if (comment !== '') {
    submitComment(name, comment);
    nameInput.value = '';
    commentInput.value = '';
  }
});

// Initial fetch of comments when the page loads
fetchComments();
