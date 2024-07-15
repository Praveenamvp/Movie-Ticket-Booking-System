export default interface Location {
    uid: string;
    name: string;
    parentLocationID?: string;
    locationChild: Location[];
}
  