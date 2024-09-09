import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <section className="bg-neutral-900">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <h1 className="mt-4 text-2xl font-bold text-gray-100 sm:text-3xl md:text-4xl">
                            Skillify
                        </h1>
                        <h2 className="italic text-xl font-light text-gray-200 sm:text-2xl md:text-3xl">
                            - AI Mock Interview
                        </h2>
                        <SignIn />
                    </div>
                </main>
            </div>
        </section>
    );
}
