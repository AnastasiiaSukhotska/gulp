const User=require('../models/model_user');
class RegisterForm{
	constructor(selector, userService){
		this.selector=selector;
		this.userService=userService;
		this.onregister=()=>{};
		document.addEventListener('DOMContentLoaded', ()=>{
			this.init();
			this.binds();
		});

	}
	init(){
		this.container=document.querySelector(this.selector);
		this.loginInput=this.container.querySelector('#login_user_login');
		this.bornInput=this.container.querySelector('#login_user_born');
		this.passwordInput=this.container.querySelector('#login_user_password');
		this.button=this.container.querySelector('button');

	}
	binds(){
		this.button.addEventListener('click', ()=>this.register())
	}
	register(){
		let user=new User(
			this.loginInput.value,
			this.bornInput.value,
			this.passwordInput.value
			);
		this.userService.register(user).then(r=>{
			if(r.status=='error') this.registerError(r.error);
			else this.successRegister();
		})
		
	}

	registerError(text){
		alert(text);
	}
	successRegister(){
		this.clearForm();
		alert('You are registered!');
		this.onregister();
	}
	clearForm(){
		this.passwordInput.value='';
		this.loginInput.value='';
		this.bornInput.value='';
	}
	
}
module.exports=RegisterForm;