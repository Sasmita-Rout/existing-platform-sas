import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import { useForm} from "react-hook-form";


const NewProject = () => {
  const newProjectForm = useForm();
  const form = useForm();

  const register = form;
  return (
    <>
    <SectionFour  />
    <SectionFive />
    <SectionSix register={register}/>
    </>
  );
};

export default NewProject;
