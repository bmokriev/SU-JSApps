import { html } from '../../../node_modules/lit-html/lit-html.js';
import { getHome } from '../api/data.js';

const myTemplate = (cSharpArt, jSArt, javaArt, pythonArt) => html`
<!-- Home -->
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        <article>
            ${jSArt == undefined ? html`<h3 class="no-articles">No articles yet
            </h3>` : html`<h3>${jSArt.title}</h3>
            <p>${jSArt.content}</p>
            <a href=${`/details/${jSArt._id}`} class="btn details-btn">Details</a>
            `}


        </article>
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        <article>
            ${cSharpArt == undefined ? html`<h3 class="no-articles">No articles yet
            </h3>` : html`<h3>${cSharpArt.title}</h3>
            <p>${cSharpArt.content}</p>
            <a href=${`/details/${cSharpArt._id}`} class="btn details-btn">Details</a>`}

        </article>
    </section>
    <section class="recent java">
        <h2>Java</h2>
        <article>
            ${javaArt == undefined ? html`<h3 class="no-articles">No articles yet
            </h3>` : html`<h3>${javaArt.title}</h3>
            <p>${javaArt.content}</p>
            <a href=${`/details/${javaArt._id}`} class="btn details-btn">Details</a>`}

        </article>
    </section>
    <section class="recent python">
        <h2>Python</h2>
        <article>
            ${pythonArt == undefined ? html`<h3 class="no-articles">No articles yet
            </h3>` : html`<h3>${pythonArt.title}</h3>
            <p>${pythonArt.content}</p>
            <a href=${`/details/${pythonArt._id}`} class="btn details-btn">Details</a>`}
        </article>

    </section>
</section>
    `;

export const itemTemplate = (data) => html`

        `;

export async function homePage(ctx) {
    const data = await getHome()
    const [cSharpArt] = data.filter(e => e.category == 'C#');
    const [jSArt] = data.filter(e => e.category == 'JavaScript');
    const [javaArt] = data.filter(e => e.category == 'Java');
    const [pythonArt] = data.filter(e => e.category == 'Python');

    ctx.render(myTemplate(cSharpArt, jSArt, javaArt, pythonArt));
}