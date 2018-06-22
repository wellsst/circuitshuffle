package circuitshuffle

import circuitshuffle.auth.User

class FavouriteSet {

    String name
    String description
    boolean allowWildCards = true

    static hasMany = [exercises: Exercise]

    static belongsTo = [user: User]

    static constraints = {
        description nullable: true
        exercises size: 4..4
    }
}
