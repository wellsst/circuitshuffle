package circuitshuffle

import circuitshuffle.auth.User

class ExerciseSet {
    String name
    String description

    User owner
    static hasMany = [exerciseReps: ExerciseSetRep]

    static mapping = {
        description type: 'text'
        exerciseReps lazy: false
    }

    static constraints = {
        owner nullable: true
    }
}
