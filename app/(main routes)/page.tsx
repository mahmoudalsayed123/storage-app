import { getFilesFromDBForCurrentUser } from "../actions/file.actions";
import { createUserFromDB, getUserFromDB } from "../actions/user.actions";
import AvailableStorage from "./components/AvailableStorage";
import Cards from "./components/Cards";

const Page = async() => {
  await createUserFromDB();
  const users = await getUserFromDB();
  const user = users[0];
  const files = await getFilesFromDBForCurrentUser(user?.email);

  if (!files) return;

  return (
    <section className="main-section bg-primary ">
      <AvailableStorage storage_used={user?.storage_used} />
      <Cards files={files} />
    </section>
  );
};

export default Page;
