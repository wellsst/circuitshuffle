package circuitshuffle

import circuitshuffle.auth.Role
import circuitshuffle.auth.User
import circuitshuffle.auth.UserRole

class BootStrap {

    def init = { servletContext ->

       /* UserOld user = User.findOrSaveByUsernameAndPassword("steve")
        UserOld testUser = User.findOrSaveByUsername("test")*/

        Role userRole = Role.findOrSaveByAuthority("ROLE_USER")
        User user = User.findOrSaveByUsernameAndPassword("swellz@pm.me", "123qwe")
        UserRole.create(user, userRole, true)

       // Role userRole2 = Role.findOrSaveByAuthority("ROLE_USER")
        /*User user2 = User.findOrSaveByUsernameAndPassword("steve", "123qwe")
        UserRole.create(user2, userRole, true)*/

        LookupData.create()
    }
    
    def destroy = {
    }
}
