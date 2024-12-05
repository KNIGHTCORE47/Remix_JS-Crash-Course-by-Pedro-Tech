import type { MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { v4 as uuid4 } from 'uuid'

import {
  addUser,
  findUserByEmailPassword,
  User
} from "schema/user.schema";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};



type ActionData = {
  user?: User
  error?: string
  message?: string
}





// NOTE - SERVER CODE:
export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    console.log(formData);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // NOTE - check email and password validation
    if (!email || !password) {
      return Response.json({
        error: "Email and password are required",
      }, { status: 400 });
    }

    const existingUser = findUserByEmailPassword(email, password)


    const newUser = {
      id: uuid4(),
      username,
      email,
      password,
    }

    const user = existingUser || newUser

    // NOte - check if user is not exist then add
    if (!existingUser) {
      addUser(user)
    }


    return Response.json({
      user,
      message: "User created successfully",
    }, { status: 201 });


  } catch (error: any) {
    return Response.json({
      error: error.message,
    }, { status: 500 });
  }

}





export default function Index() {

  const actionData = useActionData()



  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-purple-800"
    >

      <div
        className="w-full max-w-md p-6 bg-gray-500 rounded-lg shadow-md"
      >

        <h1
          className="text-3xl font-bold text-center text-gray-800"
        >
          Login
        </h1>

        <Form
          method="post"
          className="space-y-6 mt-6"
        >

          <div className=" text-black">
            <label
              htmlFor="username"
              className="block mb-2 text-base font-medium text-black"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              className="mt-2 block w-full px-4 py-2 bg-gray-400 border border-gray-800 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="text"
              autoComplete="username"
              required
            />
          </div>

          <div className=" text-black">
            <label
              htmlFor="email"
              className="block mb-2 text-base font-medium text-black"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              className="mt-2 block w-full px-4 py-2 bg-gray-400 border border-gray-800 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className=" text-black">
            <label
              htmlFor="password"
              className="block mb-2 text-base font-medium text-black"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              className="mt-2 block w-full px-4 py-2 bg-gray-400 border border-gray-800 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </Form>

      </div>
    </div>
  );
}

