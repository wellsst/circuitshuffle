package circuitshuffle

import grails.gorm.annotation.Entity
import groovy.transform.ToString
import org.grails.datastore.gorm.GormEntity

@ToString
class SuitType {
    String name
    Exercise selectedExercise
    boolean selectRandomExercise
    boolean wilcardAllocated
}
