"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEED_POSTS = exports.SEED_USERS = void 0;
exports.SEED_USERS = [
    {
        email: 'user-bel-gebna@mail.com',
        id: 'user-bel-gebna',
        password: '123456',
        userName: 'gebna',
        firstName: 'User',
        lastName: 'Bel-Gebna',
    },
    {
        email: '7amada-elgenn@mail.com',
        id: '7amada-elgenn-id',
        password: '123456',
        userName: '7amada',
        firstName: 'Hamada',
        lastName: 'Elgenn',
    },
    {
        email: 'bolbol@mail.com',
        id: 'bolbol-7ayran',
        password: '123456',
        userName: 'bolbol',
        firstName: 'Bolbol',
        lastName: 'Hayran',
    },
    {
        email: 'bororom@mail.com',
        id: 'isma3een-yaseen',
        password: '123456',
        userName: 'isma3een',
        firstName: 'Isma3een',
        lastName: 'Yaseen',
    },
];
exports.SEED_POSTS = [
    {
        id: 'post1-id',
        postedAt: new Date('Oct 12 2022 14:36:43').getTime(),
        title: 'FauxPilot - an open source Github Copilot server',
        url: 'http://github.com/moyix',
        userId: exports.SEED_USERS[0].id,
    },
    {
        id: 'post2-id',
        postedAt: new Date('Oct 11 2022 12:36:43').getTime(),
        title: 'Y Combinator narrows current cohort size by 40%, citing downturn and funding',
        url: 'http://techcrunch.com',
        userId: exports.SEED_USERS[1].id,
    },
    {
        id: 'post3-id',
        postedAt: new Date('Oct 7 2022 12:36:43').getTime(),
        title: 'Nonprofit markups.org is exposing the most egregious new car prices',
        url: 'http://themanual.com',
        userId: exports.SEED_USERS[2].id,
    },
    {
        id: 'post4-id',
        postedAt: new Date('Oct 5 2022 12:36:43').getTime(),
        title: 'RTEMS real time operating system',
        url: 'http://rtems.org',
        userId: exports.SEED_USERS[3].id,
    },
    {
        id: 'post5-id',
        postedAt: new Date('Oct 2 2022 12:36:43').getTime(),
        title: 'I used DALL-E 2 to generate a logo',
        url: 'http://jacobmartins.com',
        userId: exports.SEED_USERS[1].id,
    },
];
//# sourceMappingURL=seeds.js.map