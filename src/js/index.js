
let activeName=null;
let nameElements;
let names=[];
const User=require('./models/model_user');
const Contact=require('./models/model_contact');
const UserServices=require('./services/user_services');
let userService=new UserServices();
const ContactServices=require('./services/contacts_services');
let contactService=new ContactServices(userService);
const RegisterForm=require('./components/register_form');
let registerForm = new RegisterForm('.register-form', userService);

const LoginForm=require('./components/login_form');
let loginForm = new LoginForm('.login_form', userService);
loginForm.onregister=()=>{
	showPeople();
}
const AddContactForm=require('./components/add_contact_form');
let addContactForm=new AddContactForm('.chosen-contact__add-form', contactService);
addContactForm.onregister=()=>{
	showPeople();
}


function showPeople(){
		let nameList=document.querySelector('.name-list');
		nameList.innerHTML=''
		nameElements = contactService.getAllContacts().then(c=>c.map(c=>Contact.createContactName(c))).then(rs=>rs.map((r,i)=>createNameElement(r,i))).then(rs=>rs.forEach((r)=>append(r)))
		nameList.addEventListener('click', (e)=>{
			if (!e.target.matches('.name-list__name-element')) return;
			let index =e.target.dataset.index;
			let chosenName=e.target.dataset.name;
			let chosenValue=e.target.dataset.value;
			contactService.findContact(chosenName, chosenValue).then(rs=>rs.map((r)=>createChosenContactElement(r)))			
		})

	}



function append(arg){
		let nameList=document.querySelector('.name-list');
		nameList.append(arg);
	}

function createChosenContactElement(contact){
	let chosenContactInformation=document.querySelector('.chosen-contact__information');
	let chosenContactInformationElements=document.createElement('div');
	chosenContactInformation.innerHTML='';
	chosenContactInformationElements.classList.add('chosen-contact__information-elements');
	let chosenContactInformationName=document.createElement('div');
	chosenContactInformationName.classList.add('chosen-contact__information_name');
	let chosenContactInformationType=document.createElement('div');
	chosenContactInformationType.classList.add('chosen-contact__information_type');
	let chosenContactInformationValue=document.createElement('div');
	chosenContactInformationValue.classList.add('chosen-contact__information_value');
	chosenContactInformationName.append('Name: '+contact.name);
	chosenContactInformationType.append('Type: '+contact.type);
	chosenContactInformationValue.append('Value: '+contact.value);
	chosenContactInformationElements.append(chosenContactInformationName);
	chosenContactInformationElements.append(chosenContactInformationType);
	chosenContactInformationElements.append(chosenContactInformationValue);
	chosenContactInformation.prepend(chosenContactInformationElements);
	chosenContactInformationElements.style.display='flex';
	return chosenContactInformationElements;

}


function createNameElement(c,i){
		let nameElement=document.createElement('div');
		nameElement.classList.add('name-list__name-element');
		nameElement.dataset.index=i;
		nameElement.dataset.name=c.name;
		nameElement.dataset.value=c.value;
		nameElement.append(c.name);
		return nameElement;
	}



