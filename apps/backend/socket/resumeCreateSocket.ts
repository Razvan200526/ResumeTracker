// import { app } from '@backend/App';
// import { uploadResume } from '@backend/service/UploadResumeService';
// import type { Context } from 'hono';
// import { upgradeWebSocket } from 'hono/bun';

// app.get(
//   '/ws/resume',
//   upgradeWebSocket((_c: Context) => {
//     return {
//       async onMessage(event, ws) {
//         let dataStr: string;
//         if (typeof event.data === 'string') {
//           dataStr = event.data;
//         } else if (event.data instanceof Blob) {
//           dataStr = await event.data.text();
//         } else if (event.data instanceof ArrayBuffer) {
//           dataStr = Buffer.from(event.data).toString('utf-8');
//         } else {
//           ws.send(
//             JSON.stringify({ error: 'Invalid data type', success: false }),
//           );
//           return;
//         }
//         try {
//           const payload = JSON.parse(dataStr);
//           if (payload.channelName === 'resume:create') {
//             // Use the uploadResume service, but adapt it to accept { url, filename, filesize, user }
//             const { url, filename, filesize, user } = payload.data;
//             // You may need to adapt uploadResume to accept these fields directly
//             const result = await uploadResume({
//               resume: { name: filename, size: filesize, url }, // adapt as needed
//               user,
//             });

//             ws.send(
//               JSON.stringify({
//                 channelName: 'resume:create',
//                 data: { resume: result?.resume },
//                 success: !!result,
//                 message: result ? 'Resume uploaded' : 'Failed to upload resume',
//                 status: result ? 200 : 500,
//                 isClientError: !result,
//                 isServerError: !result,
//                 isNotFound: false,
//                 isUnauthorized: false,
//                 isForbidden: false,
//                 isLocal: true,
//                 isDevelopment: true,
//                 isStaging: false,
//                 isProduction: false,
//                 debug: false,
//                 app: { url: 'ws://localhost:2000/ws/resume' },
//               }),
//             );
//           }
//         } catch (e) {
//           ws.send(
//             JSON.stringify({
//               channelName: 'resume:create',
//               data: {},
//               success: false,
//               message: e,
//               status: 500,
//               isClientError: false,
//               isServerError: true,
//               isNotFound: false,
//               isUnauthorized: false,
//               isForbidden: false,
//               isLocal: true,
//               isDevelopment: true,
//               isStaging: false,
//               isProduction: false,
//               debug: true,
//               app: { url: 'ws://localhost:2000/ws/resume' },
//             }),
//           );
//         }
//       },
//       onOpen(_event, ws) {
//         ws.send('Connected to resume WebSocket!');
//       },
//     };
//   }),
// );
