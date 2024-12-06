import { Form, redirect, useLoaderData } from "@remix-run/react";
import { deleteUserById, findUserById, User } from "schema/user.schema";


export async function loader({ params }: { params: { id: string } }) {
    const user = findUserById(params.id);

    if (!user) {
        return redirect("/");
    }

    return new Response(JSON.stringify(user), {
        headers: {
            "Content-Type": "application/json",
        },
    });

}


export async function action({
    params,
    request,
}: {
    params: { id: string };
    request: Request;
}) {
    const formData = await request.formData();

    //NOTE - here we can get the action value upon submit of the form
    const actionType = formData.get("action");

    //NOTE - For Logout action
    if (actionType === "logout") {
        return redirect("/");
    }

    if (actionType === "remove") {
        deleteUserById(params.id);
        return redirect("/");
    }
}





export default function Profile() {
    const user = useLoaderData<User>();

    //NOTE - Client Side code
    function handleUserLogoutAndRemoveAccount(action: string) {
        if (action === "logout" || action === "remove") {
            localStorage.removeItem("userLogged");
            return redirect("/");
        }
    }


    return (
        <div
            className="flex min-h-screen items-center justify-center bg-black"
        >
            <div
                className="w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-md"
            >
                <h1
                    className="text-2xl font-bold text-center text-white"
                >
                    Welcome {user.name}!
                </h1>
                <p
                    className="mt-2 text-center text-white"
                >
                    Email: {user.email}
                </p>


                <div
                    className="flex items-center justify-center mt-4 space-x-3"
                >
                    <Form
                        method="post"
                        onSubmit={() => handleUserLogoutAndRemoveAccount("logout")}
                    >
                        <input
                            type="hidden" name="action"
                            value="logout"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 text-gray-900 bg-yellow-500 rounded"
                        >
                            Logout
                        </button>

                    </Form>

                    <Form
                        method="post"
                        onSubmit={() => handleUserLogoutAndRemoveAccount("remove")}
                    >
                        <input
                            type="hidden" name="action"
                            value="remove"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 text-gray-900 bg-red-500 rounded"
                        >
                            Remove Account
                        </button>

                    </Form>
                </div>

            </div>

        </div>
    )
}
