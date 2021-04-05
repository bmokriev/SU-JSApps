import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemByID, deleteRecord } from '../api/data.js';

const detailsTemplate = (data, isOwner, onDelete, goBack) => html`
<section id="details-page" class="content details">
    <h1>${data.title}</h1>

    <div class="details-content">
        <strong>Published in category ${data.category}</strong>
        <p>${data.content}</p>

        <div class="buttons">
            ${isOwner ? html`<a href="javascript:void(0)" @click=${onDelete} class="btn delete">Delete</a>
            <a href=${`/edit/${data._id}`} class="btn edit">Edit</a>` : ''}
            <a @click=${goBack} href="javascript:void(0)" class="btn edit">Back</a>
        </div>
    </div>
</section>
`;


export async function detailsPage(ctx) {
    const data = await getItemByID(ctx.params.id)

    const userId = sessionStorage.getItem('userId');

    ctx.render(detailsTemplate(data, userId == data._ownerId, onDelete, goBack))

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            await deleteRecord(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    function goBack() {
        window.history.back();
    }
}