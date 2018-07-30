package circuitshuffle

import grails.gorm.annotation.Entity
import grails.rest.Resource
import groovy.transform.ToString
import org.grails.datastore.gorm.GormEntity

@ToString
@Resource(uri='/exerciseTypes')
class ExerciseType  {
    String targetArea // eg biceps
    String shortName
    String description

    /*static hasMany = [exercises: Exercise]

    static mapping = {
        exercises lazy: false
    }*/

    static constraints = {

    }
}
