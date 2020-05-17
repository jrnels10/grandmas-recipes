import { addNewRecipe, updateRecipe, deleteMyRecipe } from "../../API/RecipeAPI";

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

export async function uploadRecipeNew(value, that) {
    const recipeObject = {
        dateSubmitted: new Date(),
        recipeDescription: that.state.recipeDescription,
        submittedBy: `${value.user.firstName} ${value.user.lastName}`,
        chefId: that.state.chefId,
        recipeName: that.state.recipeName,
        recipeOwnerId: value.user.id,
        groups: that.state.groups,
        ingredients: that.state.ingredients,
        cookingInstructions: that.state.cookingInstructions
    };

    var bodyFormData = new FormData();
    bodyFormData.append('picture', that.state.img);
    bodyFormData.append('accountType', value.user.method);
    bodyFormData.append('myRecipes', JSON.stringify(recipeObject));
    bodyFormData.append('private', true);
    return await addNewRecipe(bodyFormData, value.user.id);
};

export async function deleteRecipe(recipeId, userId, that) {
    const res = await deleteMyRecipe(recipeId, userId);
    if (res.status === 200) {
        that.props.history.push('/familychefs');
    } else if (res.error) {
        console.log(res)
    }
};