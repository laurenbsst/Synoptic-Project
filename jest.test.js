const request = require("supertest");
const app = require("./server")

describe("Test the root path", () => {
    test("It should respond to the / GET method", () => {
      return request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(302); //URL changed temporarily
        });
    });
});

describe("Test the login path", () => {
    test("It should respond to the /login GET method", () => {
      return request(app)
        .get("/login")
        .then(response => {
          expect(response.statusCode).toBe(200); //succeeded
        });
    });
});

describe("Test the register path", () => {
    test("It should respond to the /register GET method", () => {
      return request(app)
        .get("/register")
        .then(response => {
          expect(response.statusCode).toBe(200); //succeeded
        });
    });
});

describe("Test the explore-page path", () => {
    test("It should respond to the /explore-page GET method", () => {
      return request(app)
        .get("/explore-page")
        .then(response => {
          expect(response.statusCode).toBe(200); //succeded
        });
    });
});

describe("Test the main-feed path", () => {
    test("It should respond to the /main-feed GET method", () => {
      return request(app)
        .get("/main-feed")
        .then(response => {
          expect(response.statusCode).toBe(500); //server error
        });
    });
});

describe("Test the support path", () => {
    test("It should respond to the /support GET method", () => {
      return request(app)
        .get("/support")
        .then(response => {
          expect(response.statusCode).toBe(200); //succeeded
        });
    });
});

describe("Test the register path", () => {
    test("It should respond to the /register POST method", () => {
      return request(app)
        .post("/register")
        .then(response => {
          expect(response.statusCode).toBe(302); //URL changed temporarily
        });
    });
});

describe("Test the login path", () => {
    test("It should respond to the /login POST method", () => {
      return request(app)
        .post("/login")
        .then(response => {
          expect(response.statusCode).toBe(302); //URL changed temporarily
        });
    });
});

describe("Test the register path", () => {
    test("It should respond to the /register POST method", () => {
      return request(app)
        .post("/register")
        .then(response => {
          expect(response.statusCode).toBe(302); //URL changed temporarily
        });
    });
});

describe("Test logging out", () => {
    test("It should respond to the /logout delete method", () => {
      return request(app)
        .delete("/logout")
        .then(response => {
          expect(response.statusCode).toBe(302); //URL changed temporarily
        });
    });
});