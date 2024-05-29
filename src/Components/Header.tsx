import {ChangeEvent, FormEvent, useEffect, useMemo, useState} from "react"
import {NavLink, useLocation} from "react-router-dom"
import {useAppStore} from "../Store/useAppStore"
useAppStore

const Header = () => {
  const {pathname} = useLocation()

  const isHome = useMemo(() => pathname === "/", [pathname])
  const categories = useAppStore((state) => state.categories)
  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const searchRecipes = useAppStore((state) => state.searchRecipes)
  const showNotification = useAppStore((state) => state.showNotification)

  useEffect(() => {
    fetchCategories()
  }, [])

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  })

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    //Validacion
    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "Tienes Campos Vacios",
        error: true,
      })
      return
    }

    searchRecipes(searchFilters)
  }
  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
      onSubmit={handleSubmit}
    >
      <div className=" mx-auto container px-5 py-16">
        <div className=" flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="" />
          </div>

          <nav className=" flex gap-4">
            <NavLink
              to="/"
              className={({isActive}) =>
                isActive
                  ? " text-orange-500 uppercase font-bold"
                  : " text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({isActive}) =>
                isActive
                  ? " text-orange-500 uppercase font-bold"
                  : " text-white uppercase font-bold"
              }
            >
              {" "}
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            action=""
            className=" md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
          >
            <div className=" space-y-4">
              <label
                className=" block text-white uppercase font-extrabold text-lg"
                htmlFor="ingredient"
              >
                Nombre o Ingredientes
              </label>

              <input
                id="ingredient"
                name="ingredient"
                type="text"
                className=" p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o Ingrediente, Ej ,Vodka, Tequila, Cafe"
                value={searchFilters.ingredient}
                onChange={handleChange}
              />
            </div>

            <div className=" space-y-4">
              <label
                className=" block text-white uppercase font-extrabold text-lg"
                htmlFor="category"
              >
                Categoria
              </label>

              <select
                id="category"
                name="category"
                className=" p-3 w-full rounded-lg focus:outline-none"
                value={searchFilters.category}
                onChange={handleChange}
              >
                <option value=""> -- Seleccione -- </option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Receta"
              className=" cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-semibold uppercase w-full p-2 rounded-lg"
            />
          </form>
        )}
      </div>
    </header>
  )
}

export default Header
