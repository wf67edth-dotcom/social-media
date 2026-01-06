// Example: Login functionality
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/auth/login', {  // <- relative path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful');
      // Redirect or update UI
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred');
  }
});

// Example: Register functionality
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/auth/register', { // <- relative path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful');
        // Redirect to login page or UI update
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  });
}

// Example: Create a new post
const postForm = document.getElementById('postForm');

if (postForm) {
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = document.getElementById('postContent').value;

    try {
      const res = await fetch('/post/create', {  // <- relative path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Post created!');
        // Update posts list dynamically
      } else {
        alert(data.message || 'Failed to create post');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  });
}
