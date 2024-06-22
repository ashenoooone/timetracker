import { cookies } from "next/headers";
import { checkUserSsr } from "@/entities/user/api/check-user-ssr";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/shared/consts/cookies";
import { LoginUser } from "@/features/loginUser";
import { Page } from "@/shared/ui/page";
import { redirect } from "next/navigation";
import { paths } from "@/shared/consts/paths";

const checkUser = async () => {
  const cookieStore = cookies();

  const user = await checkUserSsr({
    token: cookieStore.get(COOKIES_ACCESS_TOKEN_KEY)?.value,
    banned_status: "authorized",
  });

  if (!user) redirect(paths.profile);

  return;
};

const Index = async () => {
  await checkUser();
  return (
    <Page className={"flex justify-center items-center"}>
      <LoginUser className={"max-w-[500px] w-full"} />
    </Page>
  );
};

export default Index;
