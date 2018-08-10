package circuitshuffle

class ExerciseSetRep {

    Exercise exercise
    int nrReps
    int position

    static belongsTo = [ExerciseSet]

    static mapping = {
        sort position:"asc"
    }

    static constraints = {
    }
}
