
const Contact=require('../models/model_contact');

class AddContactForm{
	constructor(selector, contactService){
		this.selector=selector;
		this.contactService=contactService;
		this.onregister=()=>{};
		document.addEventListener('DOMContentLoaded', ()=>{
			this.init();
			this.binds();
		});

	}
	init(){
		this.container=document.querySelector(this.selector);
		this.nameInput=this.container.querySelector('.chosen-contact__add-form_name');
		this.typeInput=this.container.querySelector('#type');
		this.valueInput=this.container.querySelector('.chosen-contact__add-form_value');
		this.button=this.container.querySelector('button');

	}
	binds(){
		this.button.addEventListener('click', ()=>{this.addContact();
			
		})
	}
	addContact(){
		let contact=new Contact(
			this.typeInput.value,
			this.nameInput.value,
			this.valueInput.value
			);
		if(contact.name.trim()===''||contact.value.trim()===''){
			alert('Fill form');
			return;
		}
		this.contactService.addContact(contact).then(r=>{
			if(r.status=='error') this.addContactError(r.error);
			else this.successAddContact();
		})
		
	}

	addContactError(text){
		alert(text);
	}
	successAddContact(){
		this.clearForm();
		alert('Contact added!');
		this.onregister();

	}
	clearForm(){
		this.nameInput.value='';
		this.typeInput.value='';
		this.valueInput.value='';
	}
	
	
}
module.exports=AddContactForm;