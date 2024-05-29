import {useMemo} from "react"
import {useAppStore} from "../Store/useAppStore"
import DrinkCard from "../Components/DrinkCard"

const FavoritePage = () => {
  const favorites = useAppStore((state) => state.favorites)

  const hasFavorites = useMemo(() => favorites.length, [favorites])
  return (
    <>
      <h1 className=" text-5xl font-extrabold">Favoritos</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favorites.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <p className=" my-10 text-center text-2xl py-5 font-bold">
          Los Favoritos Se mostraran Aqui
        </p>
      )}
    </>
  )
}

export default FavoritePage
