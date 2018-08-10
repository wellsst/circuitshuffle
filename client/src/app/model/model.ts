export class HistoricalCategory {
  id: number
  name: String;
}

export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class SuitType {
  id: number
  name: String; // clubs, hearts
  selectedExercise?: Exercise
  selectRandomExercise?: boolean = false
  wilcardAllocated?: boolean = false
  // ui
  circuitSetupControl?: any
  filteredExercises?: any
  iconName?: String;
}

export class ExerciseRepetition {
  id: number
  name: String
  exercise: Exercise; // what will the user do
  reps: number
  isWildcard?: boolean = false
  suit?: SuitType;
}

export class ExerciseSetRep {
  id: number
  position: number
  exercise: Exercise; // what will the user do
  nrReps: number
}

export class ExerciseType {
  id: number
  shortName: String // eg Cardio, Biceps
}

export class Exercise {
  id: number
  name: string
  isPrivate: boolean
  description: String
  exerciseTypes: ExerciseType[]
  owner: User;
}

export class ExerciseHistory {
  id: number

  completedOn: Date
  exercise: Exercise
  reps: number
  timeTakenSecs: number;
}

export class ExerciseSet {
 // id: number
  name?: string
  description?: String
  exerciseReps?: ExerciseSetRep[]
  owner?: User;
}

/*
export class Message {
    id: number
    text: String
}*/

export class Prefs {
  id: number
  name: String;

}
