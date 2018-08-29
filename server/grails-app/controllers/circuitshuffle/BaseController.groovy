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
        if (!token) {
            throw new Exception("No token provided")
        }
        log.info "Check permissions: ${token}"
        User user = User.findByUsername(token, [cache: true])
        if (!user) {
            throw new Exception("No user found for token: ${token}")
        }
        user
    }

    def index() { }
}
