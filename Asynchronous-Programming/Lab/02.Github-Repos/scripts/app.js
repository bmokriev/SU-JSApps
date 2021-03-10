function loadRepos() {
	const username = document.querySelector('#username');
	const url = `https://api.github.com/users/${username.value}/repos`;

	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			const outputEl = document.querySelector('#repos');
			outputEl.innerHTML = '';
			data.forEach((repo) => {
				const aEl = document.createElement('a');
				const liEl = document.createElement('li');
				aEl.setAttribute('href', repo.html_url);
				aEl.setAttribute('target', '_blank')
				aEl.textContent = repo.full_name;
				liEl.appendChild(aEl)
				outputEl.appendChild(liEl);
			});
		});
}