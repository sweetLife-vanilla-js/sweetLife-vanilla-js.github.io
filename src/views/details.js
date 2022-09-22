import { getRecipeById, deleteRecipe, getLikesByRecipeId, getMyLikeByRecipeId, likeRecipe } from '../api/data.js'
import { html } from '../lib.js'
import { getUserData } from '../util.js'

 
const detailsTemplate = (recipe, isOwner, onDelete, likes, showLikeButton, onLike) => html`<section id="details-page" class="details">
<div class="recipe-information">
    <h3>Name: ${recipe.name}</h3>
    <p class="type">Category: ${recipe.category}</p>
    <p class="img"><img src=${recipe.imageUrl}></p>
    <div class="actions">
        ${recipeControlsTemplate(recipe, isOwner, onDelete)}
         ${likeControlsTemplate(showLikeButton, onLike)}
         <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${likes}</span>
        </div>
    </div>
</div>
<div class="recipe-description">
    <h3>Description:</h3>
    <p>${recipe.description}</p>
    <h4>Ingredients:</h4>
    <p>${recipe.ingredients}</p>
</div>
</section>`

const recipeControlsTemplate = (recipe, isOwner, onDelete) => {
    if(isOwner) {
        return html`
            <a class="button" href="/edit/${recipe._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
    } else {
        return null
    }
}

const likeControlsTemplate = (showLikeButton, onLike) => {
    if(showLikeButton) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
    } else {
        return null
    }
}

export async function detailsPage(ctx) {
    const userData = getUserData()
    const [recipe, likes, hasLike] = await Promise.all([
        getRecipeById(ctx.params.id),
        getLikesByRecipeId(ctx.params.id),
        userData ? getMyLikeByRecipeId(ctx.params.id, userData.id) : 0
    ])
   
    const isOwner = userData && userData.id == recipe._ownerId
    const showLikeButton = userData != null && isOwner == false && hasLike == false
    ctx.render(detailsTemplate(recipe, isOwner, onDelete, likes, showLikeButton, onLike))

    async function onDelete() {
        const choice = confirm('Are you sure????')
        if(choice) {
            await deleteRecipe(ctx.params.id) 
            ctx.page.redirect('/')
        }
    }

    async function onLike() {
        await likeRecipe(ctx.params.id)
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}

