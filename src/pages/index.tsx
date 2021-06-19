import NavMenu from "components/NavMenu";
import RouteKit from "helpers/RouteKit";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ height: "300vh" }} className="bg-gray-800">
      <div
        style={{
          height: "70vh",
          backgroundPosition: "center 40%",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
        className="flex justify-center items-center"
      >
        <h1
          style={{ textShadow: "0 3px 6px rgba(0,0,0,0.5)" }}
          className="text-white text-9xl font-bold"
        >
          Planning Poker
        </h1>
      </div>
      <div className="p-6 max-w-3xl mx-auto bg-gray-700 -mt-12 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl font-bold">Get started today!</h1>
          <p className="text-gray-300 max-w-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur maiores recusandae enim.
          </p>
        </div>
        <Link href={RouteKit.project.list.href} as={RouteKit.project.list.as}>
          <a className="bg-yellow-400 font-bold rounded-md p-2">
            Create Project
          </a>
        </Link>
      </div>
      <section className="py-24 flex justify-center">
        <h1 className="text-center text-white max-w-xl text-5xl font-bold">
          Lorem ipsum dolor sit amet consectetur.
        </h1>
      </section>
    </div>
  );
}
