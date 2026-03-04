import {
  delay,
  floatNumberToPercentageString,
  getEnv,
  minDelay,
} from "@/utils";

jest.useFakeTimers();
jest.spyOn(window, "setTimeout");

describe("floatNumberToPercentageString", () => {
  it("should return percentage string correctly", () => {
    expect(floatNumberToPercentageString(0.8)).toBe("80%");
  });
});

describe("delay", () => {
  it("should delay correctly", () => {
    delay(5000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });
});

describe("minDelay", () => {
  it("should delay at least specific duration", () => {
    const promise = delay(1000);
    expect(minDelay(promise, 2000)).toEqual(promise);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });
});

describe("getEnv", () => {
  it("should return development when href start with http://localhost", () => {
    const locationSpy = jest.spyOn(window, "location", "get");
    locationSpy.mockImplementation(
      () =>
        ({
          href: "http://localhost:3000",
        } as Location)
    );
    expect(getEnv()).toEqual("development");
    locationSpy.mockRestore();
  });
  it("should return production when href is NOT start with http://localhost", () => {
    const locationSpy = jest.spyOn(window, "location", "get");
    locationSpy.mockImplementation(
      () =>
        ({
          href: "https://bbki.ng",
        } as Location)
    );
    expect(getEnv()).toEqual("production");
    locationSpy.mockRestore();
  });
});
