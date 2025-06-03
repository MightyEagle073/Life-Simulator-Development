import LifeDate from "../scripts/LifeDate";
import Period from "../scripts/Period";

describe("period differences", () => {
    it("tests simple difference", () => {
        const dateA = new LifeDate("2025-03-24");
        const dateB = new LifeDate("2025-06-27");
        const periodA = new Period(dateA, dateB);
        expect(periodA).toEqual(new Period({ years: 0, days: 95 }));
    });
    it("tests simple inverse difference", () => {
        const dateA = new LifeDate("2025-06-27");
        const dateB = new LifeDate("2025-03-24");
        const periodA = new Period(dateA, dateB);
        expect(periodA).toEqual(new Period({ years: 0, days: 95 }));
    });
    it("tests same date", () => {
        const dateA = new LifeDate("2025-06-27");
        const dateB = new LifeDate("2025-06-27");
        const periodA = new Period(dateA, dateB);
        expect(periodA).toEqual(new Period({ years: 0, days: 0 }));
    });
    it("tests year before date", () => {
        const dateA = new LifeDate("2024-02-13");
        const dateB = new LifeDate("2025-06-27");
        const periodA = new Period(dateA, dateB);
        expect(periodA).toEqual(new Period({ years: 1, days: 134 }));
    });
    it("tests year after date", () => {
        const dateA = new LifeDate("2024-08-28");
        const dateB = new LifeDate("2025-06-27");
        const periodA = new Period(dateA, dateB);
        expect(periodA).toEqual(new Period({ years: 0, days: 303 }));
    });
    it("tests leap years", () => {
        const dateA = new LifeDate("2023-08-28");
        const dateB = new LifeDate("2024-06-27");
        const periodA = new Period(dateA, dateB);
        expect(periodA).toEqual(new Period({ years: 0, days: 304 }));
    });
    it("tests full year", () => {
        const dateA = new LifeDate("2024-06-27");
        const dateB = new LifeDate("2025-06-27");
        const periodA = new Period(dateA, dateB);
        expect(periodA).toEqual(new Period({ years: 1, days: 0 }));
    });
});
