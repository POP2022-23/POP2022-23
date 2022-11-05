export interface RoadNodeDTO {
    id: number,
    latitude: number,
    longitude: number
}

export interface RoadDataDTO {
    id: number,
    length: number,
    name: string,
    nodes: Array<RoadNodeDTO>
}