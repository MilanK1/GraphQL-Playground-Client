import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_CLIENT_REQ = gql`
  query GET_ONE_CLIENT($id: Int!) {
    getClient(id: $id) {
      name
    }
  }
`;

const UPDATE_USER_REQ = gql`
  mutation ($username: String, $password: String, $userId: Int!) {
    updateUser(username: $username, password: $password, userId: $userId) {
      password
      username
    }
  }
`;

const TEST_REQ = gql`
  query ($argument: String) {
    test(argumnet: $argument) {
      argument
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

  const { data, loading } = useQuery(GET_CLIENT_REQ, {
    variables: { id: +id },
  });

  const { data: userData } = useQuery(GET_USER_REQ, {
    variables: { userId: +userID },
  });

  // const [createUser, { data: DAKSDKSKDK }] = useMutation(TEST_REQ, {});

  // const [IntitiationName, { data: SOMEDATA }] = useMutation(GQL_REQUEST);
  const [updateUser, { data: updateUserData }] = useMutation(UPDATE_USER_REQ);

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
