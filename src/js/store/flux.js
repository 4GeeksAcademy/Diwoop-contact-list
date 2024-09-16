const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agenda: [{
				"name": "",
				"phone": "",
				"email": "",
				"address": ""
			}],
			contact: {},
			slug: "DianaEstallo"
		},
		actions: {
			loadSomeData: async () => {
				const response = await fetch("https://playground.4geeks.com/contact/agendas/DianaEstallo/contacts", { method: "GET" });
				const data = await response.json();
				setStore({ agenda: data.contacts })
			},
			crearAgenda: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/DianaEstallo", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (!response.ok) {
						throw new Error("Error al crear la agenda");
					}
				} catch (error) {
					console.log(error);
				}
			},
			getAgenda: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/DianaEstallo")
					if (response.status != 200) {
						console.log(response.status)
					}
					const data = await response.json();
					setStore({ agenda: data.contacts });

				} catch (error) {
					console.log(error);
				}
			},
			nuevoContacto: async (name, phone, email, address, navigate) => {
				const capitalizedName = name.replace(/\b\w/g, (char) => char.toUpperCase());
				const capitalizedAddress = address.replace(/\b\w/g, (char) => char.toUpperCase());
			
				try {
					const cuerpo = JSON.stringify({
						"name": capitalizedName,
						"phone": phone,
						"email": email,
						"address": capitalizedAddress
					});
			
					const uri = "https://playground.4geeks.com/contact/agendas/DianaEstallo/contacts";
					const requestsOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: cuerpo,
					};
					const response = await fetch(uri, requestsOptions);
					const data = await response.json();
					getActions().loadSomeData();
					navigate("/");
				} catch (error) {
					console.log(error);
				}
			},
			borrarContacto: async (idContacto) => {
				const requestsOptions = { method: "DELETE" };
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/DianaEstallo/contacts/${idContacto}`, requestsOptions);
				if (response.ok) {
					const store = getStore();
					const updateContacts = store.agenda.filter(contact => contact.id != idContacto);
					setStore({ contacts: updateContacts });
					getActions().loadSomeData();
				}
			},
			actualizarContacto: async (contact, navigate) => {
				try {
					const uri = `https://playground.4geeks.com/contact/agendas/DianaEstallo/contacts/${contact.id}`;
					const options = {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(contact),
					};
					const response = await fetch(uri, options);
					console.log(response);
					if (response.status === 200) {
						console.log("Contacto actualizado");
						const data = await response.json();
						getActions().loadSomeData();
						navigate("/")
					} else {
						throw new Error(`Error al obtener la ID: ${contact.id}`);
					}
				} catch (error) {
					console.log(error);
					throw error;
				}
			},
			saveContact: (contact) => {setStore({contact: contact})}
		}
	};
};

export default getState;
			},
			saveContact: (contact) => {setStore({contact: contact})}
		}
	};
};

export default getState;
