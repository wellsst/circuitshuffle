package circuitshuffle

class LookupData {

    static void create() {
        def etShoulder = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Deltoids", "Delts", "rounded muscles at the top of the shoulders")
        //def etCalves = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Calves", "Calves", "Lower leg")
        def etBiceps = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Biceps", "Biceps", "Upper arms - front")
        def etTriceps = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Triceps", "Triceps", "Upper arms - rear")
        def etCardio = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Cardio", "Cardio", "Heart, lungs and circulation")
        def etQuads = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Quadriceps", "Quads", "muscles at the front of the thigh")
        def etPecs = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Pectorals", "Pecs", "Chest")
        def etTraps = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Trapezius", "Traps", "muscles extending from the neck to the middle of the back")
        def etCore = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Core stability", "Core", "General core stability")
        def etBal = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Balance", "Balance", "Can you Balance!")

        def etLats = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Latissimus dorsi", "Lats", "muscles extending from under the armpits across the back to the spine")
        def etSpinal = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Spinal erectors", "Back", "muscles extending down the back to just above the waist")
        def etObliqs = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Obliques", "Obliques", "muscles on the side of the torso, next to the abdominals")
        def etIntercosts = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Intercostals", "Intercostals", "diagonal muscles across the ribs, just above the abdominals")
        def etSerratus = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Serratus", "Serratus", "diagonal muscles slightly above the intercostals, near the pectorals")
        def etAbs = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Abdominals", "Abs", "muscles extending the length of the abdomen")
        def etFfs = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Forearm flexors", "Forearm flexors", "muscles of the inside of the forearm")
        def etFes = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Forearm extensors", "Forearm extensors", "muscles of the outside of the forearm")
        def etHams = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Hamstrings", "Hammies", "muscles that extend from the back of the thigh to the lower leg")
        def etGas = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Gastrocnemius", "Upper Calves", "upper calf muscles")
        def etSols = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Soleus", "traps", "lower calf muscles")
        def etGluts = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Gluteus maximus", "glutes", "muscles of the buttocks")
        def etHipFlexs = ExerciseType.findOrSaveByTargetAreaAndShortNameAndDescription("Hip Flexors", "hips", "Front of hips")

        // TODO: create and assign a default exercise to each ExerciseType

        /*PUSHING*/
        def pushups
        try {
            System.err.println("pushups pre:" + pushups)
             pushups = Exercise.findOrSaveWhere(name: "Push-ups", description: "Pushups standard - hands under shoulders").
                    addToExerciseTypes(etShoulder).addToExerciseTypes(etPecs).addToExerciseTypes(etSpinal).
                    addToExerciseTypes(etTriceps).addToExerciseTypes(etAbs)
            System.err.println("pushups:" + pushups.validate())
            System.err.println("pushups:" + pushups.errors.toString())
        } catch (all) {
            System.err.println all.message
            all.printStackTrace()
        }
        
        Exercise.findOrSaveWhere(name: "Push-ups wide", description: "Pushups wide - hands further apart").
                addToExerciseTypes(etShoulder).addToExerciseTypes(etPecs).addToExerciseTypes(etSpinal).
                addToExerciseTypes(etTriceps).addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Push-ups diamond (close)", description: "Pushups diamond - hands together in a diamond shape").
                addToExerciseTypes(etShoulder).addToExerciseTypes(etPecs).addToExerciseTypes(etSpinal).
                addToExerciseTypes(etTriceps).addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Push-ups - variations", description: "Pushups variety could be a set of wide, diamond, staggered, archer etc").
                addToExerciseTypes(etShoulder).addToExerciseTypes(etPecs).addToExerciseTypes(etSpinal).
                addToExerciseTypes(etTriceps).addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Push-ups - dive bombers", description: "Swoop your upper body down in an arc so that the bottom position of a Classic Push Up, then sweep your head and shoulders up as high as possible, until your back is fully arched").
                addToExerciseTypes(etShoulder).addToExerciseTypes(etPecs).addToExerciseTypes(etSpinal).
                addToExerciseTypes(etTriceps).addToExerciseTypes(etAbs)

        Exercise pushupRow = Exercise.findOrSaveWhere(name: "Push-ups - with dumbell row", description: "Standard pushup on light dumbells with a row (raising the bell to your chest)").
                addToExerciseTypes(etShoulder).addToExerciseTypes(etPecs).addToExerciseTypes(etSpinal).
                addToExerciseTypes(etTriceps).addToExerciseTypes(etAbs).addToExerciseTypes(etLats)

        Exercise.findOrSaveWhere(name: "Dips", description: "Using parallel bars or a chair etc - dips down").
                addToExerciseTypes(etShoulder).addToExerciseTypes(etPecs).
                addToExerciseTypes(etTriceps).addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Dips with extension", description: "Parallel bars - dips down then to L-sit").
                addToExerciseTypes(etShoulder).addToExerciseTypes(etPecs).
                addToExerciseTypes(etTriceps).addToExerciseTypes(etAbs)

        /* PULLING */
        def pullUps = Exercise.findOrSaveWhere(name: "Pull-ups", description: "Pull-ups - fingers facing you").addToExerciseTypes(etBiceps).
                addToExerciseTypes(etAbs)

        def pullUpsCommando = Exercise.findOrSaveWhere(name: "Pull-ups - Commando", description: "Pull-ups - alternating grip").addToExerciseTypes(etBiceps).
                addToExerciseTypes(etAbs)

        def chinUps = Exercise.findOrSaveWhere(name: "Chin-ups", description: "Chin-ups - fingers face away").addToExerciseTypes(etBiceps).
                addToExerciseTypes(etAbs).addToExerciseTypes(etLats)

        Exercise.findOrSaveWhere(name: "Wipers", description: "Chin-ups hold and legs extended swing 3 to 9 o'clock").addToExerciseTypes(etBiceps).
                addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Toes to bar", description: "Chin-ups hold and legs extended, controlled legs up to bar").addToExerciseTypes(etBiceps).
                addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Muscle-ups", description: "Pull-ups with a dips above bar/rings (jump if you have to!)").addToExerciseTypes(etBiceps).
                addToExerciseTypes(etAbs)

        Exercise exCurls = Exercise.findOrSaveWhere(name: "Curls", description: "Dumbell etc of your choosing and bust out some reps.  Even do this as isometric, using your other arm as resistance").addToExerciseTypes(etBiceps).
                addToExerciseTypes(etAbs)

        /* General */

        Exercise.findOrSaveWhere(name: "Mountain climbers", description: "Chin-ups hold and legs extended, controlled legs up to bar").addToExerciseTypes(etTriceps).
                addToExerciseTypes(etGluts).addToExerciseTypes(etAbs)

        try {
            Exercise.findOrSaveWhere(name: "Burpees", description: "Push up with a standing jump").addToExerciseTypes(etTriceps).
                    addToExerciseTypes(etGluts).addToExerciseTypes(etAbs).addToExerciseTypes(etQuads).addToExerciseTypes(etGluts)
        } catch (all) {
        }

        Exercise.findOrSaveWhere(name: "Arm extensions", description: "(10 secs per rep) Arms extended to the side or front - roatate with small circles, pump up and down or in fron to milk the cow!").
                addToExerciseTypes(etShoulder)

        Exercise.findOrSaveWhere(name: "Overhead Press", description: "feet shoulder-width apart, hold any heavy item, such as a weighted backpack or loaded box, to your chest").
                addToExerciseTypes(etShoulder).addToExerciseTypes(etTraps).addToExerciseTypes(etTriceps)

        Exercise.findOrSaveWhere(name: "Simple balance (10 secs per rep)", description: "Stand on one leg. Close your eyes").
                addToExerciseTypes(etQuads).addToExerciseTypes(etBal).addToExerciseTypes(etSols)

        Exercise.findOrSaveWhere(name: "Supermans", description: "(3-5 secs hold per rep) Lie on your front with your arms straight in front of you. Keeping your legs and arms straight, lift them all off the ground as high as possible").
                addToExerciseTypes(etQuads).addToExerciseTypes(etBal).addToExerciseTypes(etSols)

        Exercise.findOrSaveWhere(name: "Shadow boxing", description: "(10 secs per rep) Great as a warmup but bust out some boxing moves, remember to bounce around, duck, weave as well as throw punches, you can do low kicks for all I care!").
                addToExerciseTypes(etCardio).addToExerciseTypes(etShoulder).addToExerciseTypes(etSols).
                addToExerciseTypes(etGas).addToExerciseTypes(etTriceps).addToExerciseTypes(etCore).addToExerciseTypes(etSpinal)

        /* LEGS */

        Exercise.findOrSaveWhere(name: "Mule Kick", description: "Slowly kick your right leg straight back and up as high as possible").
                addToExerciseTypes(etHams).addToExerciseTypes(etGluts).addToExerciseTypes(etSpinal)

        Exercise.findOrSaveWhere(name: "Standing Side Leg Lift",
                description: "feet hip distance apart, holding onto a chair or desk lightly for balance. In a slow and controlled manner, lift your right leg out to the side").
                addToExerciseTypes(etHipFlexs).addToExerciseTypes(etGluts).addToExerciseTypes(etSpinal)

        //, exerciseTypes: [shoulders, biceps]},
        def calfRaises = Exercise.findOrSaveWhere(name: "Calf raises", description: "calfs").
                addToExerciseTypes(etGas).addToExerciseTypes(etSols)
        // exerciseTypes: [calves]},
        def squats = Exercise.findOrSaveWhere(name: "Squats", description: "Good old Squats - go full down and back up in a controlled steady way").
                addToExerciseTypes(etQuads).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "Split Squats", description: "Similar to a regular Lunge but for one very effective difference, you other leg is supporting as much as is required to the working leg.  This is a good progression on the way to one legged squats").
                addToExerciseTypes(etQuads).addToExerciseTypes(etGluts).addToExerciseTypes(etHams).addToExerciseTypes(etSpinal)

