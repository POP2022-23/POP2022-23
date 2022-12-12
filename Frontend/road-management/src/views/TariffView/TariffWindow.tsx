
import React, { useState, useEffect, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import { Button, Dropdown } from "react-bootstrap";
import { ITariff, ITariffWindow, TariffDTO } from "../../interfaces/tariff/tariffinterfaces";
import { TariffModelProxy } from "../../models/TariffModelProxy";
import DropdownButton from "react-bootstrap/DropdownButton";


const TariffWindow = () => {
    const [editing, setEditing] = useState(false);
    const [editingField, setEditingField] = useState(false);
    const [addFormData, setAddFormData] = useState<TariffDTO | undefined>(
        undefined
    );
    const [editFormData, setEditFormData] = useState<TariffDTO | undefined>(
        undefined
    );
    const [infoMessage, setInfoMessage] = useState('');
    const [tariffList, setTariffList] = useState<TariffDTO[]>(
        new Array<TariffDTO>()
    );
    const [selectedTariff, setSelectedTariff] = useState<TariffDTO | undefined>(
        undefined
    );
    const [newSelectedTariff, setNewSelectedTariff] = useState<TariffDTO | undefined>(
        undefined
    );

    useEffect(() => {
        const proxy = new TariffModelProxy();
        async function fetchFromApi() {
            setTariffList(await proxy.getTariffList());
        }
        fetchFromApi();
    }, []);



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
            if(selectedTariff !== undefined){
            selectedTariff.rates.set(fieldName, fieldValue)
            setNewSelectedTariff(selectedTariff);
        }

        };

        sendTariffChangeDataToSave = async (event: any) => {
            event.preventDefault();

            const fieldName = event.target.getAttribute("name");
            const fieldValue = event.target.value;

            if(selectedTariff !== undefined){
            const tariffProxy = new TariffModelProxy();
            selectedTariff.rates.set(fieldName, fieldValue)
            let proxyResponse = await tariffProxy.updateTariff(selectedTariff)
        }
        };

        sendNewTariffDataToSave = async (event: any) => {
            event.preventDefault();
            if (selectedTariff !== undefined) {
                const newtariff = {
                    id: selectedTariff.id,
                    isValid: selectedTariff.isValid,
                    name: selectedTariff.name,
                    rates: selectedTariff.rates,
                    roadIds: selectedTariff.roadIds

                };
                const tariffProxy = new TariffModelProxy();
                let proxyResponse = await tariffProxy.saveTariffdData(newtariff);

                const newtariffs = [...tariffList, newtariff];
                setTariffList(newtariffs);
                tariffDispatcher.showStatusMessage(proxyResponse);
            };
        }
        onRoadIdSelected = (item: string | null) => {
            if (item !== null) {
                const tl = tariffList.find((tl) => tl.id!.toString() === item);
                setSelectedTariff(tl);
            }
        };

    }

    const tariffPresenter = new TariffPresenter();

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center" }}>Taryfikator</h1>
            <DropdownButton style={{ marginTop: "20px" }}
                variant={"info"}
                title={"Droga"}
                onSelect={tariffPresenter.onRoadIdSelected}
            >
                {tariffList.map((tl) => {
                    return (
                        <Dropdown.Item key={tl.id} eventKey={tl.id}>
                            {tl.roadIds}
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
            <Form>
                <Form.Check reverse style={{ marginRight: "35px" }}
                    type="checkbox"
                    label={`Edytuj`}
                    onClick={() => setEditing(!editing)}
                />
            </Form>
            {editing &&
                <>
                    <Button
                        onClick={() => setEditingField(!editingField)}
                    >Edytuj
                    </Button>
                </>

            }
            <Form className="d-flex justify-content-center" style={{ margin: "30px" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Kategoria samochodu</th>
                            <th>Cena za kilometr</th>

                        </tr>
                    </thead>
                    <tbody>
                        {selectedTariff !== undefined &&
                            <Fragment key={selectedTariff.id} >
                                <tr>
                                    <td>
                                        <input disabled={true}
                                            defaultValue="Motocykl"
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                    </td>
                                    <td>
                                        <input disabled={!editingField}
                                            defaultValue={selectedTariff.rates.get("MOTORBIKE")}
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                        <input disabled={true}
                                            defaultValue="Samochód osobowy"
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                    </td>
                                    <td>
                                        <input disabled={!editingField}
                                            defaultValue={selectedTariff.rates.get("PASSENGER_CAR")}
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                        <input disabled={true}
                                            defaultValue="Autobus"
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                    </td>
                                    <td>
                                        <input disabled={!editingField}
                                            defaultValue={selectedTariff.rates.get("BUS")}
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                        <input disabled={true}
                                            defaultValue="Pojazd ciężarowy"
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                    </td>
                                    <td>
                                        <input disabled={!editingField}
                                            defaultValue={selectedTariff.rates.get("TRUCK")}
                                            onChange={tariffPresenter.sendTariffChangeDataToSave}>
                                        </input>
                                    </td>
                                </tr>
                            </Fragment>
                        }
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

export default TariffWindow;