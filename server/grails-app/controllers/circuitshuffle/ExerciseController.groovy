package circuitshuffle

import circuitshuffle.auth.User

//import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

//@Secured(['ROLE_USER'])
class ExerciseController extends BaseController {

    ExerciseService exerciseService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        //params.max = Math.min(max ?: 10, 100)
        // respond exerciseService.list(params), model:[exerciseCount: exerciseService.count()]
        try {
            User user = checkPermissions(getUserToken())
            def exercises = Exercise.findAllByOwnerIsNullOrOwner(user)
            // respond exercises, model: [exerciseCount: exercises.size()]
            /*def list = exerciseService.list(params)
            log.info list.size()
            list.each {
                log.info it.toString()
            }*/
            respond exercises
        } catch (all) {
            log.error(all.message)
            render status: UNAUTHORIZED
        }

    }

    def exerciseListNonSkip(Integer max) {
        try {
            User user = checkPermissions(getUserToken())
            def exercises = Exercise.findAllByOwnerIsNullOrOwner(user)

            exercises = exercises.findAll { exercise ->
                !user.skipList.contains(exercise)
            }

            respond exercises
        } catch (all) {
            log.error(all.message)
            render status: UNAUTHORIZED
        }
    }

    def exerciseSkipList() {
        try {
            User user = checkPermissions(getUserToken())
            respond user.skipList
        } catch (all) {
            render status: UNAUTHORIZED
        }
    }

    def addToSkipList(int id) {
        User user
        try {
            user = checkPermissions(getUserToken())
        } catch (all) {
            render status: UNAUTHORIZED
            return
        }
        Exercise exercise = Exercise.get(id)
        user.addToSkipList(exercise)
        
        user.save(flush: true)
        respond user.skipList, [status: OK]
    }

    def removeFromSkipList(int id) {
        User user
        try {
            user = checkPermissions(getUserToken())
        } catch (all) {
            render status: UNAUTHORIZED
            return
        }
        Exercise exercise = Exercise.get(id)
        user.removeFromSkipList(exercise)
        user.save(flush: true)
        respond user.skipList, [status: OK]
    }

    def show(Long id) {
        respond exerciseService.get(id)
    }

    def search(String partialName) {
        //respond exerciseService.search(partialName)
    }

    def save(Exercise exercise) {
        if (exercise == null) {
            render status: NOT_FOUND
            return
        }

        try {
            exerciseService.save(exercise)
        } catch (ValidationException e) {
            respond exercise.errors, view: 'create'
            return
        }

        respond exercise, [status: CREATED, view: "show"]
    }

    def update(Exercise exercise) {
        if (exercise == null) {
            render status: NOT_FOUND
            return
        }

        try {
            exerciseService.save(exercise)
        } catch (ValidationException e) {
            respond exercise.errors, view: 'edit'
            return
        }

        respond exercise, [status: OK, view: "show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        exerciseService.delete(id)

        render status: NO_CONTENT
    }
}
