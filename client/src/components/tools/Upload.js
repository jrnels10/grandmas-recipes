import { addNewRecipe, updateRecipe } from "../../API/RecipeAPI";

export async function uploadRecipeEdit(value, that) {
    const { edit, _id } = that;
    const recipeObject = {
        [edit]: that[edit], recipeId: _id
    };
    const bodyFormData = new FormData();
    if (edit.indexOf("img") > -1) {
        bodyFormData.append('picture', that[edit]);
    }
    bodyFormData.append('accountType', value.user.method);
    bodyFormData.append('myRecipes', JSON.stringify(recipeObject));
    const res = await updateRecipe(bodyFormData, value.user.id);
    return res.data
};