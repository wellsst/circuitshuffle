package circuitshuffle

import circuitshuffle.auth.User

class ExerciseSet {
    String name
    String description

    User owner

    SortedSet exerciseReps
    static hasMany = [exerciseReps: ExerciseSetRep]

    static mapping = {
        description type: 'text'
        exerciseReps lazy: false, sort: 'position', order: 'desc'

    }

    static constraints = {
        owner nullable: true
    }
}
