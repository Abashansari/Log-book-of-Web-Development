document.getElementById('fetchButton').addEventListener('click', () => {
    const limit = document.getElementById('limitInput').value;
    const postsContainer = document.getElementById('postsContainer');

    // Clear previous posts
    postsContainer.innerHTML = '';

    // Validate the limit
    if (limit <= 0 || isNaN(limit)) {
        postsContainer.innerHTML = '<p>Please enter a valid limit.</p>';
        return;
    }

    // Fetch posts from JSONPlaceholder API
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                postElement.style.marginBottom = '15px';
                postElement.style.borderBottom = '1px solid #ddd';
                postElement.style.paddingBottom = '10px';
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            postsContainer.innerHTML = '<p>Error fetching posts. Please try again later.</p>';
            console.error('Error:', error);
        });
});
