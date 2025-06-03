export const education = {
    stages: [
        {
            name: "Primary School",
            schools: [
                "Auburn North Public School", "Blacktown South Public School", "Campsie Public School",
                "Chatswood Public School", "Harbord Public School", "Hurstville South Public School",
                "Leumeah Public School", "Liverpool Public School", "Malabar Public School",
                "Mona Vale Public School", "Padstow Park Public School", "Parramatta Public School",
                "Pennant Hills Public School", "Penrith Public School", "Randwick Public School",
                "Richmond Public School", "Ryde Public School", "St Johns Park Public School",
                "Sutherland Public School", "Westmead Public School",
            ],
            grades: [
                // Difficulty is rougly how many minutes a student has to spend in order to get a decent mark
                // startDate and endDate are MMDD codes, e.g. 131 = 31st January
                { name: "Kindergarten", difficulty: 15, startDate: 131, endDate: 1216, },
                { name: "Year 1", difficulty: 30, startDate: 131, endDate: 1216, },
                { name: "Year 2", difficulty: 35, startDate: 131, endDate: 1216, },
                { name: "Year 3", difficulty: 45, startDate: 131, endDate: 1216, },
                { name: "Year 4", difficulty: 50, startDate: 131, endDate: 1216, },
                { name: "Year 5", difficulty: 60, startDate: 131, endDate: 1216, },
                { name: "Year 6", difficulty: 75, startDate: 131, endDate: 1216, }
            ]
        },
        {
            name: "High School",
            schools: [
                "Blakehurst High School", "Canley Vale High School", "Carlingford High School",
                "Castle Hill High School", "Casula High School", "Concord High School",
                "Elizabeth Macarthur High School", "Killara High School", "Killarney Heights High School",
                "Kingsgrove High School", "Kingswood High School", "Kirrawee High School",
                "Leumeah High School", "Menai High School", "Pittwater High School",
                "Prairiewood High School", "Rooty Hill High School", "Sir Joseph Banks High School",
                "South Sydney High School","Turramurra High School",
            ],
            grades: [
                // startDate and endDate are MMDD codes, e.g. 131 = 31st January
                { name: "Year 7", difficulty: 90, startDate: 131, endDate: 1216, },
                { name: "Year 8", difficulty: 100, startDate: 131, endDate: 1216, },
                { name: "Year 9", difficulty: 120, startDate: 131, endDate: 1216, },
                { name: "Year 10", difficulty: 135, startDate: 131, endDate: 1216, },
                { name: "Year 11", difficulty: 150, startDate: 131, endDate: 925, },
                { name: "Year 12", difficulty: 240, startDate: 1012, endDate: 1106, }
            ]
        }
    ],
    enrolmentAge: 4210, // YDDD code of minimum age to start school
};
