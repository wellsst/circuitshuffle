# CircuitShuffle

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## What/Why?

Similar to SweatDeck but with some feateures I want or are too cheap to fork out on $4.50 app for:

From Au Govt:
PHYSICAL ACTIVITY
* Doing any physical activity is better than doing none. If you currently do no physical
activity, start by doing some, and gradually build up to the recommended amount.
* Be active on most, preferably all, days every week.
* Accumulate 150 to 300 minutes (2 ½ to 5 hours) of moderate intensity physical activity or
75 to 150 minutes (1 ¼ to 2 ½ hours) of vigorous intensity physical activity, or an
equivalent combination of both moderate and vigorous activities, each week.
* Do muscle strengthening activities on at least 2 days each week.
SEDENTARY BEHAVIOUR
* Minimise the amount of time spent in prolonged sitting.
* Break up long periods of sitting as often as possible.


Today (according to Dr Axe) the ability to perform 41 burpees in one minute is deemed ‘excellent’, 
while ‘only’ managing 27 constitutes a ’poor’ fitness level.
 Which likely means that you’ve got work to do.
 
## Dependencies

* Material
* https://github.com/MurhafSousli/ngx-progressbar


## Future features

* Consider changing client/server comms to https://graphql.org/, https://www.apollographql.com/docs/angular/basics/queries.html, 
https://grails.github.io/gorm-graphql/latest/guide/index.html, https://blog.goodapi.co/rest-vs-graphql-a-critical-review-5f77392658e7 
* Slider to bias legs/arms/core?
* Compete against other , perhaps have ranks like a military
* See how consistent you are
* Reminders to get moving - needs email
* Start a competition
* Have ranks
* See your data against other similar people - anon, eg 50-55 year old males
* History charts / month by month etc
* Realtime calories (will need some basic user info age.weight/sex)
* Voice - say the name of the exercise or motiviation as well
* Exercise instructions with either images or video
* Goals and how much are met - A user setting to save to DB
* Partner/group workouts?
* Programs - create default and user defined programmes.  
* Put grails plugin jasypt config in ext files: http://plugins.grails.org/plugin/dtanner/org.grails.plugins%3Ajasypt-encryption
* If a user is not on DB need better rejection to front-end
* Send email via non-Gmail: https://www.oodlestechnologies.com/blogs/Sending-email-through-amazon-mail-service-in-Grails
* Better auth maybe: 
    * http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial
    * https://medium.com/@ozgurgul/angular-6-login-and-router-tutorial-ac5fc5d3027f
    * http://mherman.org/blog/2018/04/17/authentication-in-angular-with-ngrx/#.WuESstNuZQM
    * http://www.devglan.com/spring-security/angular-jwt-authentication

## Small changes on the board

* Warmups/cooldowns -  Add perhaps as just a suggestion - make these an exercise type so they dont get mixed up
* Possibly change the Exercise domain to include a parent `Exercise` called `variationOf` eg Diamond push-ups are a variation of Pushups - good for reporting  
* Fix all `Exercise` domains in LookupData to not include description in the findOrSave
* Add some kind of legal verbiage, and agree to terms checkbox on signup
* stop the timer in Angular and display the correct total time (properly)
* Better app for mobile see like: https://houssein.me/progressive-angular-applications 
* Change password
* forgotten pass
* Week by week, month by month reports or charts or something.
* Scheduled reminders to get moving and weekly/monthly report
* Hide signup prompts if user logged in eg on intro page
* Add own custom exercises - better than simple version
* Deleting of custom exercises - better than simple version
* Move the `LoginController` email HTML to be streaming groovy template or similar
* Display logged in as username  (needs alignment)
* Compress nr of history rows - create summaries on a scheduled basis, only needed since the free Heroku has 10k limit! 
* Support for Admin users

## WIP

* No password auth like medium just use email and a token, see also: https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
* Option during workout to skip current rep
* Add own custom exercises - needs to be owned by user
* Deleting of custom exercises - check if user owns

### Deferred

