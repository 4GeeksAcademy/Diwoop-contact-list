import React, { useState, useContext } from "react"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../../styles/demo.css";

//NOS CAPTURE LO QUE ESTAMOS ESCRIBIENDO EN EL INPUT (CON UN ONCHANGE)
const EditForm = () => {
    const { store, actions } = useContext(Context)
    const [contact, setContact] = useState(store.contact);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value })
    }

    //Formulario para añadir contactos
    return (
            <div className="container my-3">
                <h2>Formulario de Contacto</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            name="name"
                            value={contact.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            name="phone"
                            value={contact.phone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            name="email"
                            value={contact.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            name="address"
                            value={contact.address}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="button" className="btn btn-primary mt-4" onClick={() => { actions.actualizarContacto(contact, navigate) }}>Enviar</button>
                    </div>
                    <Link to="/">
                        <span className="">o vuelve a los contactos</span>
                    </Link>
                </form>
            </div>
    )
}

export default EditForm;