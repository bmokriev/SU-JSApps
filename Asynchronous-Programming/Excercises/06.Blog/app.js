const btnLoadPosts = document.querySelector('#btnLoadPosts');
const postsSelectEl = document.querySelector('#posts');


function attachEvents() {
    console.log('TODO...');
}

attachEvents();

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const res = await fetch(url);
    const data = await res.json();

    return data;
};

async function getCommnetsByPostId(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';

    const res = await fetch(url);
    const data = await res.json();

    return Object.values(data).filter(e => e.postId === postId);
};