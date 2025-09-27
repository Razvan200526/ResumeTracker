// import { Route } from '@backend/decorators/Route';
// import type { Context } from 'hono';

// @Route('GET', '/api/auth/signout', 'Logout the current user')
// export class SignoutController {
//   private readonly sessionService: SessionService;

//   constructor() {
//     this.sessionService = sessionService;
//   }

//   async handler(c: Context) {
//     const sessionToken = c.req.cookie('session_token');

//     if (sessionToken) {
//       await this.sessionService.deleteSession(sessionToken);
//       c.cookie('session_token', '', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'Lax',
//         expires: new Date(0), // Expire the cookie immediately
//       });
//     }

//     return c.json({ success: true, data: null });
//   }
// }
