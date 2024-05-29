import {StateCreator} from "zustand"
import {FavoritesSliceType} from "./favoriteSlice"

export type Notifcation = {
  text: string
  error: boolean
  show: boolean
}

export type NotificationSliceType = {
  notification: Notifcation
  showNotification: (payload: Pick<Notifcation, "text" | "error">) => void
  hideNotification: () => void
}

export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoritesSliceType,
  [],
  [],
  NotificationSliceType
> = (set, get) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  showNotification: (payload) => {
    //Abrir Notificacion
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    })
    setTimeout(() => {
      get().hideNotification()
    }, 3500)
  },
  hideNotification: () => {
    //Cerrar Notifcacion
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    })
  },
})
