import { useAppSelector } from "../../hooks.ts/hooks";

function WorkoutsPage() {
  const { user } = useAppSelector((store) => store.authentication);

  console.log(user);

  return <div>{user?.displayName}</div>;
}

export default WorkoutsPage;
