export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const users: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "X2yfA@example.com",
        password: "15d6a5d4-a1b2-c3d4-e5f6-7a8b9c0d1e2f"
    },
    {
        id: "2",
        name: "Jane Doe",
        email: "9iJi0@example.com",
        password: "u14d6a5d4-a1b2-c3d4-e5f6-7a8b9c0d1e2f"
    },
    {
        id: "3",
        name: "Black Doe",
        email: "L2eM5@example.com",
        password: "o17d6a5d4-a1b2-c3d4-e5f6-7a8b9c0d1e2f"
    },
    {
        id: "4",
        name: "Mia Flores",
        email: "KMq3t@example.com",
        password: "9j98d6a5d4-a1b2-c3d4-e5f6-7a8b9c0d1e2f"
    }
];



function addUser(user: User) {
    const existingUser = findUserByEmailandPassword(user.email, user.password);

    if (existingUser) {
        throw new Error(`User with email ${user.email} already exists`);
    }

    users.push(user);
}

function findUserById(id: string) {
    return users.find(user => user.id === id);
}

function findUserByEmailandPassword(email: string, password: string) {
    return users.find(user => user.email === email && user.password === password);
}

function deleteUserById(id: string) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
    }
}


export {
    addUser,
    findUserById,
    findUserByEmailandPassword,
    deleteUserById
}