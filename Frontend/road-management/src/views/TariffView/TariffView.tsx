
import React, { useState, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { ITariff, ITariffWindow, TariffDTO } from "../../interfaces/tariff/tariffinterfaces";
const data = [
    {
        "id": 0,
        "category": "Samochód osobowy",
        "price": 15.23,
    },
    {
        "id": 1,
        "category": "Motor",
        "price": 10.00,
    },
    {
        "id": 2,
        "category": "Bus",
        "price": 45.32,
    },
    {
        "id": 3,
        "category": "Pojazd ciężarowy",
        "price": 50.00,
    }
]


const TariffView = () => {
    const [tariffs, setTariffs] = useState(data);
    const [editing, setEditing] = useState(false);
    const [editingField, setEditingField] = useState(false);
    const [addFormData, setAddFormData] = useState({ category: "", price: 0 });
    const [editFormData, setEditFormData] = useState({ category: "", price: 0 });
    const [infoMessage, setInfoMessage] = useState('');



    class TariffDispatcher implements ITariffWindow {
        showStatusMessage(result: boolean): void {
            setInfoMessage(`${result ? `Udało się dodać taryfikator!` : 'Nie udało się dodać taryfikatora!'}`);
        }
    }

    const tariffDispatcher = new TariffDispatcher();


    class TariffPresenter implements ITariff {


        onAddFormChanged = (event: any) => {
            event.preventDefault();

            const fieldName = event.target.getAttribute("name");
            const fieldValue = event.target.value;


            const newFormData = { ...addFormData };
            newFormData[fieldName] = fieldValue;

            setAddFormData(newFormData);
           

        };

        sendTariffChangeDataToSave = (event: any) => {
            event.preventDefault();

            const fieldName = event.target.getAttribute("name");
            const fieldValue = event.target.value;

            const newFormData = { ...editFormData };
            newFormData[fieldName] = fieldValue;

            setEditFormData(newFormData);
        };

        sendNewTariffDataToSave = (event: any) => {
            event.preventDefault();

            const newtariff = {
                id: tariffs.length,
                category: addFormData.category,
                price: addFormData.price,

            };

            const newtariffs = [...tariffs, newtariff];
            setTariffs(newtariffs);
            tariffDispatcher.showStatusMessage(true);
        };
        onDeleteClicked = (TariffId: any) => {
            const newtariffs = [...tariffs];

            const index = tariffs.findIndex((tariff: any) => tariff.id === TariffId);
            console.log(index)
            newtariffs.splice(index, 1);
            var filteredArray = tariffs.filter(t => t.id !== TariffId)
            setTariffs(filteredArray);
        };
    }

    const tariffPresenter = new TariffPresenter();

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center" }}>Taryfikator</h1>
            <Form>
                <Form.Check reverse style={{ marginRight: "35px" }}
                    type="checkbox"
                    label={`Edytuj`}
                    onClick={() => setEditing(!editing)}
                />
            </Form>
            {editing &&
                <Button
                    onClick={() => setEditingField(!editingField)}
                >Edytuj
                </Button>}
            <Form className="d-flex justify-content-center" style={{ margin: "30px" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Kategoria samochodu</th>
                            <th>Cena za kilometr</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tariffs.map((tariff: any) => (
                            <Fragment key={tariff.id} >
                                <tr>
                                    <td>
                                        <input disabled={!editingField}
                                            defaultValue={tariff.category}
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                    </td>
                                    <td>
                                        <input disabled={!editingField}
                                            defaultValue={tariff.price}>

                                        </input>
                                    </td>
                                    <td>
                                        {editing && <Button variant="danger"
                                            onClick={() => tariffPresenter.onDeleteClicked(tariff.id)}
                                        >
                                            Usuń
                                        </Button>}
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </Form>
            {editing && <div>
                <h3>Dodaj taryfikator</h3>
                <form onSubmit={tariffPresenter.sendNewTariffDataToSave}>
                    <input
                        type="text"
                        name="category"
                        placeholder="Dodaj kategorię pojazdu"
                        onChange={tariffPresenter.onAddFormChanged}
                    />
                    <input style={{ marginLeft: "10px", marginRight: "10px" }}
                        type="text"
                        name="price"
                        placeholder="Dodaj cenę za kilometr"
                        onChange={tariffPresenter.onAddFormChanged}
                    />
                    <button >Dodaj</button>
                    <p>{infoMessage}</p>


                </form>
            </div>}
        </div>
    );
};

export default TariffView;