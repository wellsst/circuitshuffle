import {HistoricalCategory, Exercise, ExerciseType, SuitType} from './model'

const today: HistoricalCategory = {id: 1, name: "Today"}
const yesterday: HistoricalCategory = {id: 2, name: "Yesterday"}

export const CATEGORY_LIST: HistoricalCategory[ ] = [
    today,
    yesterday
]

/*const shoulders: ExerciseType = { id: 1, name: "Shoulders"}
const calves: ExerciseType = { id: 2, name: "Calves"}
const biceps: ExerciseType = { id: 3, name: "Biceps"}
const cardio: ExerciseType = { id: 4, name: "Cardio"}
const quads: ExerciseType = { id: 5, name: "Quads"}

export const EXERCISE_LIST: Exercise[] = [
    {id:1, name: "Push-ups", description: "pushups", exerciseTypes: [shoulders]},
    {id:2, name: "Pull-ups", description: "pullups", exerciseTypes: [shoulders, biceps]},
    {id:3, name: "Calf raises", description: "calfs", exerciseTypes: [calves]},
    {id:4, name: "Squats", description: "squats", exerciseTypes: [quads]},
    {id:5, name: "Deadlifts", description: "deads", exerciseTypes: [shoulders, quads]},
    {id:6, name: "Running", description: "run", exerciseTypes: [calves, quads]},
]*/

/*export const SUIT_TYPES: SuitType[] = [
    {id: 1, name: "Clubs", selectedExercise: EXERCISE_LIST[0]},
    {id: 2, name: "Spades", selectedExercise: EXERCISE_LIST[1]},
    {id: 3, name: "Hearts", selectedExercise: EXERCISE_LIST[2]},
    {id: 4, name: "Diamonds", selectedExercise: EXERCISE_LIST[3]},
    //{id: 5, name: "Wildcard", selectedExercise: EXERCISE_LIST[4]},
]*/
export const SUIT_TYPES: SuitType[] = [
    {id: 1, name: "Clubs", wilcardAllocated: false},
    {id: 2, name: "Spades", wilcardAllocated: false},
    {id: 3, name: "Hearts", wilcardAllocated: false},
    {id: 4, name: "Diamonds", wilcardAllocated: false},
    //{id: 5, name: "Wildcard", selectedExercise: EXERCISE_LIST[4]},
]

export class Message {
  id: number
  summary: string

}

