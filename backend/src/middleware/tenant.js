export function withTenant(req, _res, next) {
  req.orgId = req.user?.orgId || null;
  next();
}
