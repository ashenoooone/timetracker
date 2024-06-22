import { cookies } from "next/headers";
import { checkUserSsr } from "@/entities/user/api/check-user-ssr";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/shared/consts/cookies";
import { Page } from "@/shared/ui/page";
import { RegisterUser } from "@/features/registerUser";

const checkUser = () => {
  const cookieStore = cookies();
  return checkUserSsr({
    token: cookieStore.get(COOKIES_ACCESS_TOKEN_KEY)?.value,
    banned_status: "authorized",
  });
};

const Index = async () => {
  await checkUser();
  return (
    <Page className={"flex justify-center items-center"}>
      <RegisterUser className={"max-w-[500px] w-full"} />
    </Page>
  );
};

export default Index;
