// Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async e => {
        e.preventDefault();
        const username = registerForm.username.value;
        const password = registerForm.password.value;

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const text = await res.text();
            alert(text);
            if (text === 'User registered successfully!') {
                window.location.href = 'login.html';
            }
        } catch (err) {
            alert('Error: ' + err);
        }
    });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const text = await res.text();
            alert(text);
            if (text === 'Login successful!') {
                window.location.href = 'index.html';
            }
        } catch (err) {
            alert('Error: ' + err);
        }
    });
}

// Create post
const postForm = document.getElementById('postForm');
if (postForm) {
    postForm.addEventListener('submit', async e => {
        e.preventDefault();
        const username = postForm.username.value;
        const content = postForm.content.value;

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, content })
            });
            const text = await res.text();
            alert(text);
            postForm.content.value = '';
            loadPosts();
        } catch (err) {
            alert('Error: ' + err);
        }
    });
}

// Load posts
async function loadPosts() {
    const feed = document.getElementById('feed');
    if (!feed) return;
    try {
        const res = await fetch('/api/posts');
        const posts = await res.json();
        feed.innerHTML = '';
        posts.forEach(post => {
            const li = document.createElement('li');
            li.textContent = `${post.username}: ${post.content}`;
            feed.appendChild(li);
        });
    } catch (err) {
        console.error(err);
    }
}

// Load posts on index page
loadPosts();
