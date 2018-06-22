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

## Future features

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
* Goals and how much are met - A user setting to save to DB
* Partner/group workouts?
* User signup - WIP
* Better auth maybe: 
    * http://mherman.org/blog/2018/04/17/authentication-in-angular-with-ngrx/#.WuESstNuZQM
    * http://www.devglan.com/spring-security/angular-jwt-authentication

## Small changes on the board

* Warmups/cooldowns -  Add perhaps as just a suggestion
* Saved exercise sets/favourites - UI Change
* Images of the suits


## Add as exercises

* https://www.healthline.com/health/fitness-exercise/flutter-kicks
* https://gmb.io/crow-pose


## Done

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
