import axios from '../axios'

const LoginService = data => (
	axios.post('/users/login', data)
		.then(res => res.status)
);

export default LoginService;
