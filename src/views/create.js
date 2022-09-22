import { createRecipe } from '../api/data.js'
import { html } from '../lib.js'
import { getUserData } from '../util.js'
import {notify} from '../notify.js'

const createTemplate = (onSubmit) => html`<section id="create-page" class="create">
<form @submit=${onSubmit} id="create-form" action="" method="">
    <fieldset>
        <legend>Create recipe</legend>
        <p class="field">
            <label for="name">Name:</label>
            <span class="input">
                <input type="text" name="name" id="name" placeholder="Name">
            </span>
        </p>
        <p class="field">
            <label for="description">Description:</label>
            <span class="input">
                <textarea name="description" id="description" placeholder="Description"></textarea>
            </span>
        </p>

        <p class="field">
            <label for="ingredients">Ingredients:</label>
            <span class="input">
                <textarea name="ingredients" id="ingredients" placeholder="Ingredients"></textarea>
            </span>
        </p>

        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" placeholder="Image">
            </span>
        </p>
        <p class="field">
            <label for="category">Category</label>
            <span class="input">
                <select id="category" name="category">
                <option value="">--Choose an option--</option>
                    <option value="cake">Cake</option>
                    <option value="cookie">Cookie</option>
                    <option value="pie">Pie</option>
                    <option value="muffin">Muffin</option>
                    <option value="sweets">Sweets</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Create your recipe">
    </fieldset>
</form>
</section>`

export async function createPage(ctx) {
    const userData = getUserData()
    if (!userData) {
        ctx.page.redirect('/login')
    }
    ctx.render(createTemplate(onSubmit))

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

        await createRecipe({
            name, 
            description,
            ingredients, 
            imageUrl, 
            category
        })
        event.target.reset()
        ctx.page.redirect('/')
    }
}