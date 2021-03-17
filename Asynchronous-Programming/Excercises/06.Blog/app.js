const loadPostsBtn = document.querySelector('#btnLoadPosts');
const postsSelectEl = document.querySelector('#posts');
const viewBtn = document.querySelector('#btnViewPost')


function attachEvents() {
    loadPostsBtn.addEventListener('click', getPosts);
    viewBtn.addEventListener('click', displayPosts);

}

attachEvents();

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    try {
        const res = await fetch(url);
        const data = await res.json();

        postsSelectEl.innerHTML = ''
        Object.values(data).map(createOption)
            .forEach(e => postsSelectEl.appendChild(e));

        return data;
    } catch (error) {
        console.log(error);
    }
};

function createOption(post) {
    const optionEl = document.createElement('option');
    optionEl.textContent = post.title;
    optionEl.value = post.id;
    return optionEl;
}

function createComment(comment) {
    const liEl = document.createElement('li');
    liEl.textContent = comment.text;
    liEl.value = comment.id;
    return liEl;
}

function displayPosts() {

    getCommnetsByPostId(postsSelectEl.value);
}

async function getCommnetsByPostId(postId) {
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';
    const postUrl = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    const [postRes, commentRes] = await Promise.all([
        fetch(postUrl),
        fetch(commentsUrl)
    ]);

    const postData = await postRes.json();

    document.querySelector('#post-title').textContent = postData.title;
    document.querySelector('#post-body').textContent = postData.body;

    const commentData = await commentRes.json();
    const comments = Object.values(commentData).filter(e => e.postId === postId);

    const commentsUl = document.querySelector('#post-comments');

    commentsUl.innerHTML = ''
    comments.map(createComment)
        .forEach(e => commentsUl.appendChild(e))
};