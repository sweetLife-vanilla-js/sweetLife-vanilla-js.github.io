import { getAllRecipes } from '../api/data.js'
import { html } from '../lib.js'

const homeTemplate = (recipes) => html`<section id="dashboard-page" class="dashboard">
    <h1>Life is sweet</h1>
    ${recipes.length > 0 
        ? html`<ul class="other-recipe-list">
        ${recipes.map(recipePreview)}</ul>` 
        : html`<p class="no-recipes">No recipes in database!</p>`}
</section>`

const recipePreview = (recipe) => html`<li class="otherRecipes">
    <h3>Name: ${recipe.name}</h3>
    <p>Category: ${recipe.category}</p>
    <p class="img"><img src=${recipe.imageUrl} /></p>
    <a class="button" href="/details/${recipe._id}">Details</a>
</li>`

export async function homePage(ctx) {
    const recipes = await getAllRecipes()
    ctx.render(homeTemplate(recipes))
}


