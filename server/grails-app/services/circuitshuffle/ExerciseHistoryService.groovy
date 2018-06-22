package circuitshuffle

import grails.gorm.services.Service

@Service(ExerciseHistory)
interface ExerciseHistoryService {

    ExerciseHistory get(Serializable id)

    List<ExerciseHistory> list(Map args)

    Long count()

    void delete(Serializable id)

    ExerciseHistory save(ExerciseHistory exerciseHistory)

}