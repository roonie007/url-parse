import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { urlParse } from "./mod.ts";

Deno.test({
  name: "init with undefined",
  fn(): void {
    assertThrows((): void => {
      urlParse();
    });
  },
});

Deno.test({
  name: "init with null",
  fn(): void {
    assertThrows((): void => {
      urlParse(null);
    });
  },
});

Deno.test({
  name: "init with empty string",
  fn(): void {
    assertThrows((): void => {
      urlParse("");
    });
  },
});

Deno.test({
  name: "init with invalid url string",
  fn(): void {
    assertThrows((): void => {
      urlParse("random-string");
    });
  },
});
Deno.test({
  name: "init with incorrect but working url string",
  fn(): void {
    const url = urlParse("http:/example");

    assertEquals(url.toString(), "http://example/");
  },
});

Deno.test({
  name: "init with valid url string",
  fn(): void {
    const url = urlParse("https://google.com");

    assertEquals(url.protocol, "https:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.pathname, "/");
  },
});

Deno.test({
  name: "init with valid complex url string",
  fn(): void {
    const url = urlParse(
      "http://username:password@google.com/search?hello=world"
    );

    assertEquals(url.protocol, "http:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.pathname, "/search");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});

const urlParserData = {
  protocol: "https",
  hostname: "google.com",
  pathname: "search/hey",
  username: "username",
  password: "password",
  port: 3000,
  query: [{ key: "hello", value: "world" }],
};
// pathnameArray: ["search", "hey"],
// portString: "3000",

Deno.test({
  name: "init with empty object",
  fn(): void {
    assertThrows((): void => {
      urlParse({});
    });
  },
});

Deno.test({
  name: "init with normal object",
  fn(): void {
    const url = urlParse(urlParserData);

    assertEquals(url.protocol, "https:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.pathname, "/search/hey");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});

Deno.test({
  name: "init with normal object - port is string",
  fn(): void {
    const url = urlParse(
      Object.assign({}, urlParserData, {
        port: urlParserData.port.toString(),
      })
    );

    assertEquals(url.protocol, "https:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.port, "3000");
    assertEquals(url.pathname, "/search/hey");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});

Deno.test({
  name: "init with normal object - pathname is array of strings",
  fn(): void {
    const url = urlParse(
      Object.assign({}, urlParserData, { pathname: ["search", "hey"] })
    );

    assertEquals(url.protocol, "https:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.port, "3000");
    assertEquals(url.pathname, "/search/hey");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});

Deno.test({
  name: "init with normal object - mongodb: protocol",
  fn(): void {
    const url = urlParse(
      Object.assign({}, urlParserData, {
        protocol: "mongodb:",
        hostname: "localhost",
        port: "27017",
      })
    );

    assertEquals(url.protocol, "mongodb:");
    assertEquals(url.hostname, "localhost");
    assertEquals(url.port, "27017");
    assertEquals(url.pathname, "/search/hey");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});
