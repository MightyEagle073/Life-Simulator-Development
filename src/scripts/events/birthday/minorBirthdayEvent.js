import Life from "../../classes/Life.js";
import misc from "../../functions/misc.js";
import { DiaryLogging, GameSpeed } from "../../enums.js";

/**
 * Celebrate the player's minor birthday.
 * 100% chance if player can start school.
 * Key event.
 * @param {*} life - Required life input
 */
export function minorBirthdayEvent(/** @type {Life} */life) {
    // Determine suffix
    let suffix = "th";
    if (life.age.years % 10 === 1 && life.age.years % 100 !== 11) suffix = "st";
    if (life.age.years % 10 === 2 && life.age.years % 100 !== 12) suffix = "nd";
    if (life.age.years % 10 === 3 && life.age.years % 100 !== 13) suffix = "rd";

    // Diary String
    const diaryString = `${life.date.format("dd/mm/yyyy")} - ` +
    `I celebrated my ${life.age.years}${suffix} birthday today.`;
    const log = (misc.getData().settings.diaryLogging > DiaryLogging.MEDIUM);
    if (!window.life || log) life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) return;
    else if (misc.getData().settings.gameSpeed > GameSpeed.MEDIUM) return;
    window.progressing = false;
    $("#notification_h2").html(`Happy ${life.age.years}${suffix} Birthday!`);
    $("#notification_p_1").html("Hope you have an amazing day today!");
    $("#notification_image").attr("src", "assets/png/notification_birthday_minor.png");
    misc.display("notification_h1", "none");
    misc.display("notification_h2", "block");
    misc.display("notification_h3", "none");
    misc.display("notification_p_1", "block");
    misc.display("notification_p_2", "none");
    $("#notification_overlay").css("display", "block");
}
