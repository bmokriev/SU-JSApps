async function getRecipeList() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const main = document.querySelector('main')

    try {
        const res = await fetch(url);
        if (res.ok === false) {
            throw new Error()
        }
        const data = await res.json()
        main.innerHTML = ""
        Object.values(data).forEach(r => {
            main.appendChild(createPreview(r));
        })
    } catch (error) {
        console.log(error);
    }
}

function createPreview(r) {
    const result = e('article', { className: 'preview' },
        e('div', { className: 'title' }, e('h2', {}, r.name)),
        e('div', { className: 'small' }, e('img', { src: r.img }))
    )

    result.addEventListener('click', () => getRecipeDetails(r._id, result))

    return result
}

async function getRecipeDetails(id, preview) {
    let url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;

    const res = await fetch(url);
    const recipe = await res.json();

    const result = e('article', {},
        e('h2', { onClick: toggleCard }, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );

    preview.replaceWith(result);

    function toggleCard() {

        result.replaceWith(preview)
    }
};

window.addEventListener('load', () => {
    getRecipeList()

});

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}