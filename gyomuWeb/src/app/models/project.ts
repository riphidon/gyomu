export interface IProject {
    id: number;
    name: string;
    description: string;
    tags: string[];
}

export interface IProjectTask {
    projectId: number;
    id: number;
    name: string;
    description: string;
    assignedTo: ITaskAssignee[];
    tags: string[];
}

export interface ITaskAssignee {
    id: number;
    name: string;
}

export interface ITag {
    name: string;
}
