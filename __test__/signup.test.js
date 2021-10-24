const app = require("../app");
const request = require("supertest");

describe("signup testing with right credentials", () => {
  it("returns status 200 if everthing is fine", async () => {
    const res = await request(app).post("/api/signup").send({
      username: "test12345",
      email: "ab22345c@gmail.com",
      password: "test123",
    });

    expect(res.statusCode).toEqual(200);
  });
});

describe("shorter username than 6 characters", () => {
  it("returns status 200 if everthing is fine", async () => {
    const res = await request(app).post("/api/signup").send({
      username: "name",
      email: "abc@gmail.com",
      password: "test123",
    });

    expect(res.text).toEqual(
      '"username" length must be at least 6 characters long'
    );
  });
});

describe("Shorter email than 6 characters", () => {
  it("returns status 200 if everything is fine", async () => {
    const res = await request(app).post("/api/signup").send({
      username: "testing",
      email: "@.com",
      password: "test123",
    });

    expect(res.text).toEqual(
      '"email" length must be at least 6 characters long'
    );
  });
});

describe("Incorrect format email", () => {
  it("returns status 200 if everything is fine", async () => {
    const res = await request(app).post("/api/signup").send({
      username: "testing",
      email: "testicom",
      password: "test123",
    });
    expect(res.text).toEqual('"email" must be a valid email');
  });
});

describe("Incorrect email", () => {
  it("returns status 200 if everything is fine", async () => {
    const res = await request(app).post("/api/signup").send({
      username: "testing",
      email: "testicom",
      password: "test123",
    });
    expect(res.text).toEqual('"email" must be a valid email');
  });
});

describe("Shorter Password than 6 Characters", () => {
  it("returns status 200 if everything is fine", async () => {
    const res = await request(app).post("/api/signup").send({
      username: "testing",
      email: "testi@test.com",
      password: "123",
    });
    expect(res.text).toEqual(
      '"password" length must be at least 6 characters long'
    );
  });
});
