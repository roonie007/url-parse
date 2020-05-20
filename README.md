# url-build

A simple url builder based on the ES6 [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object for Deno with typescript

## Usage

Using a String

```javascript
import { urlBuild } from "https://deno.land/x/url_build/build.ts";

const url = urlBuild("http://www.google.com"); // Returns an URL object

console.log(url.toString());
// http://www.google.com/

console.log(url);
/**
 * {
 *    href: "http://www.google.com/",
 *    origin: "http://www.google.com",
 *    protocol: "http:",
 *    username: "",
 *    password: "",
 *    host: "www.google.com",
 *    hostname: "www.google.com",
 *    port: "",
 *    pathname: "/",
 *    hash: "",
 *    search: ""
 * }
 */
```

Using an object

```javascript
import { urlBuild } from "https://deno.land/x/url_build/build.ts";

const url = urlBuild({
  protocol: "https",
  hostname: "google.com",
  pathname: "search/hey", // "search/hey" or ["search", "hey"]
  username: "username",
  password: "password",
  port: 3000, // 3000 or "3000"
  query: [{ key: "hello", value: "world" }],
}); // Returns an URL object

console.log(url.toString());
// https://username:password@google.com:3000/search/hey?hello=world
```

## License

MIT
