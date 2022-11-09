const directToPost = () => {
    document.location.replace('/newpost');
};

document.querySelector('#post-btn').addEventListener('click', directToPost);