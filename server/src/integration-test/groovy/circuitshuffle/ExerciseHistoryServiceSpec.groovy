package circuitshuffle

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class ExerciseHistoryServiceSpec extends Specification {

    ExerciseHistoryService exerciseHistoryService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new ExerciseHistory(...).save(flush: true, failOnError: true)
        //new ExerciseHistory(...).save(flush: true, failOnError: true)
        //ExerciseHistory exerciseHistory = new ExerciseHistory(...).save(flush: true, failOnError: true)
        //new ExerciseHistory(...).save(flush: true, failOnError: true)
        //new ExerciseHistory(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //exerciseHistory.id
    }

    void "test get"() {
        setupData()

        expect:
        exerciseHistoryService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<ExerciseHistory> exerciseHistoryList = exerciseHistoryService.list(max: 2, offset: 2)

        then:
        exerciseHistoryList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        exerciseHistoryService.count() == 5
    }

    void "test delete"() {
        Long exerciseHistoryId = setupData()

        expect:
        exerciseHistoryService.count() == 5

        when:
        exerciseHistoryService.delete(exerciseHistoryId)
        sessionFactory.currentSession.flush()

        then:
        exerciseHistoryService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        ExerciseHistory exerciseHistory = new ExerciseHistory()
        exerciseHistoryService.save(exerciseHistory)

        then:
        exerciseHistory.id != null
    }
}
