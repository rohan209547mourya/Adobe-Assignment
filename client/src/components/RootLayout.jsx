import React from 'react'
import NaviagationBar from './NaviagationBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <section>
        <NaviagationBar />
        <main>
            <Outlet />
        </main>
    </section>
  )
}

export default RootLayout