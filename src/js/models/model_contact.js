class Contact{
	constructor(type, name, value, id){
			this.type=type;
			this.name=name;
			this.value=value;
			this.id=id;
			
	}
	static createContact(c){
		return new Contact(c.type, c.name, c.value, c.id);
	}

	static createContactName(c){
		return nameElement={name: c.name,
							value: c.value
		};
	}

}

let nameElement={};
module.exports=Contact;
