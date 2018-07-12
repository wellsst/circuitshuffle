package circuitshuffle

import grails.gorm.services.Service

@Service(Exercise)
interface ExerciseService {

    Exercise get(Serializable id)

    List<Exercise> list(Map args)

    Long count()

    void delete(Serializable id)

    Exercise save(Exercise exercise)



   // List<Exercise> search(String partialName)
}