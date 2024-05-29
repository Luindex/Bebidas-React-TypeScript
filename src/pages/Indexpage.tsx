import {useMemo} from "react"
import {useAppStore} from "../Store/useAppStore"
import DrinkCard from "../Components/DrinkCard"

const Indexpage = () => {
  const drinks = useAppStore((state) => state.drinks)
  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
      {hasDrinks ? (
        <>
          {drinks.drinks.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </>
      ) : (
        <p className=" my-10 text-center text-2xl">No hay resultados Aun</p>
      )}
    </div>
  )
}

export default Indexpage
