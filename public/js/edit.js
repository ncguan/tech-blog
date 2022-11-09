// const editFormHandler = async (event) => {
//     event.preventDefault();

//     const title = document.querySelector('#blog-title').value;
//     const content = document.querySelector('#blog-content').value;

//     if (title && content) {
//         const response = await fetch('/api/blog/edit', {
//             method: 'PUT',
//             body: JSON.stringify({ title, content }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             document.location.replace(`/dashboard`);
//         } else {
//             alert(response.statusText);
//         }
//     }
// };

const deleteBlog = async (event) => {

        const id = event.target.getAttribute('blog-id');
        console.log(id);
    
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }

}

// document.querySelector('.edit-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteBlog);