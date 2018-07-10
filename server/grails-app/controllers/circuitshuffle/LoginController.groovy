package circuitshuffle

import circuitshuffle.auth.User
import org.springframework.http.HttpStatus

import static org.springframework.http.HttpStatus.NOT_FOUND

class LoginController {
	static responseFormats = ['json', 'xml']
    //static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]


    def index() { }

    def show() {
        if (request.get) {
            println "redning view 'show'"
            respond "testing 123"
        }

        def u = User.findByUsername(params.login)
        println "user logging in is: ${params.login}"
        if (u) {
            /*if (u.password == params.password) {
                session.user = u
                redirect(action: "home")
            }
            else {
                render(view: "login", model: [message: "Password incorrect"])
            }*/
        }
        else {
            println "Rendering to login page..."
            render(view: "login", model: [message: "User not found"])
        }
    }

    // Yea this is not security at all
    def login() {
        String username = request.JSON.username
        String password = request.JSON.password
        log.info( "Login attempt: ${request.JSON}")

        // def user = User.findByUsernameAndPassword(username, password)
        def user = User.findByUsername(username)
        if (user && (user.password == password)) {
            def token = UUID.randomUUID().toString()
            // todo: create a real full JWT token
            user.token = token
            user.save()
            log.info("User logged in ${user}")
            respond token: token
        }
        /* TODO: Check for expired, locked etc */
        else {
            log.warn("User login attempt ${username}, but user not found or password invalid, users are: ${User.list(max: 10)}")
            render text: "User login attempt ${username}, but user not found or password invalid", status: HttpStatus.UNAUTHORIZED
        }
    }
    def signup(String emailAddress) {
        log.info "Signup request from user: ${emailAddress}"
    }
}
