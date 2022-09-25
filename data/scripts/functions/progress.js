//This script defines progress(), which forwards the game by one day, and determines what happens during that day. This function will be divided into tasks. This version (0.3.0) will perform 9 tasks for each iteration, and will be labelled as such. Future versions may perform more and more tasks per iteration. Not all tasks may be performed in an iteration.
//This script is used in main.html.

function progress() {
    if (breakfn == 0) {
        //Task 1: Upon starting the game, player's life begins, log birth into diary. Only performed during first day of player's life.
        if (lifeInfo.dsb == 0) {
            lifeInfo.diary = convert_dict_date(lifeInfo.date) + " - I have been brought into this world. <br>";
        }

        //Task 2: Advances time by one day
        lifeInfo.date = date_add(lifeInfo.date, 1);

        //Task 3: Player gets older by one day. If the month and day of the current day and the month and day of the character's birthday matches, the age goes up by 1. Else, the days goes up by 1.
        if (code_mmdd(lifeInfo.date) == code_mmdd(lifeInfo.birthday)) {
            lifeInfo.age.years++;
            lifeInfo.age.days = 0;
        } else {
            lifeInfo.age.days++;
        }
        lifeInfo.dsb++;

        //Task 4: Education system
        education_milestones();
        education_progress();

        //Task 5: Determines whether the player will die naturally today. If so, end the game. Chances will get higher and higher based on the DSB of player.
        let death_x = Math.random();
        if (Math.pow(10, lifeInfo.dsb * 0.0001) >= 10000000 * death_x) {
            breakfn = 2;
            lifeInfo.status = 2;
            console.log(`Dead at ${lifeInfo.age.years} years ${lifeInfo.age.days} days due to a death_x of ${death_x.toString()}`);
            diaryAdd(`I died due to natural causes. I was aged ${lifeInfo.age.years} years and ${lifeInfo.age.days} days when I died.`);
            playAudio("death");
            displayType("death_overlay", "block");
            $("#death_died").html(
                `${lifeInfo.name.first} ${lifeInfo.name.last} has died on ${convert_dict_date(lifeInfo.date)} due to natural causes.`
            );
            switch (lifeInfo.gender) {
                case "m":
                    $("#death_age").html("He was at an age of " + lifeInfo.age.years + " years " + lifeInfo.age.days + " days.");
                    break;
                case "f":
                    $("#death_age").html("She was at an age of " + lifeInfo.age.years + " years " + lifeInfo.age.days + " days.");
                    break;
            }
        }

        //Task 6: Updates information throughout the HTML
        $("#main_control_currentDate").html(convert_dict_date(lifeInfo.date));
        $("#main_info_age").html("Age: " + lifeInfo.age.years + " years " + lifeInfo.age.days + " days");
        $("#main_info_balance").html("Balance: " + lifeInfo.balance.toLocaleString("en-AU", {style: "currency", currency: "AUD"}));
        $("#main_info_netWorth").html("Net Worth: " + lifeInfo.netWorth.toLocaleString("en-AU", {style: "currency", currency: "AUD"}));
        $("#main_diary_p").html(lifeInfo.diary);

        //Task 7: Wait a period of time before advancing to the next day.
        wait(1000 * Math.pow(10, -0.03 * $("#main_control_speed").val()) - 1);
    }
}
