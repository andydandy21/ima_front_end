import { Link, useMatch, useResolvedPath } from "react-router-dom";


export default function Navlink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
        <Link
            className="navbar--link"
            style={match && { borderRadius: "25%" }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
  }
  