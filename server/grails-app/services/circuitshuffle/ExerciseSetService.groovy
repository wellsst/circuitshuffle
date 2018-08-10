package circuitshuffle

import grails.gorm.services.Service

@Service(ExerciseSet)
interface ExerciseSetService {

    ExerciseSet get(Serializable id)

    List<ExerciseSet> list(Map args)

    Long count()

    void delete(Serializable id)

    ExerciseSet save(ExerciseSet exerciseSet)

}