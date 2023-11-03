import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_CLIENT_REQ = gql`
  query GET_ONE_CLIENT($id: Int!) {
    getClient(id: $id) {
      name
    }
  }
`;

const GET_USER_REQ = gql`
  query ($userId: Int!) {
    getUser(userId: $userId) {
      username
      id
      password
    }
  }
`;

function App() {
  const [id, setId] = useState();
  const [userID, setUserID] = useState();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(id, "id test");
  const { data, loading } = useQuery(GET_CLIENT_REQ, {
    variables: { id: +id },
  });

  const { data: userData } = useQuery(GET_USER_REQ, {
    variables: { userId: +userID },
  });

  console.log(data?.getClient, "This is client");

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Get Client: </h1>
          <input onChange={(el) => setId(el.target.value)} />
          <br />
          {data?.getClient?.name}
        </div>
        <div>
          <h1>Get User:</h1>
          <input onChange={(el) => setUserID(el.target.value)} />
          <br />
          name: {userData?.getUser?.username}
          <br />
          id: {userData?.getUser?.id}
          <br />
          password: {userData?.getUser?.password}
          <br />
        </div>
      </header>
    </div>
  );
}

export default App;
