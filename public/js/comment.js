const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value;
    const urlArray = location.href.split("/");
    const blog_id = urlArray[urlArray.length - 1];

    if (content && blog_id) {
        const response = await fetch('/api/blog/comment', {
            method: 'POST',
            body: JSON.stringify({ content, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);