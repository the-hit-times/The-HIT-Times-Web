import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  },
);

// matches all the path starting with /admin-portal
export const config = { matcher: ["/admin-portal/:path*", "/recruitment"] };
