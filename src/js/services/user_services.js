const User=require('../models/model_user');
class UserServices{
	constructor(userModel, token){
		this.userModel=userModel;
		this.token=null;
	}

	getAll(){
		return fetch(UserServices.BASE_URL+'users')
			.then(r=>r.json())
			.then(r=>r.users)
			.then(us=>us.map(u=>User.create(u)))
	}
	register(user){
		return fetch(UserServices.BASE_URL+'register',{
			method: 'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
				login: user.login,
				password: user.password,
				date_born: user.bornDate
			})
		}).then(r=>r.json());
	}

	login(user){
		return fetch(UserServices.BASE_URL+'login',{
			method: 'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
				login: user.login,
				password: user.password,
			})
		}).then(r=>r.json());
	}

	
}

UserServices.BASE_URL='https://mag-contacts-api.herokuapp.com/';
module.exports=UserServices;