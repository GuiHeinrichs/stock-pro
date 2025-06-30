export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    image?: string | null;
    role: number;
    createdAt: Date;
    updatedAt: Date;
};
