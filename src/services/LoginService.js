import axios from '../axios'
import jwt_decode from "jwt-decode";
import setAuthToken from '../utils/validation/setAuthToken'
const LoginService = data => (

axios.post('/users/login', data)
    .then(res =>{
        console.log(res.data)
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        sessionStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        return res.status
    })
);

export default LoginService;