        Exercise.findOrSaveWhere(name: "One legged or pistol Squats", description: "Lift your left leg up and stand on your right leg, holding onto something for assistance (if required). Slowly lower your body, bending at your\n" +
                "waist and right knee, until your right thigh is forward past your knees").
                addToExerciseTypes(etQuads).addToExerciseTypes(etGluts).addToExerciseTypes(etHams).addToExerciseTypes(etSpinal)

        Exercise.findOrSaveWhere(name: "Sumo Squats (wide)", description: "Take a wide stance with your toes pointed out. While keeping your back straight, swing your arms out in front of you and drop your hips until your thighs are parallel to the ground.  Try it on your toes!").
                addToExerciseTypes(etQuads)
        Exercise.findOrSaveWhere(name: "Wall Squat hold (10 secs per rep)", description: "Stand up with your back against a wall or yoga ball, squat and hold. your knees should be directly above your feet and be bent at 90 degrees. Keeping your butt and back against the wall").
                addToExerciseTypes(etQuads)

        Exercise exLunges = Exercise.findOrSaveWhere(name: "Lunges", description: "Stand with your feet together, toes pointed straight ahead. Take a big step forward with your left foot, bending your knees and lowering your hips until your trailing right knee almost touches the ground. Both knees\n" +
                "should be bent to 90 degrees at this point").
                addToExerciseTypes(etQuads).addToExerciseTypes(etGluts).addToExerciseTypes(etHipFlexs)

