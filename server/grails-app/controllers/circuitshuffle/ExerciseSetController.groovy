package circuitshuffle

import circuitshuffle.auth.User
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class ExerciseSetController extends BaseController {

    ExerciseSetService exerciseSetService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        /*params.max = Math.min(max ?: 10, 100)
        respond exerciseSetService.list(params), model:[exerciseSetCount: exerciseSetService.count()]*/
        try {
            User user = checkPermissions(getUserToken())
            def exerciseSets = ExerciseSet.findAllByOwnerIsNullOrOwner(user)
            respond exerciseSets
        } catch (all) {
            log.error(all.message)
            render status: UNAUTHORIZED
        }
    }

    def show(Long id) {
        respond exerciseSetService.get(id)
    }

    def save(ExerciseSet exerciseSet) {
        User user = checkPermissions(getUserToken())

        if (exerciseSet == null) {
            render status: NOT_FOUND
            return
        }
        exerciseSet.owner = user
        try {
            exerciseSetService.save(exerciseSet)
        } catch (ValidationException e) {
            respond exerciseSet.errors, view:'create'
            return
        }

        respond exerciseSet, [status: CREATED, view:"show"]
    }

    def update(ExerciseSet exerciseSet) {
        User user = checkPermissions(getUserToken())
        if (exerciseSet.owner != user) {
            render status: FORBIDDEN
            return
        }

        if (exerciseSet == null) {
            render status: NOT_FOUND
            return
        }

        try {
            exerciseSetService.save(exerciseSet)
        } catch (ValidationException e) {
            respond exerciseSet.errors, view:'edit'
            return
        }

        respond exerciseSet, [status: OK, view:"show"]
    }

    def delete(Long id) {

        User user = checkPermissions(getUserToken())
        ExerciseSet exerciseSet = exerciseSetService.get(id)
        if (exerciseSet.owner != user) {
            render status: FORBIDDEN
            return
        }

        if (id == null) {
            render status: NOT_FOUND
            return
        }

        exerciseSetService.delete(id)

        render status: NO_CONTENT
    }
}
