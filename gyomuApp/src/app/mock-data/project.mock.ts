import { IProject, ITeam, ROLES, STATUS } from '../models/project';

export const TEAM_ALPHA: ITeam = {
    id: 1,
    name: 'Alpha',
    members: [
        { userId: 2, name: 'Case', role: [ROLES.manager, ROLES.player] },
        { userId: 4, name: 'Al', role: [ROLES.player] },
        { userId: 5, name: 'Lola', role: [ROLES.player] },
    ],
};

export const TEAM_CNOTE: ITeam = {
    id: 2,
    name: 'C-Note',
    members: [
        { userId: 10, name: 'Jee', role: [ROLES.admin] },
        { userId: 7, name: 'Griz', role: [ROLES.player] },
        { userId: 3, name: 'Veve', role: [ROLES.player, ROLES.manager] },
        { userId: 6, name: 'Locke', role: [ROLES.player] },
        { userId: 5, name: 'Lola', role: [ROLES.player] },
    ],
};

export const TEAM_ROOKIE: ITeam = {
    id: 3,
    name: 'Rookie',
    members: [
        { userId: 1, name: 'Satoshi', role: [ROLES.admin, ROLES.manager] },
        { userId: 4, name: 'Al', role: [ROLES.player] },
        { userId: 8, name: 'Hana', role: [ROLES.player] },
        { userId: 9, name: 'Rara', role: [ROLES.player] },
        { userId: 7, name: 'Griz', role: [ROLES.player] },
    ],
};

export const TEAM_TENDO: ITeam = {
    id: 3,
    name: 'Tendo',
    members: [
        { userId: 1, name: 'Satoshi', role: [ROLES.player] },
        { userId: 6, name: 'Locke', role: [ROLES.player, ROLES.manager] },
        { userId: 8, name: 'Hana', role: [ROLES.player] },
        {
            userId: 3,
            name: 'Veve',
            role: [ROLES.player, ROLES.admin, ROLES.manager],
        },
        { userId: 2, name: 'Case', role: [ROLES.player] },
        { userId: 7, name: 'Griz', role: [ROLES.player] },
    ],
};

export const PROJECT_ONE: IProject = {
    id: 1,
    name: 'Ichi Ban',
    description: 'Secret revolutionary project',
    team: TEAM_ALPHA,
    tags: [],
    status: STATUS.alted,
    deadline: null,
    createdOn: new Date('2020-10-20'),
    closedOn: null,
};

export const PROJECT_GARDEN: IProject = {
    id: 2,
    name: 'Garden',
    description: 'Hydroponic garden management',
    team: TEAM_ROOKIE,
    tags: [],
    status: STATUS.complete,
    deadline: new Date('2021-11-31'),
    createdOn: new Date('2021-07-23'),
    closedOn: new Date('2021-12-20'),
};

export const PROJECT_EDEN: IProject = {
    id: 3,
    name: 'Eden',
    description: 'Dead soil revitalization',
    team: TEAM_CNOTE,
    tags: [],
    status: STATUS.inProgress,
    deadline: new Date('2022-07-31'),
    createdOn: new Date('2022-01-15'),
    closedOn: null,
};

export const PROJECT_NEUROCHROME: IProject = {
    id: 4,
    name: 'Neurochrome',
    description: 'Neurosurgeon AI assistance for tool manipulation',
    team: TEAM_ALPHA,
    tags: [],
    status: STATUS.inProgress,
    deadline: new Date('2024-01-01'),
    createdOn: new Date('2022-01-01'),
    closedOn: null,
};

export const PROJECT_BUBBLE: IProject = {
    id: 5,
    name: 'Bubble',
    description: 'Safe close space structure creation',
    team: TEAM_TENDO,
    tags: [],
    status: null,
    deadline: null,
    createdOn: new Date(),
    closedOn: null,
};

export const PROJECT_21: IProject = {
    id: 6,
    name: '2121',
    description: 'Advance sound sampling tool',
    team: TEAM_ROOKIE,
    tags: [],
    status: STATUS.discarded,
    deadline: new Date('2021-02-01'),
    createdOn: new Date('2020-10-20'),
    closedOn: new Date('2020-12-29'),
};

export const PROJECTS: IProject[] = [
    PROJECT_ONE,
    PROJECT_NEUROCHROME,
    PROJECT_EDEN,
    PROJECT_GARDEN,
    PROJECT_BUBBLE,
    PROJECT_21,
];
