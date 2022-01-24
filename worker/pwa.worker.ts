const worker: Worker = self as any;

// worker.addEventListener('fetch', (event: FetchEvent) => {

//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 return response || fetch(event.request);
//             }),
//     );
// });

// worker.addEventListener('install', (event: InstallEvent) => {

//     event.waitUntil(
//         caches.open('v1')
//         .then((cache) => {
//             return cache.addAll([
//                 '/dist/app.css',
//                 '/dist/app.js',
//                 '/index.html',
//             ]);
//         })
//         .catch((e: any) => {
//             console.error(e);
//         }),
//     );

// });
