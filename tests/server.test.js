const expect = require("expect");
const request = require("supertest");
const { app } = require("../server");

describe("Server", () => {
  it("should test out the main page", done => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
