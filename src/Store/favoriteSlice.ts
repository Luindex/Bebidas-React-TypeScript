import {StateCreator} from "zustand"
import {Recipe} from "../types"
import {RecipesSliceType} from "./recipleSlice"
import {
  NotificationSliceType,
  createNotificationSlice,
} from "./NotificationSlice"

export type FavoritesSliceType = {
  favorites: Recipe[]
  handleClickFavorite: (recipe: Recipe) => void
  favoriteExiste: (id: Recipe["idDrink"]) => boolean
  loadFronStorage: () => void
}

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExiste(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }))
      createNotificationSlice(set, get, api).showNotification({
        text: "Se Elimino de Favoritos",
        error: false,
      })
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }))
      createNotificationSlice(set, get, api).showNotification({
        text: "Se Agrego a Favoritos",
        error: false,
      })
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites))
  },
  favoriteExiste: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id)
  },
  loadFronStorage: () => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      })
    }
  },
})
