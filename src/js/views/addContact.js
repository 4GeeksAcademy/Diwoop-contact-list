import React, { useState, useContext } from "react"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../../styles/demo.css";

//NOS CAPTURE LO QUE ESTAMOS ESCRIBIENDO EN EL INPUT (CON UN ONCHANGE)
const addContact = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const { actions } = useContext(Context)
    const navigate = useNavigate();

    const dataToSend = [{
        "name": name,
        "phone": phone,
        "email": email,
        "address": address
    }]
    //Formulario para añadir contactos
    return (
            <div className="formulario container my-3">
                <h2>Formulario de Contacto</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="button" className="btn-custom btn-primary mt-4" onClick={() => { actions.nuevoContacto(name, phone, email, address, navigate) }}>Enviar</button>
                    </div>
                    <Link to="/">
                        <span className="">o vuelve a los contactos</span>
                    </Link>
                </form>
            </div>
    )
}

export default addContact;