        Exercise.findOrSaveWhere(name: "Walking lunge", description: "Walking lunge with handheld weights").
                addToExerciseTypes(etQuads).addToExerciseTypes(etGluts).addToExerciseTypes(etHipFlexs)

        Exercise.findOrSaveWhere(name: "Side lunge", description: "Take a wide step to the side with your left foot, your toes pointing slightly outward. As your left foot comes in contact with the ground, shift your weight onto it.").
                addToExerciseTypes(etQuads).addToExerciseTypes(etGluts).addToExerciseTypes(etHipFlexs)

        Exercise.findOrSaveWhere(name: "One-Legged Romanian Dead Lifts", description: "Keep your back as straight as possible and reach down with your right arm un- til you have touched the ground in front of your left foot, raising your right leg straight behind you as you lower your upper body. Your knees should remain straight throughout the motion").
                addToExerciseTypes(etHams).addToExerciseTypes(etSpinal).addToExerciseTypes(etBal)

        //, exerciseTypes: [quads]},
        Exercise.findOrSaveWhere(name: "Deadlifts", description: "With feet flat beneath bar, squat down and grasp bar with shoulder width or slightly wider overhand or mixed grip." +
                "Execution: " +
                "Lift bar by extending hips and knees to full extension. Pull shoulders back at top of lift if rounded.").
                addToExerciseTypes(etGluts).addToExerciseTypes(etSpinal).addToExerciseTypes(etCore).
                addToExerciseTypes(etTraps).addToExerciseTypes(etShoulder)

