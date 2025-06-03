import LifeDate from "../scripts/classes/LifeDate";

describe("dates test", () => {
    it("tests date formatting", () => {
        const date = new LifeDate();
        expect(date.format("yyyy/mm/dd")).toEqual("1970/01/01");
        expect(date.format("yyyy.m.d")).toEqual("1970.1.1");
        expect(date.format("yy-m-d")).toEqual("70-1-1");
        expect(date.format("dd.mm.yyyy")).toEqual("01.01.1970");
        expect(date.format("mm$d$yy")).toEqual("01$1$70");
        expect(date.format("d_mm_yyyy")).toEqual("1_01_1970");
        expect(date.format("mm/dd/yyy")).toEqual("Invalid year");
        expect(date.format("dd/mm")).toEqual("Invalid year");
        expect(date.format("dd/yy")).toEqual("Invalid month");
        expect(date.format("m/yyyy")).toEqual("Invalid day");
        expect(date.format("yy/mm/dd/yy")).toEqual("Invalid year");
    });
    it("tests date adding", () => {
        const date = new LifeDate();
        date.add(1);
        expect(date.format("dd/mm/yyyy")).toEqual("02/01/1970");
        date.add(180);
        expect(date.format("dd/mm/yyyy")).toEqual("01/07/1970");
        date.add(20000);
        expect(date.format("dd/mm/yyyy")).toEqual("03/04/2025");
    });
    it("tests date constructing", () => {
        let date = new LifeDate("2025-03-24");
        expect(date.format("dd/mm/yyyy")).toEqual("24/03/2025");
        date = new LifeDate("03/21/24");
        expect(date.format("dd/mm/yyyy")).toEqual("21/03/2024");
        date = new LifeDate("Mar 8 1982");
        expect(date.format("dd/mm/yyyy")).toEqual("08/03/1982");
    });
    it("static atleast function", () => {
        const date = new LifeDate("2025-03-24");
        expect(date.next(627).format("dd/mm/yyyy")).toEqual("27/06/2025");
        expect(date.next(115).format("dd/mm/yyyy")).toEqual("15/01/2026");
    });
});
