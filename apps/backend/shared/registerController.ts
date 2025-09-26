import type { Context, Hono } from 'hono';

export function registerController(app: Hono, ControllerClass: any) {
  const instance = new ControllerClass();
  const routeMeta = ControllerClass.prototype.route;
  if (!routeMeta) {
    throw new Error(
      `Controller ${ControllerClass.name} missing route metadata`,
    );
  }

  // Normalize method to lowercase for Hono
  const method = routeMeta.method.toLowerCase();
  // Register the route
  (app as any)[method](routeMeta.path, (c: Context) => instance.handler(c));
}
