import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';

const searchTemplate = (onSubmit) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSubmit} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
`;

const resSearchTemplate = (data) => html`
    <div class="search-container">
        ${data.length == 0 ? html`<h3 class="no-articles">
            No articles yet
        </h3>` : data.map(itemTemplate)}
    
    </div>
    </section>
`;

const itemTemplate = (data) => html`
<a class="article-preview" href=${`/details/${data._id}`}> <article>
    <h3>Topic: <span>${data.title}</span></h3>
    <p>Category: <span>${data.category}</span></p>
    </article>
</a>
`;

export async function searchPage(ctx) {
    let data;

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const searchData = String(formData.get('search'))

        console.log(searchData);
        data = await search(searchData);
        console.log(data);


        ctx.render(resSearchTemplate(data));
    }


    ctx.render(searchTemplate(onSubmit))
}