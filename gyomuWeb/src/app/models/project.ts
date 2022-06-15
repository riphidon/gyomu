export interface IProject {
    id: number;
    name: string;
    description: string;
    team: ITeam | null;
    tags: string[];
    status: string | null;
    deadline: Date | null;
    createdOn: Date;
    closedOn: Date | null;
}

export interface IProjectTask {
    projectId: number;
    id: number;
    name: string;
    description: string;
    assignedTo: ITaskAssignee[];
    status: string | null;
    tags: string[];
    createdOn: Date;
    closedOn: Date | null;
}

export interface ITeam {
    id: number;
    name: string;
    members: ITaskAssignee[];
}
export interface ITaskAssignee {
    userId: number;
    name: string;
    role: string[];
}

export enum ROLES {
    admin = 'admin',
    manager = 'manager',
    player = 'team member',
}

export enum STATUS {
    inProgress = 'in progress',
    alted = 'alted',
    complete = 'complete',
    discarded = 'discarded',
    rejected = 'rejected',
}
