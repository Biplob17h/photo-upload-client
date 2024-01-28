import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  console.log(user);
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.files[0];

    const userfrom = new FormData();

    userfrom.append("email", email);
    userfrom.append("password", password);
    userfrom.append("photo", photo);

    fetch(`http://localhost:5000/api/v1/user`, {
      method: "POST",
      headers: {},
      body: userfrom,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleGetUser = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;

    fetch(`http://localhost:5000/api/v1/user/userData?email=${email}`)
      .then((res) => res.json())
      .then((data) => setUser(data?.user));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/user/userImage?${user?.email}`)
      .then((res) => res.json())
      .then((data) => setImage(data));
  }, [user]);
  return (
    <div className="App">
      <h1 className="my-10 text-3xl font-semibold">Post A Photo</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="email"
        />
        <br />
        <input
          type="password"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="password"
        />
        <br />
        <input
          type="file"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="photo"
        />
        <br />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
      {/* GET */}
      <form action="" onSubmit={handleGetUser} className="mt-20">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="email"
        />{" "}
        <br />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>

      <h1 className="text-3xl font-bold mt-20">{user?.email}</h1>
      <h1 className="text-2xl font-semibold">{user?.password}</h1>
      {
        <img
          src={
            image ? (
              <>{image}</>
            ) : (
              <>
                <h1>Image not found</h1>
              </>
            )
          }
          alt=""
        />
      }
    </div>
  );
}

export default App;
