package circuitshuffle

class UrlMappings {

    static excludes = [
            '/css/*',
            '/fonts/*',
            '/static/*',
            '/asset-manifest.json',
            '/favicon.ico'
    ]

    static mappings = {
        //"/api/exercise"(resources:"exercise")

        "/signup" (controller: "login", action: "signup")
        "/login" (controller: "login", action: "login")


        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        /*"/$controller/$action?/$id?(.${format})?"{
            constraints {
                // apply constraints here
            }
        }*/
        "/"(controller: 'root', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
