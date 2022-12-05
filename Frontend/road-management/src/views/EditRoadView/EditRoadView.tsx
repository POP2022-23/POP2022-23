import { useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { RoadDataDTO, RoadNodeDTO } from "../../interfaces/map/mapInterfaces";

interface IEditRoadWindow {
  isValid: boolean;
  errorMessage: string | null;
  roadData: RoadDataDTO;
  onCancel: () => void;
  onChanged: (road: RoadDataDTO) => void;
  onSubmit: () => void;
}

function EditRoadView({
  isValid,
  errorMessage,
  roadData,
  onCancel,
  onChanged,
  onSubmit,
}: IEditRoadWindow) {
  const lengthRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);

  const onAddNode = (latitude: number, longitude: number) => {
    if (isNaN(latitude) || isNaN(longitude)) {
      return;
    }

    let newNodes = [
      ...roadData.nodes,
      {
        id:
          roadData.nodes.length > 0
            ? roadData.nodes[roadData.nodes.length - 1].id + 1
            : 0,
        latitude,
        longitude,
      },
    ];

    onChanged({
      length: parseFloat(lengthRef.current!.value),
      name: nameRef.current!.value,
      nodes: newNodes,
    });
  };

  const onDeleteNode = (id: number) => {
    let newNodes = roadData.nodes.filter((node) => node.id !== id);

    onChanged({
      length: parseFloat(lengthRef.current!.value),
      name: nameRef.current!.value,
      nodes: newNodes,
    });
  };

  const onFieldChanged = () => {
    onChanged({
      length: parseFloat(lengthRef.current!.value),
      name: nameRef.current!.value,
      nodes: roadData.nodes,
    });
  };

  return (
    <>
      {errorMessage ? <Alert variant={"danger"}>{errorMessage}</Alert> : null}
      <div>
        <label htmlFor="length">Długość: </label>
        <input
          type="number"
          id="length"
          ref={lengthRef}
          value={roadData.length}
          onChange={onFieldChanged}
        />
      </div>
      <div>
        <label htmlFor="name">Nazwa: </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          value={roadData.name}
          onChange={onFieldChanged}
        />
      </div>
      <label>Węzły:</label>
      <ul>
        {roadData.nodes.map((node) => (
          <li key={node.id}>
            id: {node.id}, lat: {node.latitude}, long: {node.longitude}{" "}
            <Button variant="primary" onClick={() => onDeleteNode(node.id)}>
              x
            </Button>
          </li>
        ))}
      </ul>
      <div>
        <label htmlFor="lat">Długość geograficzna: </label>
        <input type="text" id="lat" ref={latRef} />
        <label htmlFor="long">Szerokość geograficzna: </label>
        <input type="text" id="long" ref={longRef} />
        <Button
          variant="primary"
          onClick={() =>
            onAddNode(
              parseFloat(latRef.current!.value),
              parseFloat(longRef.current!.value)
            )
          }
        >
          Dodaj węzeł
        </Button>
      </div>
      <div>
        <Button variant="primary" onClick={onCancel}>
          Anuluj
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={!isValid}>
          Zapisz drogę
        </Button>
      </div>
    </>
  );
}

export default EditRoadView;
