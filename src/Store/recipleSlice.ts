import {StateCreator} from "zustand"
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../services/RecipeServices"
import type {Categories, Drink, Drinks, SearchFilter, Recipe} from "../types"

export type RecipesSliceType = {
  categories: Categories
  drinks: Drinks
  selectdRecipe: Recipe
  modal: boolean
  fetchCategories: () => Promise<void>
  searchRecipes: (SearchFilter: SearchFilter) => Promise<void>
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>
  closeModal: () => void
}

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectdRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories,
    })
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters)
    set({
      drinks,
    })
  },
  selectRecipe: async (id) => {
    const selectdRecipe = await getRecipeById(id)
    set({
      selectdRecipe,
      modal: true,
    })
  },
  closeModal: () => {
    set({
      modal: false,
      selectdRecipe: {} as Recipe,
    })
  },
})
