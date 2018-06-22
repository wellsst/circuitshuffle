package circuitshuffle

import circuitshuffle.auth.User
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*


class ExerciseHistoryController { //extends RestfulController<ExerciseHistory> {

    ExerciseHistoryService exerciseHistoryService

    static responseFormats = ['json', 'xml']
    //static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    /* ExerciseHistoryController() {
         super(ExerciseHistory)
     }*/

    def checkPermissions(String token) {
        //def token = request.getHeader("token")
        log.info "Check permissions: ${token}"
        User user = User.findByUsername(token)
        if (!user) {
            throw new Exception("No user found for token: ${token}")
        }
        user
    }

    def index(Integer max) {
        // println " ********** ${exerciseHistoryService.list()}"
        /*def token = request.getHeader("token")
        log.info "User getting history: ${ token}"
        User user = User.findByToken(token)
        if (!user) {
            render status: NOT_FOUND
            return
        }*/
        try {
            String userName = "swellz@pm.me"
            //User user = checkPermissions(request.getHeader("token"))
            User user = checkPermissions(userName)
            log.info "${user}"
            respond ExerciseHistory.findAllByUser(user)
        } catch (all) {
            render status: UNAUTHORIZED
        }

        // respond user.exerciseHistories  // lazy stopping this working?
        /*params.max = Math.min(max ?: 10, 100)
        respond exerciseHistoryService.list(params), model:[exerciseHistoryCount: exerciseHistoryService.count()]*/
    }

    //def show(Long id) {
    def show(ExerciseHistory exerciseHistory) {
        //respond exerciseHistoryService.get(id)
        //println exerciseHistory
        respond exerciseHistory
    }

    def save(ExerciseHistory exerciseHistory) {
        // todo: uncomment to turn auth back on
        // def userName = request.getHeader("token")
        String userName = "swellz@pm.me"
        User user
        try {
            user = checkPermissions(userName)
        } catch (all) {
            render status: UNAUTHORIZED
        }

        log.info "Saving history item ${exerciseHistory} for user: ${userName}"

        /* User user = User.findByUsername(userName)
         if (!user) {
             render status: NOT_FOUND
             return
         }*/

        if (exerciseHistory == null) {
            render status: NOT_FOUND
            return
        }

        try {
            exerciseHistory.user = user
            exerciseHistory.validate()
            exerciseHistory.errors.allErrors.each {
                log.info it
            }
            user.addToExerciseHistories(exerciseHistory)
            user.save()
            exerciseHistoryService.save(exerciseHistory)
        } catch (ValidationException e) {
            respond exerciseHistory.errors, view: 'create'
            return
        }
        log.info "${exerciseHistory}"
        respond exerciseHistory, [status: CREATED, view: "show"]
    }

    def update(ExerciseHistory exerciseHistory) {
        if (exerciseHistory == null) {
            render status: NOT_FOUND
            return
        }

        try {
            exerciseHistoryService.save(exerciseHistory)
        } catch (ValidationException e) {
            respond exerciseHistory.errors, view: 'edit'
            return
        }

        respond exerciseHistory, [status: OK, view: "show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        exerciseHistoryService.delete(id)

        render status: NO_CONTENT
    }
}
