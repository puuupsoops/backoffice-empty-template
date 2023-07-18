// import io from ' ';
//
// const extraHeaders = process.client ? {Authorization: `Bearer ${localStorage.getItem('authToken')}`} : null
// const socket = io('ws://localhost:8000', {
//     transports: ["websocket"],
//     path: '/',
//     withCredentials: true,
//     extraHeaders
// });
// export default defineNuxtPlugin(() => {
//
//     return {
//         provide: {
//             io: socket
//         }
//     }
// });


export default defineNuxtPlugin(() => {
    let socket: WebSocket|undefined;

    if (process.client) {
        const authToken = localStorage.getItem('authToken')
        socket = new WebSocket(`ws://localhost:8000?token=${authToken}`    );

        socket.addEventListener('open', () => {
            console.log('WebSocket connection opened');
        });

        // socket.addEventListener('message', (event) => {
        //
        // });
    }
    return {
        provide: {
            socket
        }
    }
});
