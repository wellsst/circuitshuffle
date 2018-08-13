package circuitshuffle

class ExerciseSetRep {

    Exercise exercise
    int nrReps
    int position

    static belongsTo = [exerciseSet: ExerciseSet]

    static mapping = {
        sort position:"asc"
    }

    static constraints = {
    }
}
