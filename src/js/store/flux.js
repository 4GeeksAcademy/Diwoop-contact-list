const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agenda: [{
				"name": "",
				"phone": "",
				"email": "",
				"address": ""
			}],//Aqui guardo los datos del GET
			contact: {},
			slug: "AJPadillo"
		},
		actions: {
			loadSomeData: async () => {//ACTUALIZA LOS DATOS DE LA API (NOS TRAE LOS DATOS)
				const response = await fetch("https://playground.4geeks.com/contact/agendas/AJPadillo/contacts", { method: "GET" });
				const data = await response.json();
				setStore({ agenda: data.contacts })
			},
			crearAgenda: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/AJPadillo", {
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
					const response = await fetch("https://playground.4geeks.com/contact/agendas/AJPadillo")
					if (response.status != 200) {
						console.log(response.status)
					}
					const data = await response.json();
					setStore({ agenda: data.contacts });

				} catch (error) {
					console.log(error);
				}
			},
			nuevoContacto: async (name, phone, address, email, navigate) => {
				console.log(name, phone, address, email);
				try {
					const cuerpo = JSON.stringify({
						"name": name,
						"phone": phone,
						"email": email,
						"address": address
					});
					const uri = "https://playground.4geeks.com/contact/agendas/AJPadillo/contacts";
					const requestsOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: cuerpo,
					}
					const response = await fetch(uri, requestsOptions);
					const data = await response.json();
					getActions().loadSomeData();
					navigate("/");
				} catch (error) {
					console.log(error)
				}
			},
			borrarContacto: async (idContacto) => {
				const requestsOptions = { method: "DELETE" };
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/AJPadillo/contacts/${idContacto}`, requestsOptions);
				if (response.ok) {
					const store = getStore();
					const updateContacts = store.agenda.filter(contact => contact.id != idContacto);
					setStore({ contacts: updateContacts });
					getActions().loadSomeData();
				}
			},
			actualizarContacto: async (contact, navigate) => {
				try {
					const uri = `https://playground.4geeks.com/contact/agendas/AJPadillo/contacts/${contact.id}`;
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