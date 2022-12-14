import { Lesson } from "./lesson";

export interface Unit {
    unitId: number;
    name: string;
    locked: boolean;
    number: number;
    selected: boolean;
    lessons: Lesson[];
    reviewName: string;
    reviewId: number;
    details:any;
    inProgress: boolean;
}
