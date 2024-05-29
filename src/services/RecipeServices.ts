import axios from "axios"
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
  RecipeAPIResponseSchema,
} from "../schemas/recipesSchema"
import {SearchFilter, Drink} from "../types"

//Llamado a la API para obtener las Categorias
export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
  const {data} = await axios(url)
  const result = CategoriesAPIResponseSchema.safeParse(data)

  if (result.success) {
    return result.data
  }
}
//Llamaado a la APi para Obtener el Resultado de categoria y ingrediente
export async function getRecipes(filters: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
  const {data} = await axios(url)
  const result = DrinksAPIResponse.safeParse(data)
  if (result.success) {
    return result.data
  }
}
//Llamado a la Api para Obtener La receta de cada Drink
export async function getRecipeById(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const {data} = await axios(url)
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
  if (result.success) {
    return result.data
  }
}
