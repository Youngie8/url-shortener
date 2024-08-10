import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <main>
            {/* Header */}
            {/* Body */}
            <Outlet />
        </main>
        {/* footer */}
    </div>
  )
}

export default AppLayout