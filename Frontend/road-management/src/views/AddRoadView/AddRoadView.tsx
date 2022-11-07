// import "./roadMapView.css";

import { useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { RoadDataDTO, RoadNodeDTO } from "../../interfaces/map/mapInterfaces";

interface IAddRoadWindow {
  errorMessage: string | null;
  onAddRoad: (road: RoadDataDTO) => void;
}

function AddRoadView({ errorMessage, onAddRoad }: IAddRoadWindow) {
  const [nodes, setNodes] = useState<Array<RoadNodeDTO>>([]);

  const idRef = useRef<HTMLInputElement>(null);
  const lengthRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);

  const onAddNode = (latitude: number, longitude: number) =>
    setNodes([
      ...nodes,
      {
        id: nodes.length > 0 ? nodes[nodes.length - 1].id + 1 : 0,
        latitude,
        longitude,
      },
    ]);

  return (
    <>
      {errorMessage ? <Alert variant={"danger"}>{errorMessage}</Alert> : null}
      <div>
        <label htmlFor="id">Id: </label>
        <input type="number" id="id" ref={idRef} />
      </div>
      <div>
        <label htmlFor="length">Długość: </label>
        <input type="number" id="length" ref={lengthRef} />
      </div>
      <div>
        <label htmlFor="name">Nazwa: </label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <label>Węzły:</label>
      <ul>
        {nodes.map((node) => (
          <li>
            id: {node.id}, lat: {node.latitude}, long: {node.longitude}
          </li>
        ))}
      </ul>
      <div>
        <label htmlFor="lat">Szerokość: </label>
        <input type="text" id="lat" ref={latRef} />
        <label htmlFor="long">Wysokość: </label>
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
      <Button
        variant="primary"
        onClick={() =>
          onAddRoad({
            id: parseInt(idRef.current!.value),
            length: parseFloat(lengthRef.current!.value),
            name: nameRef.current!.value,
            nodes: nodes,
          })
        }
      >
        Dodaj drogę
      </Button>
    </>
  );
}

export default AddRoadView;
