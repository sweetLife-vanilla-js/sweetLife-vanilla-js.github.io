import { editRecipe, getRecipeById } from '../api/data.js'
import { html } from '../lib.js'
import {notify} from '../notify.js'

const editTemplate = (recipe, onSubmit) => html`<section id="edit-page" class="edit">
<form @submit=${onSubmit} id="edit-form" action="#" method="">
<fieldset>
        <legend>Edit my Recipe</legend>
        <p class="field">
            <label for="name">Name:</label>
            <span class="input">
                <input type="text" name="name" id="name" placeholder="Name" .value=${recipe.name}>
            </span>
        </p>
        <p class="field">
            <label for="description">Description:</label>
            <span class="input">
                <textarea name="description" id="description" placeholder="Description" .value=${recipe.description}></textarea>
            </span>
        </p>

        <p class="field">
            <label for="ingredients">Ingredients:</label>
            <span class="input">
                <textarea name="ingredients" id="ingredients" placeholder="Ingredients" .value=${recipe.ingredients}></textarea>
            </span>
        </p>

        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" placeholder="Image" .value=${recipe.imageUrl}>
            </span>
        </p>
        <p class="field">
            <label for="category">Category</label>
            <span class="input">
                <select id="category" name="category" .value=${recipe.category}>
                <option value="">--Choose an option--</option>
                    <option value="cake">Cake</option>
                    <option value="cookie">Cookie</option>
                    <option value="pie">Pie</option>
                    <option value="muffin">Muffin</option>
                    <option value="sweets">Sweets</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`

export async function editPage(ctx) {
    const recipe = await getRecipeById(ctx.params.id)
    ctx.render(editTemplate(recipe, onSubmit))

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name').trim()
        const description = formData.get('description').trim()
        const ingredients = formData.get('ingredients').trim()
        const imageUrl = formData.get('imageUrl').trim()
        const category = formData.get('category').trim()
        if (name == '' || description == '' || ingredients == '' || imageUrl == '' || category == '') {
            return notify('All fields are required!')
        }
        await editRecipe(ctx.params.id, {
            name, 
            description, 
            ingredients,
            imageUrl, 
            category
        })
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}