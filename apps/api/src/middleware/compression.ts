import compression from "compression";
import { constants } from "zlib";

export const compressionMiddleware = compression({
  threshold: 1024,
  brotli: {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 4,
    },
  },
  zlib: {
    flush: 2,
  },
});
