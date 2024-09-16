import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Agenda = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="d-flex justify-content-end mb-2">
                <Link to="/addContact">
                    <button className="btn-custom">Añadir nuevo contacto</button>
                </Link>
            </div>
            <ul className="list-group">
                {store.agenda.map((item, index) =>
                    <div className="container" key={index}>
                        <div className="row my-2 contact">
                            <div className="col-md-3 d-flex justify-content-center align-items-center "> <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
                                className="rounded-circle contactoImagen" /></div>
                            <div className="col-md-6">
                                <h3>{item.name}</h3>
                                <p className="text-secondary mb-1">&#128205; {item.address}</p>
                                <p className="text-secondary mb-1">&#128222; {item.phone}</p>
                                <p className="text-secondary mb-1">&#9993;&#65039; {item.email}</p>
                            </div>
                            <div className="col-md-3 d-flex justify-content-between align-items-center">
                                <span className="btn btn-sm fs-3" onClick={() => {
                                    actions.saveContact(item)
                                    navigate("/editForm")
                                }}>&#9999;&#65039;</span>
                                <span className="btn btn-sm fs-3 me-5" onClick={() => { actions.borrarContacto(item.id) }}>&#128465;&#65039;</span >
                            </div>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    );
};