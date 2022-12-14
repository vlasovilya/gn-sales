import { Unit } from "./unit";

export interface Model {
    modelId: number;
    name: string;
    number: number;
    units: Unit[];
    details: any;
    inProgress:boolean;
}
