import { html } from '../../../node_modules/lit-html/lit-html.js';
import { getCatalog } from '../api/data.js';

const dashboardTemplate = (data) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>

    ${data.length == 0 ? html`<h3 class="no-articles">
        No articles yet
    </h3>` : data.map(itemTemplate)}
   
`;

const itemTemplate = (data) => html`
<a class="article-preview" href=${`/details/${data._id}`}> <article>
    <h3>Topic: <span>${data.title}</span></h3>
    <p>Category: <span>${data.category}</span></p>
    </article>
</a>
`;

export async function dashboardPage(ctx) {
    console.log('here');
    const data = await getCatalog();

    ctx.render(dashboardTemplate(data))
}