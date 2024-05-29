import {Outlet} from "react-router-dom"
import Header from "../Components/Header"
import Modal from "../Components/Modal"
import {useEffect} from "react"
import {useAppStore} from "../Store/useAppStore"
import Notification from "../Components/Notification"

const Layout = () => {
  const loadFronStorage = useAppStore((state) => state.loadFronStorage)

  useEffect(() => {
    loadFronStorage()
  }, [])
  return (
    <>
      <Header />
      <main className=" container mx-auto py-16">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  )
}

export default Layout