        def crow = Exercise.findOrSaveWhere(name: "Crow pose").
                addToExerciseTypes(etSpinal).addToExerciseTypes(etCore).
                addToExerciseTypes(etTraps).addToExerciseTypes(etShoulder).
                addToExerciseTypes(etFes).addToExerciseTypes(etFfs)
        crow.description= """https://gmb.io/crow-pose/

Sit down on your knees.
Make a diamond with your hands.
Move your hands out, until they are shoulder width apart, maintaining the diamond shape.
Bend your elbows.
Flare your knees out to put them on your arms, just above the elbows.
Keep strong tension at your elbows for a stable base.
Lean your head and shoulders forward over your hands to find that crucial balance point.
Try rocking forward and back to find where that point is for you.
"""

        /* JUMPS */
        Exercise highKnees = Exercise.findOrSaveWhere(name: "Running", description: "Run/high knees on the spot for at least 20 secs per rep").
                addToExerciseTypes(etSols).addToExerciseTypes(etGas).
                addToExerciseTypes(etCardio).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "Skipping (10 secs per rep)", description: "Grab a rope and do any combo you like").
                addToExerciseTypes(etSols).addToExerciseTypes(etGas).
                addToExerciseTypes(etCardio).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "Star jumps", description: "Also known as Jumping-Jacks").
                addToExerciseTypes(etSols).addToExerciseTypes(etGas).addToExerciseTypes(etShoulder).
                addToExerciseTypes(etCardio).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "Side jumps", description: "Simply jump back and forth over an object sideways").
                addToExerciseTypes(etSols).addToExerciseTypes(etGas).addToExerciseTypes(etShoulder).
                addToExerciseTypes(etCardio).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "Box jumps", description: "Find any object to jump on, such as stairs, a solid box, table, or other platform. Using a shoulder-width stance, go into a quarter to half squat position and explode forcefully onto the object").
                addToExerciseTypes(etSols).addToExerciseTypes(etGas).addToExerciseTypes(etShoulder).
                addToExerciseTypes(etCardio).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "Overhead Squats / thrusts", description: "Perform a squat while holding an object, such as a weighted backpack, overhead. The top of your thighs should be parallel to the ground in the bottom position.\n" +
                "Your feet should be shoulder-width apart with your toes " +
                "pointing outward no more than thirty degrees. Your heels " +
                "should remain on the ground, and your knees should point in the same direction as your index toe").
                addToExerciseTypes(etSols).addToExerciseTypes(etGas).addToExerciseTypes(etShoulder).
                addToExerciseTypes(etCardio).addToExerciseTypes(etGluts).addToExerciseTypes(etHipFlexs).addToExerciseTypes(etSpinal)

        Exercise.findOrSaveWhere(name: "Toyotas", description: "Squat down a little and exlode into the air in joy, just like the Toyota ads did").
                addToExerciseTypes(etSols).addToExerciseTypes(etGas).addToExerciseTypes(etShoulder).
                addToExerciseTypes(etCardio).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "High knees", description: "Pump a knee high up while the leg that is down skips up as well, propel yourself high").
                addToExerciseTypes(etSols).addToExerciseTypes(etGas).addToExerciseTypes(etShoulder).
                addToExerciseTypes(etCardio).addToExerciseTypes(etGluts)

        /* CORE */
        Exercise.findOrSaveWhere(name: "Standing Knee Raises", description: "Stand upright, feet slightly apart, then raise your left knee as high as possible. Hold it up for three seconds").
                addToExerciseTypes(etCore).addToExerciseTypes(etBal).
                addToExerciseTypes(etAbs).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "Scissors", description: """Lying on your left side with your left hand propping your head up, 
raise your right leg as high as possible, keeping it straight. Hold for three seconds. Return same on the other side.""").
                addToExerciseTypes(etCore).addToExerciseTypes(etBal).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs).addToExerciseTypes(etGluts)

        Exercise.findOrSaveWhere(name: "Russian Twists", description: """Sit upright on the ground with your arms crossed and knees bent. Lift your feet
off the ground. Twist so that your left elbow touches your right knee, then twist the other way so that your right elbow touches your left knee""").
                addToExerciseTypes(etCore).addToExerciseTypes(etBal).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs).addToExerciseTypes(etIntercosts).addToExerciseTypes(etObliqs)

        Exercise.findOrSaveWhere(name: "Crunches", description: """Lie on your back, hands under your head, 
bend your knees so that your thighs are perpendicular to the ground, and cross your ankles in
 the air.  Alternate is to touch left elbow to right knee and vice-versa""").
                addToExerciseTypes(etCore).
                addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "L-sit", description: "Hold 5 secs per rep if possible.  Using rings or a bar etcpush down with your hands legs locked out in front and hold").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).addToExerciseTypes(etTriceps).
                addToExerciseTypes(etAbs).addToExerciseTypes(etQuads)

        Exercise.findOrSaveWhere(name: "L-sit to planche holds", description: "Requires parallel bars! Move to L-sit and hold, then swing back to a planche hold position, lock it out and control as long as possible").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).addToExerciseTypes(etTriceps).
                addToExerciseTypes(etAbs).addToExerciseTypes(etQuads)

        Exercise.findOrSaveWhere(name: "Flutter Kicks", description: """(1 rep is left and right kick) Lie down on your back with your hands under your butt and your head up. Keeping your legs straight and together, lift your feet into the air, six-inches from the ground.""").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)

        def flCC = Exercise.findOrCreateWhere(name: "Flutter Kicks - Criss-cross").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)
        flCC.description = """Lie down on your back, facing up.
Place both hands underneath your buttocks.
Keep your lower back on the ground as you lift both legs up, slightly past hip height, keeping your core engaged the entire time.
Criss-cross your legs over one another, switching off which leg is on top, and keeping your legs off the ground the entire time.
For more of a challenge, lift your head and neck off the floor.
The wider you bring out your legs with each cross, the more you’ll feel the exercise in your ab muscles.
"""
        flCC.save()

        def flProne = Exercise.findOrCreateWhere(name: "Flutter Kicks - Prone").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)
        flProne.description = """Lie on your stomach and place your elbows out wide and your hands together in front of your face. Rest your chin or forehead on your hands.
Engage your core, and lift both legs off the ground to hip height or slightly past hip height, if possible.
Lift one leg and then the other in a flutter motion, as if you were swimming.
"""
        flProne.save()

        def kneesToElbows = Exercise.findOrCreateWhere(name: "Knees to Elbows").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)
        kneesToElbows.description = """Lie on your back arms stretched above your head and legs straight out.  
Crunch up to bring your knees to meet your elbows just above your centre.  Use small weights for added intensity"""
        kneesToElbows.save()

        def raisedLegHold = Exercise.findOrCreateWhere(name: "Raised Leg Hold").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)
        raisedLegHold.description = """Lie on your back arms by your side for support and legs straight out.  
Raise your legs to about 45 degree angle and hold for 10 secs per rep"""
        raisedLegHold.save()

        def sittingTwists = Exercise.findOrCreateWhere(name: "Sitting Twists").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)
        sittingTwists.description = """Sit on the ground with your arms straigh out, knees bent and prefereably with a small amount of weight
Twist gently from left (at 90 degrees) and back to the right - thats 1 rep"""
        sittingTwists.save()

        Exercise.findOrSaveWhere(name: "Bear crawls", description: "(reps x2 of asked for, so for x10 you do 20 (left and right crawl is 1 rep!))Down on all fours, legs and arms straight or bent whatever feels right to you.  Left arm and right leg forward, then vica versa").
                addToExerciseTypes(etCore).addToExerciseTypes(etShoulder).addToExerciseTypes(etQuads).
                addToExerciseTypes(etAbs).addToExerciseTypes(etTriceps).addToExerciseTypes(etSpinal)

        Exercise.findOrSaveWhere(name: "Hello Darlings", description: """Lie down on your back with your hands under your butt and your head your feet into the air, about six inches above the ground. Open your legs as wide as possible, then close them""").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "V-Ups", description: """Lie down on your back with your hands by your side, with only your butt on the ground.  Bring your chest and your knees up toward each other, almost until they touch. Then lean your chest back and straighten your legs out so that both your shoul- ders and feet are each just a few inches off the ground.""").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Bicycles", description: """Lie down on your back with your legs straight and you hands under your head. Hold one leg up, fully extended, about six inches off the ground. Pull
