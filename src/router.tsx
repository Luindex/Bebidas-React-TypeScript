import {BrowserRouter, Routes, Route} from "react-router-dom"
import IndexPage from "./pages/Indexpage"
import {lazy, Suspense} from "react"
import "./index.css"
import Layout from "./Layouts/Layout"

const FavoritePage = lazy(() => import("./pages/FavoritePage"))
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route
            path="/favoritos"
            element={
              <Suspense fallback="Cargando">
                <FavoritePage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
