import { Route, Redirect } from "react-router-dom"; 
import Cookies from "js-cookie";


const LoginProtectedRoute = (props) => {
    const jwtToken = Cookies.get("jwt_token");

    if(jwtToken !== undefined) {
        return <Redirect to="/" />
    } else {
        return <Route {...props} />
    }
}

export default LoginProtectedRoute 