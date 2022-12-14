
export interface Lesson {
    lessonId: number;
    name: string;
    locked: boolean;
    number: number;
    selected: boolean;
    processedDescription: string;
    progressions: any[];
    UnitLesson: any;
    LessonWorksheets: any[];
    old_lesson_id: string;

}
