package circuitshuffle

//import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

//@Secured(['ROLE_USER'])
class ExerciseController {

    ExerciseService exerciseService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        //params.max = Math.min(max ?: 10, 100)
        //log.error "${exerciseService.list(params)}"
        respond exerciseService.list(params), model:[exerciseCount: exerciseService.count()]
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
            respond exercise.errors, view:'create'
            return
        }

        respond exercise, [status: CREATED, view:"show"]
    }

    def update(Exercise exercise) {
        if (exercise == null) {
            render status: NOT_FOUND
            return
        }

        try {
            exerciseService.save(exercise)
        } catch (ValidationException e) {
            respond exercise.errors, view:'edit'
            return
        }

        respond exercise, [status: OK, view:"show"]
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
