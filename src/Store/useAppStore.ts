import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {createRecipeSlice, RecipesSliceType} from "./recipleSlice"
import {FavoritesSliceType, createFavoritesSlice} from "./favoriteSlice"
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./NotificationSlice"

export const useAppStore = create<
  RecipesSliceType & FavoritesSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
  }))
)
