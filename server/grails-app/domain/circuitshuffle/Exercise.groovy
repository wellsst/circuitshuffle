package circuitshuffle

import grails.gorm.annotation.Entity
import grails.rest.Resource
import groovy.transform.ToString
import org.grails.datastore.gorm.GormEntity

//@Resource(uri='/exercise')
class Exercise {

    String name
    String description

    static hasMany = [exerciseTypes: ExerciseType]
    static mapping = {
        //name unique: true
        exerciseTypes lazy: false
        description type: 'text'
    }

}
