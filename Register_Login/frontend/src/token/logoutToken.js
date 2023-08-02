import jwtDecode from "jwt-decode";

function logoutUser() {
    const token = localStorage.getItem("token")

    if(token) {
        const {user} = jwtDecode(token)
        return user
    }

    return null;
}

export default logoutUser;