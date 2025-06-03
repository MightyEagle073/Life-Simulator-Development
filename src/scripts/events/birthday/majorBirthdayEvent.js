import Life from "../../classes/Life.js";
import misc from "../../functions/misc.js";

/**
 * Celebrate the player's minor birthday.
 * 100% chance if player can start school.
 * Important event.
 * @param {*} life - Required life input
 */
export function majorBirthdayEvent(/** @type {Life} */life) {
    const messages = {
        13: "Welcome to the teenage years — a time for new adventures, \
        friendships, and discovering who you are. Enjoy every moment!",
        18: "You’re officially an adult now. The world is yours to explore. Make it count!",
        25: "You’re a quarter of a century old — wiser, bolder, and more determined than ever. \
        Cheers to all the possibilities ahead!",
        40: "Cheers to 40 years! You’ve come so far, learned so much, and there’s \
        still plenty more adventure to come. Enjoy every minute!",
        50: "Half a century of experiences, memories, and achievements. Here’s \
        to embracing the next chapter with pride!",
        60: "Congratulations on turning 60! A diamond decade filled with wisdom, \
        laughter, and the joy of family and friends. Keep shining bright!",
        70: "Seven decades of living life to the fullest. Celebrate the lessons, \
        the love, and the journey that’s still unfolding.",
        80: "What an incredible milestone. A lifetime of stories, lessons, and \
        memories — may your days be filled with joy and laughter.",
        90: "As an nonagenarian, you’re a true testament to resilience, strength, \
        and grace. Keep inspiring everyone around you!",
        100: "A century of experiences and wisdom — you’ve seen the world change \
        in amazing ways. Celebrate this incredible legacy!",
        110: "A supercentenarian with a life story that’s simply legendary. \
        Here’s to the marvel of your journey!",
    };

    // Determine suffix
    let suffix = "th";
    if (life.age.years % 10 === 1 && life.age.years % 100 !== 11) suffix = "st";
    if (life.age.years % 10 === 2 && life.age.years % 100 !== 12) suffix = "nd";
    if (life.age.years % 10 === 3 && life.age.years % 100 !== 13) suffix = "rd";

    // Add to diary
    const diaryString = `${life.date.format("dd/mm/yyyy")} - ` +
    `I celebrated my ${life.age.years}${suffix} birthday today!`;
    life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) return;
    window.progressing = false;
    $("#notification_h2").html(`Happy ${life.age.years}${suffix} Birthday!`);
    $("#notification_p_1").html(messages[life.age.years]);
    $("#notification_image").attr("src", "assets/png/notification_birthday_major.png");
    misc.display("notification_h1", "none");
    misc.display("notification_h2", "block");
    misc.display("notification_h3", "none");
    misc.display("notification_p_1", "block");
    misc.display("notification_p_2", "none");
    misc.display("notification_overlay", "block");
}
