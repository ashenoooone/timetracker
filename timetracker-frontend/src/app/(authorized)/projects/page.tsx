import { Page } from "@/shared/ui/page";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import React from "react";
import { IoAdd } from "react-icons/io5";

const ProjectsPage = () => {
  return (
    <Page className={"px-0"}>
      <header className={"p-2 border-b flex justify-between items-center"}>
        <Typography variant={"h4"}>Проекты</Typography>
        <Button size={"sm"}>
          <IoAdd className={"w-5 h-5 mr-2"} />
          Создать проект
        </Button>
      </header>
    </Page>
  );
};

export default ProjectsPage;
