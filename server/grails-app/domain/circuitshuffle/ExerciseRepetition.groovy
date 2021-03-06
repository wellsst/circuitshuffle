package circuitshuffle

import grails.gorm.annotation.Entity
import groovy.transform.ToString
import org.grails.datastore.gorm.GormEntity

@ToString
class ExerciseRepetition  {

    String name
    Exercise exercise  //what will the user do
    int reps
    boolean isWildcard  = false
    SuitType suit
}
