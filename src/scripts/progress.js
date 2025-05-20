// This script defines progress(), which forwards the game by one day,
// and determines what happens during that day. This function will be divided into tasks.
// This version (0.3.0) will perform 9 tasks for each iteration, and will be labelled as such.
// Future versions may perform more and more tasks per iteration.
// Not all tasks may be performed in an iteration.

import dates from "./dates.js";
import education from "./education.js";
import misc from "./misc.js";

export default function progress() {
    if (window.progressing) try {
        // Task 1: Upon starting the game, player's life begins, log birth into diary.
        // Only performed during first day of player's life.
        if (window.life.dsb === 0) {
            const diaryDate = dates.convert_dict_date(window.life.date);
            const diaryText = " - I have been brought into this world. <br>";
            window.life.diary = diaryDate + diaryText;
        }

        // Task 2: Advances time by one day
        window.life.date = dates.add(window.life.date, 1);

        // Task 3: Player gets older by one day. If the month and day of the current day
        // and the month and day of the character's birthday matches,
        // the age goes up by 1. Else, the days goes up by 1.
        if (dates.code_mmdd(window.life.date) === dates.code_mmdd(window.life.birthday)) {
            window.life.age.years++;
            window.life.age.days = 0;
        } else {
            window.life.age.days++;
        }
        window.life.dsb++;

        // Task 4: Education system
        education.milestones();
        education.progress();

        // Task 5: Determines whether the player will die naturally today. If so, end the game.
        // Chances will get higher and higher based on the DSB of player.
        const deathX = Math.random();
        if (Math.pow(10, window.life.dsb * 0.0001) >= 10000000 * deathX) {
            window.progressing = false;
            window.life.status = 2;
            console.log(
                `Dead at ${window.life.age.years} years ${window.life.age.days} days ` +
                `due to a death_x of ${deathX.toString()}`
            );
            misc.diaryAdd(
                `I died due to natural causes. I was aged ${window.life.age.years} years and ` +
                `${window.life.age.days} days when I died.`
            );
            misc.playAudio("death");
            misc.display("death_overlay", "block");
            $("#death_died").html(
                `${window.life.name.first} ${window.life.name.last} has died on ` +
                `${dates.convert_dict_date(window.life.date)} due to natural causes.`
            );
            switch (window.life.gender) {
                case "m":
                    $("#death_age").html("He was at an age of " + window.life.age.years +
                    " years " + window.life.age.days + " days.");
                    break;
                case "f":
                    $("#death_age").html("She was at an age of " + window.life.age.years +
                    " years " + window.life.age.days + " days.");
                    break;
            }
        }

        // Task 6: Updates information throughout the HTML
        $("#main_control_currentDate").html(dates.convert_dict_date(window.life.date));
        $("#main_info_age").html(
            "Age: " + window.life.age.years + " years " + window.life.age.days + " days"
        );
        $("#main_info_balance").html(
            "Balance: " +
            window.life.balance.toLocaleString("en-AU", { style: "currency", currency: "AUD" })
        );
        $("#main_info_netWorth").html(
            "Net Worth: " +
            window.life.netWorth.toLocaleString("en-AU", { style: "currency", currency: "AUD" })
        );
        $("#main_diary_p").html(window.life.diary);

        // Task 7: Wait a period of time before advancing to the next day.
        misc.wait(1000 * Math.pow(10, -0.03 * $("#main_control_speed").val()) - 1);
    } catch (error) {
        console.error(`On ${dates.convert_dict_date(window.life.date)}, ${error.stack}`);
        window.progressing = false;
    }
}
