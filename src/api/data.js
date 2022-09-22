import * as api from './api.js'

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function getAllRecipes() {
    return api.get('/data/recipes?sortBy=_createdOn%20desc')
}

export async function getRecipeById(id) {
    return api.get('/data/recipes/' + id) // should be concatenated, not with :id
}

export async function getMyRecipes(userId) {
    return api.get(`/data/recipes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function createRecipe(recipe) {
    return api.post('/data/recipes', recipe)
}

export async function editRecipe(id, recipe) {
    return api.put('/data/recipes/' + id, recipe)
}

export async function deleteRecipe(id) {
    return api.del('/data/recipes/' + id)
}

export async function likeRecipe(recipeId) {
    return api.post('/data/likes', {
        recipeId
    })
}

export async function getLikesByRecipeId(recipeId) {
    return api.get(`/data/likes?where=recipeId%3D%22${recipeId}%22&distinct=_ownerId&count`)
}

export async function getMyLikeByRecipeId(recipeId, userId) {
    return api.get(`/data/likes?where=recipeId%3D%22${recipeId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}