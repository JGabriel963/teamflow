import { os } from "@orpc/server";

export const base = os.$context<{ request: Request }>().errors({
  BAD_REQUEST: {
    message: "Bad request.",
  },
  UNAUTHORIZED: {
    message: "Unauthorized.",
  },
  FORBIDDEN: {
    message: "Forbidden.",
  },
  NOT_FOUND: {
    message: "Not found.",
  },
  METHOD_NOT_ALLOWED: {
    message: "Method not allowed.",
  },
  INTERNAL_SERVER_ERROR: {
    message: "Internal server error.",
  },
});
