export interface User {
    id: string | number;
    username: string;
    email: string;
    password: string;
}







export const users: User[] = [
    {
        id: 1,
        username: 'admin',
        email: '0oLbV@example.com',
        password: 'admin'
    },
    {
        id: 2,
        username: 'user',
        email: '0oLbV@example.com',
        password: 'user'
    },
    {
        id: 3,
        username: 'guest',
        email: '0oLbV@example.com',
        password: 'guest'
    },
    {
        id: 4,
        username: 'test',
        email: '0oLbV@example.com',
        password: 'test'
    }
]







function addUser(user: User) {
    // check if user already exists
    const existingUser = findUserByEmailPassword(user.email, user.password)

    if (existingUser) {
        throw new Error('User already exists')
    }



    // add user
    if (!existingUser) {
        users.push(user)
    }
}


function findUser(id: number) {
    const user = users.find((u) => u.id === id)

    if (!user) {
        throw new Error('User not found')
    }

    return user
}


function findUserByEmailPassword(email: string, password: string) {
    return users.find(u => (
        u.email === email &&
        u.password === password
    ))
}


function deleteUser(id: number) {
    const user = users.find((u) => u.id === id)

    if (!user) {
        throw new Error('User not found')
    }

    users.splice(users.indexOf(user), 1)
}

export {
    addUser,
    findUser,
    findUserByEmailPassword,
    deleteUser
}