the knee of your other leg in toward your chest, “bicycling” and touch each knee with the opposite elbow as it comes in toward your chest. Be sure to extend each leg fully before bringing it back in to your chest.""").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etIntercosts).addToExerciseTypes(etObliqs).addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Jack Knives", description: """Lie flat on your back with your feet 6 inches off the ground and your arms extended straight up over your head. Keeping only your butt on the ground, simultaneously bring your chest up and your straight legs up until your hands touch your feet""").
                addToExerciseTypes(etCore).addToExerciseTypes(etHipFlexs).
                addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Iron Crosses", description: """Lie on your back with your legs pointing straight up into the air, so that they are at a 90-degree angle with your upper body. ground, lower your legs to the right, so that your body is still in an L shape""").
                addToExerciseTypes(etCore).
                addToExerciseTypes(etIntercosts).addToExerciseTypes(etObliqs).addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Cross over holds", description: """(Hold 5 secs left and 5 secs right for 1 rep) Start in the Classic Push Up position, then lift one leg straight up behind you, and extend your opposite arm straight out in front of you. Keep your head up and make yourself as long as possible. Hold as long as you can before switching to the other arm and other leg""").
                addToExerciseTypes(etCore).addToExerciseTypes(etPecs).addToExerciseTypes(etTriceps).addToExerciseTypes(etShoulder).
                addToExerciseTypes(etIntercosts).addToExerciseTypes(etObliqs).addToExerciseTypes(etAbs)

        Exercise.findOrSaveWhere(name: "Planks", description: """For 10 secs each rep - Get on your elbows and balls of your feet, hold straight and tight like a plank""").
                addToExerciseTypes(etCore).addToExerciseTypes(etAbs)

        /**
         * Sets! First just clear out all the old ones onwed by nobody (eg the admin)
         */
        ExerciseSet.where {
            owner == null
        }.deleteAll()

        def repMinuteHighKnees = new ExerciseSetRep(position: 0, nrReps: 3, exercise: highKnees).save()
        def rep20Lunges = new ExerciseSetRep(position: 1, nrReps: 20, exercise: exLunges).save()
        def rep20PushupRows = new ExerciseSetRep(position: 2, nrReps: 20, exercise: pushupRow).save()
        def rep20Curls = new ExerciseSetRep(position: 3, nrReps: 20, exercise: exCurls).save()
        def rep20kneesToElbows = new ExerciseSetRep(position: 4, nrReps: 20, exercise: kneesToElbows).save()
        def rep20raisedLegHold = new ExerciseSetRep(position: 5, nrReps: 20, exercise: raisedLegHold).save()
        def rep20sittingTwists = new ExerciseSetRep(position: 6, nrReps: 20, exercise: sittingTwists).save()

        def setMilFitRecruit = ExerciseSet.findOrCreateWhere(name: "MilFit - Recruit", owner: null).
        addToExerciseReps(repMinuteHighKnees).addToExerciseReps(rep20Lunges).addToExerciseReps(rep20PushupRows).
        addToExerciseReps(rep20Curls).addToExerciseReps(rep20kneesToElbows).addToExerciseReps(rep20raisedLegHold).
        addToExerciseReps(rep20sittingTwists)
        setMilFitRecruit.description = """Borrowed from darebee.com - Military Fit series - Recruit workout - a simple cicuit
Start each set with a minute of high knees"""
        setMilFitRecruit.save()

        def setMilFitEqualizer = ExerciseSet.findOrCreateWhere(name: "MilFit - Equalizer", owner: null).
        addToExerciseReps(repMinuteHighKnees).addToExerciseReps(rep20Lunges).addToExerciseReps(rep20PushupRows).
        addToExerciseReps(rep20Curls).addToExerciseReps(rep20kneesToElbows).addToExerciseReps(rep20raisedLegHold).
        addToExerciseReps(rep20sittingTwists)
        setMilFitEqualizer.description = """Borrowed from darebee.com - Military Fit series - Equalizer workout."""
        setMilFitEqualizer.save()



        /*Exercise.findOrSaveWhereHistory(completedOn: new Date() - 1, reps: 10, exercise: pullUps).save()
        Exercise.findOrSaveWhereHistory(completedOn: new Date() - 2, reps: 5, exercise: calfRaises).save()*/

        /*new SuitType(name: "Clubs", selectedExercise: pullUps).save()
        new SuitType(name: "Spades", selectedExercise: calfRaises).save()
        new SuitType(name: "Hearts", selectedExercise: pushups).save()
        new SuitType(name: "Diamonds", selectedExercise: squats).save()*/
    }
}
