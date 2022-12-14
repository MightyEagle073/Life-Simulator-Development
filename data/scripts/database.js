//This script contains all the constant datas required to run Life Simulator. The information here does not change, unless changed by developer.
// ! This javascript file might be split into multiple databases in the future.

const database = {
    //Theme Names
    themeNames: [
        null,
        "1_sunset.jpg",
        "2_forest.jpg",
        "3_cityscape.jpg",
        "4_rainy.jpg",
        "5_blocks.jpg",
        "6_paint.jpg",
        "7_moon.jpg",
        "8_waterfall.jpg",
        "9_hexagon.jpg",
        "10_road.jpg",
        "11_valley.jpg",
        "12_train.jpg",
    ],

    //Default Settings - Settings when the game is first launched, or when resetted
    settings: {
        volume: 100,
        theme: 1,
        gameSpeed: 1,
    },

    //Default Life Information - Life information before the life is first created
    lifeInformation: {
        //Crucial information for running, never shown to the player
        //Status: 0 = Doesn't Exist, 1 = Alive, 2 = Dead
        version: "0.3 beta",
        status: 0, //Integer from 0-2, changed to 1 when life is created (0 = Not born yet, 1 = Alive, 2 = Dead)
        //Life Information
        age: {
            years: 0, // Integer >= 0
            days: 0, // Integer from 0-365
        },
        balance: 0, // Float >= 0
        birthday: {
            year: 1970, //Integer >= 0, changed when life is created
            month: 1, //Integer from 1-12, changed when life is created
            day: 1, //Integer from 1-31, changed when life is created
        },
        career: {
            current: {
                job: [], //Array of strings
                level: [], //Array of integers > 0
                start: [], //Array of date libraries
            },
            past: {
                job: [], //Array of strings
                level: [], //Array of integers > 0
                start: [], //Array of date libraries
                end: [], //Array of date libraries
            },
            effort: 50, //Integer between 0-100
        },
        date: {
            year: 1970, //Integer >= 0, changed when life is created
            month: 1, //Integer from 0-12, changed when life is created
            day: 1, //Integer from 0-31, changed when life is created
        },
        diary: "Click the play button on the bottom right corner to start your life!", //String
        dsb: 0, //Integer, never shown to the player
        education: {
            status: 0, //Integer from 0-3 (0 = Not in school yet, 1 = In school, 2 = On Holidays, 3 = Graduated)
            level: 0, //Integer from 0-3 (0 = Not in school yet, 1 = Primary, 2 = Secondary, 3 = Tertiary)
            grade: 0, //Integer <= 0
            school: 0, //Integer <= 0
            daysIntoGrade: 0, //Integer <= 0
            marks: 50, //Integer between 0-100
            effort: 50, //Integer between 0-100
        },
        gender: "m", //String, either "m" or "f", changed when life is created
        iq: 0, //Integer < 0, generated when life is created
        name: {
            first: "John", //String, changed when life is created
            last: "Smith", //String, changed when life is created
        },
        netWorth: 0.0, //Float
        //Life number - To be used when transferring
        lifeNo: 0,
    },

    //Database information related to education
    education: {
        //List of Levels
        levels: ["none", "primary", "secondary", "tertiary"],
        //List of Schools
        schools: {
            primary: [
                null,
                "Auburn North Public School",
                "Blacktown South Public School",
                "Campsie Public School",
                "Chatswood Public School",
                "Harbord Public School",
                "Hurstville South Public School",
                "Leumeah Public School",
                "Liverpool Public School",
                "Malabar Public School",
                "Mona Vale Public School",
                "Padstow Park Public School",
                "Parramatta Public School",
                "Pennant Hills Public School",
                "Penrith Public School",
                "Randwick Public School",
                "Richmond Public School",
                "Ryde Public School",
                "St Johns Park Public School",
                "Sutherland Public School",
                "Westmead Public School",
            ],
            secondary: [
                null,
                "Blakehurst High School",
                "Canley Vale High School",
                "Carlingford High School",
                "Castle Hill High School",
                "Casula High School",
                "Concord High School",
                "Elizabeth Macarthur High School",
                "Killara High School",
                "Killarney Heights High School",
                "Kingsgrove High School",
                "Kingswood High School",
                "Kirrawee High School",
                "Leumeah High School",
                "Menai High School",
                "Pittwater High School",
                "Prairiewood High School",
                "Rooty Hill High School",
                "Sir Joseph Banks High School",
                "South Sydney High School",
                "Turramurra High School",
            ],
        },
        //List of Grade Names
        grades: {
            primary: {
                names: [null, "Kindergarten", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"],
                difficulty: [null, 5, 15, 20, 25, 30, 35, 45],
                startDate: [null, 131, 131, 131, 131, 131, 131, 131], //MMDD code of when the grade will start
                endDate: [null, 1215, 1215, 1215, 1215, 1215, 1215, 1215], //MMDD code of when the grade will end
            },
            secondary: {
                names: [null, "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12"],
                difficulty: [null, 60, 65, 75, 80, 95, 120],
                startDate: [null, 131, 131, 131, 131, 131, 1012], //MMDD code of when the grade will start
                endDate: [null, 1215, 1215, 1215, 1215, 925, 1106], //MMDD code of when the grade will end
            },
        },
        enrolmentAge: 4210,
    },
};
