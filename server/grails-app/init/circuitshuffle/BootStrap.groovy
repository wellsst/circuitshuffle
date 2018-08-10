package circuitshuffle

import circuitshuffle.auth.Role
import circuitshuffle.auth.User
import circuitshuffle.auth.UserRole

class BootStrap {

    //def mailService

    def init = { servletContext ->
        Map<String, String> wordMap = [:]
        servletContext.getResourceAsStream('diceware.wordlist.asc.txt').text.eachLine { line ->
            List fields = line.tokenize()
            wordMap.put(fields[0], fields[1])
        }

        servletContext.setAttribute("wordMap", wordMap)


        /*mailService.sendMail {
            to "wellsst@gmail.com"
            from "websystemz@gmail.com"                                                
            subject "Hello from CS"
            html "<b>Hello</b> World"
        }
*/
       /* UserOld user = User.findOrSaveByUsernameAndPassword("steve")
        UserOld testUser = User.findOrSaveByUsername("test")*/

       /* Role userRole = Role.findOrSaveByAuthority("ROLE_USER")
        User user = User.findOrSaveByUsernameAndPassword("swellz@pm.me", "123qwe")
        user.save([flush: true])
        UserRole.create(user, userRole, true)*/

       // Role userRole2 = Role.findOrSaveByAuthority("ROLE_USER")
        /*User user2 = User.findOrSaveByUsernameAndPassword("steve", "123qwe")
        UserRole.create(user2, userRole, true)*/
        log.info "Creating lookup data..."
        try {
            LookupData.create()
        } catch (all) {
            all.printStackTrace()
        }
        log.info "Lookup data defined."
    }
    
    def destroy = {
    }
}
