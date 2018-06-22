package circuitshuffle

import circuitshuffle.auth.User

//@Resource(uri='/history')
class ExerciseHistory  {

    Date completedOn
    //Exercise exercise
    int reps
    int timeTakenSecs

    static belongsTo = [exercise: Exercise, user: User]
    
}