## Add as data
* Warmup sets
* Milfit sets
* Cross fit sets or Murph
* Isometric sets
* Punching with weights
* https://gmb.io/bodyweight-leg-exercises/
* https://gmb.io/core-strength/
* https://www.popularmechanics.com/science/health/a22730160/exercises-that-will-save-your-knees/
* https://www.lifehacker.com.au/2018/08/reduce-jet-lag-by-doing-this-airline-approved-workout-when-you-land/
* https://blog.myfitnesspal.com/hate-burpees-here-are-11-alternatives/
* https://blog.myfitnesspal.com/9-kettlebell-exercises-everyone/a
* https://www.menshealth.com/fitness/a22799174/crossfit-workouts-at-home/
* Overcoming gravity book

## Done

#### To be released

#### v34
* Screen block when saving /http requests...

#### v33

* Exercise list added to protected resources
* Option to not do exercise (from exercise list, temporarily for user) - config in ex ercise list and used in start circuit
* Fix the async email - not sending

#### v32

* Check owner being set on save of exercise set
* Ensure user cannot update built in sets
* Sorting on position for ExerciseSet
* Redirect to landing page on not logged in


#### v30, 31
* Fixes to startup/lookup data around sets 

#### v29
* Grails async on email sending - eg signup
* Saved exercise sets/favourites
* Adding canned exercise set starter

#### data only
* Cleanup live exercise data

#### v27

* Add own custom exercises - simple
* Deleting of custom exercises - simple

#### v26

* Randomized exercise assignments not being overridden with the manual one
* Select the exercise when changing so its more easily changed (dont need to backspace it)


#### v25

* Fix suit_Type domain/table form being duplicated values - commented out now
* stop the timer
* Not saving wildcards? - saving as suit
* Doing circuit move next buttons row to up top so it doesnt move each time - or fixed footer?
* Layout of doing circuit

#### v24
* Display logged in as username

####  v23
* Ensure only the users history can be seen!
* User signup - feedback with message.  
* User signup - Log them in right away
* Improve content on landing page

#### v22
* User signup - note needed to allow  accessing gmail accounts signin from externals (heroku): https://accounts.google.com/DisplayUnlockCaptcha

-- Rel v19 (fail on Bootstrap), v20, v21:

* Encrypt password - http://plugins.grails.org/plugin/dtanner/org.grails.plugins%3Ajasypt-encryption (deploy notes:https://stackoverflow.com/questions/14552303/opensslcipherciphererror-with-rails4-on-jruby)
* logout
* Add exercise: https://www.healthline.com/health/fitness-exercise/flutter-kicks
* Add exercise: https://gmb.io/crow-pose
* Fix some lookup data - PostgreSQL does not like spaces when querying
* Fixed start circuit auto-comp filter
* Fix reps meter 
* Fix accumulation of reps when saving a history item
* Images of the suits 

-- Earlier rel's
* Wildcards are set to 2 reps it seems?  Make them not for a suit - create a new suit for these
* Sort the summary boxes
* Feedback when you add a manual entry
* Timer
* Fix manual clearing of exercise
* Convert from dialogs to route/pages
* Show the total time taken at the end of each - maybe just a counter anyway?
* Upgrade Angular6: https://alligator.io/angular/angular-6/
* Add exercise description to ui
* Saved exercise sets/favourites - DB Change
* Add exercisehistory from a form  
* Dont allow duplicate exercises for the suits
* improve the lookup data 
* Add more exercies
* History with total counts
* Full set of exercises
* Totally random exercises, totally set ones + with anything in between
* Fix the doing circuit dialog
* List of all exercises
* Recheck wildcards

Angular simple "auth" Derived from http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial


# Useful things to remember

If yarn doesn't start (I couldnt see any messages with detail) then: 

```
cd client
gradle clean
find . -type d -name .bin -exec rm -rf {} \;  
gradle buildClient
```

https://medium.com/@wellsst/angular-with-grails-on-heroku-211e35177804

On Heroku: 
https://circuitshuffle.herokuapp.com/ 
https://git.heroku.com/circuitshuffle.git

http://guides.grails.org/grails-database-migration/guide/index.html

Combining the WAR with client/server: https://dotperson.blogspot.com.au/2017/09/grails-3-with-angular-4-combined-war.html#comment-form
Making it all work from that war: http://gangmax.me/blog/2017/02/09/expose-static-resources-in-grails/ 

Run it: `java -Dgrails.env=prod -jar ./server/build/libs/circuitshuffle-0.1.war`

## Packages

```
npm i shuffle.ts
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
