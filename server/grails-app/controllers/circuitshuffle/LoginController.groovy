package circuitshuffle

import circuitshuffle.auth.Role
import circuitshuffle.auth.User
import circuitshuffle.auth.UserRole
import org.apache.commons.lang.WordUtils
import org.springframework.http.HttpStatus

import static org.springframework.http.HttpStatus.NOT_FOUND

class LoginController {
	static responseFormats = ['json', 'xml']
    //static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def mailService

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

    def signup() {
        String emailAddress = request.JSON.emailAddress
        log.info "Signup request from user: ${emailAddress}"

        User user = User.findByUsername(emailAddress)
        if (user) {
            respond text: "User already exists, try just logging in.", status: HttpStatus.IM_USED
        } else {
            def wordMap = servletContext["wordMap"]
            String password = generatePassphrase(wordMap)[0]

            User newUser = new User(username: emailAddress, password: password)
            def token = UUID.randomUUID().toString()
            // todo: create a real full JWT token
            newUser.token = token
            newUser.save(flush: true)
            Role userRole = Role.findOrSaveByAuthority("ROLE_USER")
            UserRole.create(newUser, userRole, true)

            mailService.sendMail {
                to emailAddress
                from "websystemz@gmail.com"
                subject "Hello from CircuitShuffle"
                // html view: "/emails/html-hello", model: [param1: "value1", param2: "value2"]
                html """
<p>Congrats!  You have signed-up to CircuitShuffle, your password is: <b>${password}</b><p>
    <p></p>
    <p>We suggest changing this password ASAP</p>
    <p></p>
    <p><a href='${grailsApplication.config.grails.serverURL}/login'>Login:  using your email address</a></p>
    <p></p>
    <p>Happy shuffling!</p>
    <p></p>
    <p>The CircuitShuffle team</p>
    
"""
            }

            /*Map response = [username: emailAddress, password:password]
            respond response*/
            respond token: token
        }
       
    }

    private static List generatePassphrase(def wordMap, int nrPhrases = 1, int nrWords = 3) {
        List<String> phraseList = []
        (1..nrPhrases).each {
            String phrase = ""
            (1..nrWords).eachWithIndex { attempt, index ->
                String rollKey = ""
                (1..5).each { roll ->
                    rollKey += new Random().nextInt(6) + 1
                }

                //println "   Rolled: ${rollKey}"
                String word = wordMap[rollKey]

                if (index >= 1) {
                    word = WordUtils.capitalize(word)
                }

                //println "   Word: ${word}"
                phrase += word
            }
            log.warn "Gen: ${phrase}"
            phraseList << phrase
        }
        phraseList
    }
}
