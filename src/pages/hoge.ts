import type { definitions } from "../types/supabase";

type User = definitions["users"];

const hoge: User = {
  id: 1,
  name: "hoge",
  age: 22,
};

const fetchData = () => {
  return "fetched";
};

console.log(hoge.name);
