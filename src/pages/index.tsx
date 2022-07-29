import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Container, Table, Input, Button, Grid } from "@nextui-org/react";
import type { definitions } from "../types/supabase";

type User = definitions["users"];

const Home: NextPage = () => {
  const [users, setUsers] = useState(Array<User>);
  const [inputValue, setInputValue] = useState("");

  const fetchData = async () => {
    const { data, error } = await supabase
      .from<User>("users")
      .select("*")
      .like("name", `%${inputValue}%`);

    if (error) throw error;

    setUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid css={{ marginTop: "100px" }}>
      <Grid.Container gap={1}>
        <Grid>
          <Input
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </Grid>
        <Grid>
          <Button auto onClick={() => fetchData()}>
            Search
          </Button>
        </Grid>
      </Grid.Container>
      <Table css={{ height: "auto", minWidth: "100%" }}>
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Age</Table.Column>
          <Table.Column>Created at</Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>{user.created_at}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Home;
