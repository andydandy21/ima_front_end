import { Outlet } from "react-router-dom";

export default function AccountLayout() {
    return (
        <div className="account-layout">
            <Outlet />
        </div>
    )
}