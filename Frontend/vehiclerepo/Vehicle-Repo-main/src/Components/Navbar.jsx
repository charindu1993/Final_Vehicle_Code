import React from 'react'

import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <NavLink to="/Dashboard" >
                Dashboard
            </NavLink>
            <NavLink to="/Vehiclepage"  >
                vehicle
            </NavLink>
            <NavLink to="/Reminders" >
                reminders
            </NavLink>
            <NavLink to="/User_Info" >
                User info
            </NavLink>
        </>

    )
}

export default Navbar
