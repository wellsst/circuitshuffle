package circuitshuffle.auth

import circuitshuffle.Exercise
import circuitshuffle.ExerciseHistory
import com.bloomhealthco.jasypt.GormEncryptedStringType
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class User implements Serializable {

    private static final long serialVersionUID = 1

    String username
    String password
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired

    String token

    static hasMany = [exerciseHistories: ExerciseHistory, skipList: Exercise]

    Set<Role> getAuthorities() {
        (UserRole.findAllByUser(this) as List<UserRole>)*.role as Set<Role>
    }

    static constraints = {
        password nullable: false, blank: false, password: true
        username email: true, nullable: false, blank: false, unique: true
        token nullable: true
    }

    static mapping = {
        table 'uzer'
	    password column: '`password`', type: GormEncryptedStringType
    }
}
