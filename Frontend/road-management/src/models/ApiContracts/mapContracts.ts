export interface GetRoadListContract {
    id: number,
    length: number,
    name: string,
    nodes: Array<{
        id: number,
        latitude: number,
        longitude: number
    }>
}