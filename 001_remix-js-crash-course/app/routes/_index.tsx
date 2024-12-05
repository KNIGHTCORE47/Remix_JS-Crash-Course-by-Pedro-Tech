import { MetaFunction } from '@remix-run/node';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react'
import { User, addUser, findUserByEmailandPassword } from 'schema/user.schema';
import { v4 as uuid4 } from 'uuid'


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type ActionData = {
  success?: boolean;
  user?: User;
  message?: string;
  error?: string
}


//NOTE - Server code
export async function action({ request }: any) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(name, email, password);

  if (!email || !password) {
    return Response.json(
      {
        success: false,
        error: "Email and password are required"
      }, { status: 400 }
    )

  }

  const newUser = {
    id: uuid4(),
    name,
    email,
    password
  }

  const existingUser = findUserByEmailandPassword(email, password);

  const user = existingUser || newUser;

  if (!existingUser) {
    addUser(user);
  }

  return Response.json(
    {
      success: true,
      user,
      message: existingUser ? "User already exists" : "User created successfully"
    }, { status: 200 }
  )
}






export default function Index() {

  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLogged = localStorage.getItem("userLogged");

    if (isUserLogged) {
      const user = JSON.parse(isUserLogged);

      location.pathname = `/profile/${user.id}`
    }


    if (actionData?.user) {
      localStorage.setItem("userLogged", JSON.stringify(actionData.user));


      navigate(`/profile/${actionData.user.id}`);
    }

  }, [actionData, navigate])


  return (
    <div
      className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-purple-800'
    >
      <div
        className='w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-md'
      >
        <h1
          className='text-3xl font-bold text-center text-white'
        >
          Login
        </h1>

        <Form
          method="post"
          className='space-y-6 mt-6'
        >
          <div>
            <label
              htmlFor="name"
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Name
            </label>

            <input
              type="name"
              id="name"
              name="name"
              className='mt-2 block w-full px-4 py-2 rounded-md shadow-sm bg-black text-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className='mt-2 block w-full px-4 py-2 rounded-md shadow-sm bg-black text-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className='mt-2 block w-full px-4 py-2 rounded-md shadow-sm bg-black text-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div>
            <button
              type="submit"
              className='w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Login
            </button>
          </div>

        </Form>

      </div>

    </div>
  )
}
