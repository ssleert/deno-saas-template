export const parseCookies = (req: Request) => {
  const cookieHeader = req.headers.get("Cookie");
  let cookies = null;

  if (cookieHeader) {
    cookies = cookieHeader.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string | undefined>);
  }
  return cookies ?? {};
};
