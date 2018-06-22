package circuitshuffle


class SecurityInterceptor {

    SecurityInterceptor() {
        matchAll().except(controller: 'login', action: 'show')
    }

    boolean before() {
        /*println "*********  in before view, controller: ${controllerName} actionName: ${actionName}  "
        if (!session.user && actionName != "show") {
            println " ------  redir to loing"
            redirect(controller: "login", action: "show")
            return false
        }*/
        return true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
