// import "./roadMapView.css";

import { useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { RoadDataDTO, RoadNodeDTO } from "../../interfaces/map/mapInterfaces";

interface IAddRoadWindow {
  isValid: boolean;
  errorMessage: string | null;
  onCancel: () => void;
  onChanged: (road: RoadDataDTO) => void;
  onSubmit: () => void;
}

function AddRoadView({
  isValid,
  errorMessage,
  onCancel,
  onChanged,
  onSubmit,
}: IAddRoadWindow) {
  const [nodes, setNodes] = useState<Array<RoadNodeDTO>>([]);

  const lengthRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);

  const onAddNode = (latitude: number, longitude: number) => {
    if (isNaN(latitude) || isNaN(longitude)) {
      return;
    }

    let newNodes = [
      ...nodes,
      {
        id: nodes.length > 0 ? nodes[nodes.length - 1].id + 1 : 0,
        latitude,
        longitude,
      },
    ];

    setNodes(newNodes);

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
      nodes: nodes,
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
          onChange={onFieldChanged}
        />
      </div>
      <div>
        <label htmlFor="name">Nazwa: </label>
        <input type="text" id="name" ref={nameRef} onChange={onFieldChanged} />
      </div>
      <label>Węzły:</label>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            id: {node.id}, lat: {node.latitude}, long: {node.longitude}
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
          Dodaj drogę
        </Button>
      </div>
    </>
  );
}

export default AddRoadView;
