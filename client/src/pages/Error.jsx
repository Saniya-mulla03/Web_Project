import { NavLink } from "react-router-dom"

export const Error = () => {
    return (
        <>
            <section id="error-page">
                <div className="container content">
                    <h2 className="header">404</h2>
                    <h4>Sorry! Page not found</h4>
                    <p>
                        Oops! It seems like the page you are trying to access does not exist.
                        If you believe there is an issue, feel free to report it, and we will look into it. 
                    </p>
                    <div>
                        <NavLink to="/" className="btn secondary-btn error-btn">RETURN HOME</NavLink>
                        <NavLink to="/contact" className="btn secondary-btn error-btn">REPORT PROBLEM</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}