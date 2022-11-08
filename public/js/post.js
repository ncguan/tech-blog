const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value;
    const content = document.querySelector('#blog-content').value;

    if (title && content) {
        const response = await fetch('/api/blog/post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.post-form').addEventListener('submit', postFormHandler);