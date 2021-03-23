document.querySelector('form').addEventListener('submit', postRecipe);

async function postRecipe(event) {
    event.preventDefault();
    const recipe = createRecipe(event);
    console.log(recipe);
    const token = sessionStorage.getItem('userToken');

    const res = await fetch('http://localhost:3030/data/recipes',{
        method: 'post',
        headers: {'X-Authorization': token},
        body: JSON.stringify(recipe) 
    })

    if (res.ok === false) {
        const err = await res.json();
        console.log(err.message);
    }
}

function createRecipe(event) {
    const formData = new FormData(event.target)

    const name = formData.get('name');
    const image = formData.get('img');
    const ingredients = formData.get('ingredients')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l != '');
    const steps = formData.get('steps')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l != '');

    return {
        name,
        image,
        ingredients,
        steps
    }
};

