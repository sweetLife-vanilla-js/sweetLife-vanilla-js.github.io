import { getMyRecipes } from '../api/data.js'
import { html } from '../lib.js'
import { getUserData } from '../util.js'

const myRecipesTemplate = (recipes) => html` <section id="my-recipes-page" class="my-recipes">
<h1>My Recipes</h1>

${recipes.length > 0 
        ? html`<ul class="my-recipes-list">
        ${recipes.map(recipePreview)}</ul>` 
        : html`<p class="no-recipes">No recipes in database!</p>`}

<ul class="my-recipes-list">
    
</ul>

</section>`

const recipePreview = (recipe) => html`<li class="otherRecipes">
    <h3>Name: ${recipe.name}</h3>
    <p>Category: ${recipe.category}</p>
    <p class="img"><img src=${recipe.imageUrl}></p>
    <a class="button" href="/details/${recipe._id}">Details</a>
</li>`

export async function myRecipesPage(ctx) {
    const userData = getUserData()

    if (!userData) {
        ctx.page.redirect('/login')
    }
    const recipes = await getMyRecipes(userData.id)
    ctx.render(myRecipesTemplate(recipes))
}

