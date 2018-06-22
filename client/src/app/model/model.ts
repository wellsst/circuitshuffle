

export class HistoricalCategory {
    id: number
    name: String

}

export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class SuitType {
    id: number
    name: String // clubs, hearts
    selectedExercise?: Exercise
    selectRandomExercise?: boolean = false
    wilcardAllocated?: boolean = false
}

export class ExerciseRepetition {
    id: number
    name: String
    exercise: Exercise //what will the user do
    reps: number
    isWildcard?: boolean = false
    suit: SuitType
}

export class ExerciseType {
    id: number
    shortName: String // eg Cardio, Biceps
}

export class Exercise {
    id: number
    name: string
    description: String
    exerciseTypes: ExerciseType[]
}

export class ExerciseHistory {
    id: number

    completedOn: Date
    exercise: Exercise
    reps: number
    timeTakenSecs: number
}
/*
export class Message {
    id: number
    text: String
}*/

export class Prefs {
    id: number
    name: String

}
