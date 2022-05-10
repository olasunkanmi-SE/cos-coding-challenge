const NodeCache = require("node-cache");
export const userInfoCache = new NodeCache({ stdTTL: 120, checkperiod: 120 });
