import axios from '../axios'
import bcrypt from 'bcryptjs';

export const UserRegistration = data => {
	const password = data.password;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	// data["password"] = hash;
	console.log(data);
	return axios.post('/users/', {
		"name":data.name,
		"email":data.email,
		"password":data.password
	})
		.then(res => res.status)
};

