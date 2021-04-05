import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemByID, editRecord } from '../api/data.js';

const editTemplate = (item, onSubmit) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const item = await getItemByID(id);

    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');

        if (category != "JavaScript" && category != "C#" && category != "Java" && category != "Python") {
            return alert('The category must be on of "JavaScript","C#", "Java", or "Python".')
        }

        const data = {
            title,
            category,
            content
        }

        await editRecord(item._id, data)
        ctx.page.redirect('/');
    }
}