export const SHORT_MSGS = [
    {id: 1, summary: "Go go go"},
    {id: 2, summary: "Push"},
    {id: 3, summary: "No slacking"},
    {id: 4, summary: "I'm watching you"},
    {id: 5, summary: "Make yourself proud"},
    {id: 6, summary: "Do the job right"},
    {id: 7, summary: "Harder!"},
    {id: 8, summary: "Pick it up"},
    {id: 9, summary: "Good form on this lot"},
    {id: 10, summary: "Get the job done right"},
    {summary: "A winner never quits...a quitter never wins"},
    {summary: "Pain is weakness leaving the body"},
    {summary: "It's all a mind game"},
    {summary: "Sweat is your fat crying"},
    {summary: "Failure is not fatal, but failure to change might be"},
    {summary: "You know you worked your muscles hard when you are still feeling it 2-3 days later"},
    {summary: "It is not age.  It is not diet.  It is the will to succeed."},
    {summary: "PAIN is temporary. Quitting lasts forever."},
    {summary: "Concentrate on your strengths instead of your weaknesses, on your powers instead of your problems."},
    {summary: "GET COMFORTABLE with being uncomfortable."},
    {summary: "BE STRONG — when you are weak."},
    {summary: "BE BRAVE — when you are scared."},
    {summary: "BE HUMBLE — when you are victorious."},
    {summary: "If it doesn't challenge you, it doesn't change you."},
    {summary: "Sweat now. Smile later!"},
    {summary: "Train like you are 2nd, but play like you are 1st..."},
    {summary: "Eat clean, train dirty"},
    {summary: "I do not workout to add days to my life, I workout to add life to my days."},
    {summary: "SUCK IT UP, then someday, you won't have to SUCK IT IN."},
    {summary: "In a week you will wish you had started today. So go for it."},
    {summary: "Feeling sore > Feeling sorry"},
    {summary: "It does not matter how many times you get knocked down, but how many times you get up."},
    {summary: "You're never a loser until you quit "},
    {summary: "The difference between a successful person is not a lack of strength, not a lack of knowledge, but rather a lack of will"},
    {summary: "You can feel sore tomorrow or you can feel sorry tomorrow."},
    {summary: "If you have everything under control, you're not moving fast enough. -Mario Andretti (race car driver)"},
    {summary: "We do not quit playing because we grow old, we grow old because we quit playing."},
    {summary: "Winners make goals, losers make excuses."},
    {summary: "Those who do not find time for exercise will have to find time for illness."},
    {summary: "Your body can do anything, it's just your brain you have to convince."},
    {summary: "The pain of discipline is far less than the pain of regret."},
    {summary: "Do you wanna see your biggest opponent? Look in the mirror."},
    {summary: "What fits your schedule better -- Exercising 1 hour a day or being fat (unhealthy) 24 hours a day?"},
    {summary: "[DO]n't qu[IT]"},
    {summary: "It's ok if you try and fail but it's not ok if you fail to try"},
    {summary: "There is no glory in practice, but without practice, there is no glory"},
    {summary: "We don't buy things with money.  We buy them with hours of our lives."},
    {summary: "Age is whatever you think it is. You are as old as you think you are. -Muhammad Ali"},
    {summary: "I do not run to add days to my life. I run to add life to my days."},
    {summary: "Sure the fight was fixed. I fixed it with a right hand. -George Foreman"},
    {summary: "A ship in a harbour is safe, but that is not what ships are for."},
    {summary: "It's not the size of the dog in the fight, it's the size of the fight in the dog. - Mark Twain"},
    {summary: "1.01 ^365 = 37.8.   0.99 ^365=0.03"},
    {summary: "Sports_Greats: STRENGTH doesn't come from what you can do. It comes from OVERCOMING the things you COULDN'T -Rikki Rogers"},
    {summary: "The hardest thing about exercise is to start doing it. Once you are doing exercise regularly, the hardest thing is to stop it. -Erin Gray"},
    {summary: "I run on the road long before I dance under the lights - Mo Ali"},
    {summary: "The secret to living well and longer is: eat half, walk double, laugh triple, and love without measure."},
    {summary: "If it’s important, do it every day, if it’s not, don’t do it at all."},
    {summary: "Perfect is the enemy of the good"},
    {summary: "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty. - Winston Churchill"},
    {summary: "He who is not everyday conquering some fear has not learned the secret of life. - Ralph Waldo Emerson"},
    {summary: "Hard work beats talent when talent fails to work hard"},
    {summary: "Slow is Smooth and Smooth is Fast"},
    {summary: "Everyone has a plan until they are punched in the face. - Mike Tyson"},
    {summary: "It is not the mountain we conquer but ourselves."},
    {summary: "No such thing as spare time, no such thing as free time, no such thing as down time. All you got is life time. Go. - Henry Rollins"},
    {summary: "Everyday do something that makes you uncomfortable - Dave Goggins"},
    {summary: "I like to sit back and enjoy the pain.  I earned it."},
    {summary: "I don't do shit for applauses.  I don't do shit for fanfare.  I do shit for me."},
    {summary: "I don't think about yesterday.  I think about today and getting better."},
    {summary: "It doesn't have to be fun.  It has to be effective."},
    {summary: "If it doesn't suck we don't do it."},
    {summary: "I don't like motherfuckin' freeloaders.  You better work hard for your shit or we aren't going to get along very well."},
    {summary: "Train for the unexpected."},
    {summary: "If you want to be pushed to your limits, train to your limits."},
    {summary: "I earned it.  Now I'm going to enjoy it."},
    {summary: "Everyday is a challenge otherwise it's not a regular day."},
    {summary: "Everyone is a potential threat."},
    {summary: "If you're gonna do 'em do 'em right."},
    {summary: "You can get through any workout because everything ends"},
    {summary: "Don't get too comfortable.  Ever!"},
    {summary: "You can always keep going."},
    {summary: "If you're hungry run faster, you'll be home quicker."},
    {summary: "Be ready for anything at any time."},
    {summary: "The tougher the conditions the more I like my odds."},
    {summary: "Fear is one of the best motivators.  Anger is the other."},
    {summary: "Know whats important to you and protect it at all costs."},
    {summary: "I don't celebrate victories but I learn from failures."},
    {summary: "I don't stop when I'm tired.  I stop when I'm done."},
    {summary: "The only easy day was yesterday."},
    {summary: "Attitude is a little thing that makes a big difference"},
    {summary: "Success consists of going form failure to failure without loss of enthusiasm"},
    {summary: "A pessimist sees difficult in every opportunity; an optimist sees opportunity in every difficulty"},
    {summary: "You will never reach your destination if you stop and throw stones at every dog that barks."},
    {summary: "Success is not final; failure is not fatal; it is the courage to continue that counts."},
    {summary: "Continuous effort...not strength or intelligence is the key to unlocking our potential."},
    {summary: "If you're going through hell...keep going. "}

]
