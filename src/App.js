import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_CLIENT_REQ = gql`
  query GET_ONE_CLIENT($id: Int!) {
    getClient(id: $id) {
      id
      name
      userId
    }
  }
`;

const UPDATE_USER_REQ = gql`
  mutation ($username: String, $password: String, $userId: Int!) {
    updateUser(username: $username, password: $password, userId: $userId) {
      id
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
  const [userId, setUserId] = useState();
  const [clientId, setClientId] = useState();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: clientData } = useQuery(GET_CLIENT_REQ, {
    variables: { id: +id },
  });

  const { data: userData } = useQuery(GET_USER_REQ, {
    variables: { userId: +userID },
  });

  // const [createUser, { data: DAKSDKSKDK }] = useMutation(TEST_REQ, {});

  // const [IntitiationName, { data: SOMEDATA }] = useMutation(GQL_REQUEST);
  // Update user.

  const [updateUser, { data }] = useMutation(UPDATE_USER_REQ, {
    update(cache) {
      cache.writeFragment({
        id: `Client:${clientId}`,
        fragment: gql`
          fragment GG on Client {
            id
            name
            userId
            __typename
          }
        `,
        data: { ...clientData, userId: 333333 },
      });
    },
  });
  function updateUserInitiator() {
    console.log(name, password, userId);
    updateUser({
      variables: {
        username: name,
        password: password,
        userId: +userId,
      },
    });
  }
  console.log(clientData?.getClient, "This is client");

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Get Client: </h1>
          <input onChange={(el) => setId(+el.target.value)} />
          <br />
          Client name: {clientData?.getClient?.name}
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

        <hr />

        {/* Updating user */}

        <div>
          <h3>Update user here:</h3>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="User name:"
          />
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="User password:"
          />
          <br />
          <input
            onChange={(e) => setUserId(+e.target.value)}
            placeholder="User ID:"
          />

          <h3> Set Client Properties:</h3>
          <input
            onChange={(e) => setClientId(+e.target.value)}
            placeholder="Client ID: "
          />

          <button onClick={() => updateUserInitiator()}> Update </button>
        </div>

        {/* Updating user end. */}
      </header>
    </div>
  );
}

export default App;
