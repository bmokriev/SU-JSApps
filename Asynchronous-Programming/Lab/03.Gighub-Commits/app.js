function loadCommits() {
    const username = document.querySelector('#username').value;
    const repo = document.querySelector('#repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`

    getRepos(url);
    async function getRepos(url) {
        const ulEl = document.getElementById('commits');
        try {
            const res = await fetch(url);
            if (res.ok === false) {
                throw new Error(res.status)
            }
            const data = await res.json();
            ulEl.innerHTML = '';
            data.forEach(r => {
                const liEl = document.createElement('li');
                liEl.textContent = `${r.commit.author.name}: ${r.commit.message}`;
                ulEl.appendChild(liEl);
            });
        } catch (error) {
            ulEl.innerHTML = '';
            const liEl = document.createElement('li');
            liEl.textContent = `${error} (Not Found)`;
            ulEl.appendChild(liEl);
        }
    }
}