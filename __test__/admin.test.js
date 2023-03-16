// importing supertest module
const request = require("supertest");

// importing app from server
const app = require("../server");

// testing the user login
test("user login", async () => {
  // act
  let response = await request(app).post("/user/loginUser").send({
    email:"pramod@westagilelabs.com",
    password: "pramod123",
  });

  // assertions
  expect(response.body).toHaveProperty("payload");
});

// testing admin to get all projects

// testing get all the projects
test("Get all projects by admin", async () => {
  // arrange
  // act
  let response = await request(app)
    .get("/admin/getProjectDetails")
    .set(
      "Authorization",
      "bearer" +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoic2FzaGlAd2VzdGFnaWxlbGFicy5jb20iLCJ1c2VyX3JvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODgxNDU1MiwiZXhwIjoxNjc4OTAwOTUyfQ.TQQMDdkii2jxV9gj3nsqJoxl4lZUMQvoiFYUI-__5Wk"
    );

  // assertions
  expect(response.body.payload.length).toBeGreaterThan(0);
});
