package circuitshuffle

import circuitshuffle.auth.User
import grails.rest.*
import grails.converters.*

class BaseController {
	static responseFormats = ['json', 'xml']

    protected String getUserToken() {
        def userName = request.getHeader("token")
        return userName
    }

    def checkPermissions(String token) {
        //def token = request.getHeader("token")
        log.info "Check permissions: ${token}"
        User user = User.findByUsername(token, [cache: true])
        if (!user) {
            throw new Exception("No user found for token: ${token}")
        }
        user
    }

    def index() { }
}
