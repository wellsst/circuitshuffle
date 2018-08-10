package circuitshuffle

import circuitshuffle.auth.User
import grails.gorm.annotation.Entity
import grails.rest.Resource
import groovy.transform.ToString
import org.grails.datastore.gorm.GormEntity

//@Resource(uri='/exercise')
class Exercise {

    String name
    String description
    boolean isPrivate = false

    User owner

    static hasMany = [exerciseTypes: ExerciseType]
    static mapping = {
        exerciseTypes lazy: false
        description type: 'text'
    }
    static constraints = {
        //name unique: true
        isPrivate nullable: true
        owner nullable: true
    }

}
