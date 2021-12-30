import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AccountLayout() {
    
    const navigate = useNavigate()

    React.useEffect(() => {
        if (localStorage.getItem('access_token')) {
            navigate('/')
        }
    }, [])

    return (
        <div className="account-layout">
            <Outlet />
        </div>
    )
}