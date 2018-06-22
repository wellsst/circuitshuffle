package circuitshuffle


import grails.rest.*
import grails.converters.*

class RootController {
	static responseFormats = ['json', 'xml']
	
    def index() {
        redirect(uri:"/index.html")
    }
}
