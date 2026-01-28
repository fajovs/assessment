
import HeaderNavigation from '@/sections/HeaderNavigation'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <HeaderNavigation/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default RootLayout