package circuitshuffle

import grails.gorm.annotation.Entity
import groovy.transform.ToString
import org.grails.datastore.gorm.GormEntity

@ToString
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
