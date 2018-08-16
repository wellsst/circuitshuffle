package circuitshuffle

class ExerciseSetRep implements Comparable {

    Exercise exercise
    int nrReps
    int position

    static belongsTo = [exerciseSet: ExerciseSet]

    static mapping = {
        //sort position:"asc"
    }

    static constraints = {
    }

    @Override
    int compareTo(Object o) {
        this.position.compareTo(o.position)
    }
}
