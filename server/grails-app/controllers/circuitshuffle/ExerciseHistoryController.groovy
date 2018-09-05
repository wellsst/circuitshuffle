package circuitshuffle

import circuitshuffle.auth.User
import grails.validation.ValidationException
import groovy.time.TimeCategory

import static org.springframework.http.HttpStatus.*


class ExerciseHistoryController extends BaseController {

    ExerciseHistoryService exerciseHistoryService

    static responseFormats = ['json', 'xml']
    //static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        String userName = getUserToken()

        try {
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
        def userName = request.getHeader("token")
        User user
        try {
            user = checkPermissions(userName)
        } catch (all) {
            render status: UNAUTHORIZED
            return
        }

        log.info "Saving history item ${exerciseHistory} for user: ${userName}"

        if (exerciseHistory == null) {
            render status: NOT_FOUND
            return
        }

        try {
            exerciseHistory.user = user

            def today = new Date().clearTime()
            def eod

            use (TimeCategory) {
                eod = today + 1.day - 1.millisecond
            }

            // Check existing reocrds for today if so just update them
            List<ExerciseHistory> todaysRecords = ExerciseHistory.findAllByExerciseAndCompletedOnBetween(
                    exerciseHistory.exercise, today, eod)
            todaysRecords.each { hist ->
                exerciseHistory.reps += hist.reps
                hist.delete(flush: true)
                log.info "exHist nr reps ${exerciseHistory.reps} (added ${hist.reps})"
            }

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
