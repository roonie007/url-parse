import { urlJoin } from "https://deno.land/x/url_join/join.ts";

interface IUrlParams {
  key: string;
  value: string;
}

interface IUrlBuild {
  protocol?: string;
  hostname?: string;
  pathname?: Array<string> | string;
  port?: string | number;
  username?: string;
  password?: string;
  query?: Array<IUrlParams> | null;
}

export const urlBuild = (
  data: IUrlBuild | string | null | undefined = {},
): URL => {
  let url = new URL("http://localhost");
  let innerData: IUrlBuild = {};

  if (typeof data === "string") {
    url = new URL(data);

    if (url.protocol) {
      innerData.protocol = url.protocol;
    }
    if (url.hostname) {
      innerData.hostname = url.hostname;
    }
    if (url.port) {
      innerData.port = url.port;
    }
    if (url.username) {
      innerData.username = url.username;
    }
    if (url.password) {
      innerData.password = url.password;
    }
    if (url.searchParams) {
      url.searchParams.forEach((value, key) => {
        innerData?.query?.push({ value, key });
      });
    }
  } else {
    if (!data) {
      // if null or undefined
      innerData = {};
    } else {
      // if data exists
      innerData = data;
    }
  }

  const {
    protocol = "http",
    hostname,
    pathname,
    port,
    username,
    password,
    query = null,
  } = innerData;

  if (!protocol || !hostname) {
    throw new Error("You should at least set the protocol and the hostname");
  }
  if (protocol) {
    url.protocol = protocol;
  }

  if (hostname) {
    url.hostname = hostname;
  }

  if (pathname) {
    if (Array.isArray(pathname)) {
      url.pathname = urlJoin(...pathname);
    } else {
      url.pathname = pathname;
    }
  }

  if (typeof port === "number") {
    url.port = String(port).toString();
  } else {
    if (port) {
      url.port = port;
    }
  }
  if (username) {
    url.username = username;
  }
  if (password) {
    url.password = password;
  }
  if (query && Array.isArray(query)) {
    query.forEach(({ key, value }) => {
      url.searchParams.append(key, value);
    });
  }

  return url;
};
