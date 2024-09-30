import * as React from "react";
import { useForm } from "react-hook-form";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";

const NewProject = () => {
  const newProjectForm = useForm();
  const form = useForm();
  const register = form;

  // Define inputs for various sections
  const buhInput = [
    { title: "Tony" },
    { title: "Ruby" },
    { title: "San" },
    { title: "DC" },
  ];
  const accountInput = [
    { title: "American Water" },
    { title: "Awana" },
    { title: "CBC" },
    { title: "Cision" },
  ];
  const ddInput = [
    { title: "AnandShah" },
    { title: "Sen" },
    { title: "CBC" },
    { title: "Cision" },
  ];

  // Same input for all props in SectionThree
  const cloudTechnologies = [
    { title: "AWS" },
    { title: "Azure" },
    { title: "GCP" },
  ];

  return (
    <>
      <SectionOne
        buhInput={buhInput}
        accountInput={accountInput}
        ddInput={ddInput}
      />
      <SectionTwo
        domainInput={buhInput}
        applicationInput={accountInput}
      />
      <SectionThree
        environmentInput={cloudTechnologies}
        cloudTechnologies={cloudTechnologies}
        enterprisePlatforms={cloudTechnologies}
        etlAndMdmTools={cloudTechnologies}
        devops={cloudTechnologies}
        lowCodeEnv={cloudTechnologies}
        vcs={cloudTechnologies}
        edgeComputing={cloudTechnologies}
        relationalDb={cloudTechnologies}
        nosqlDb={cloudTechnologies}
        inMemoryDbs={cloudTechnologies}
        mobileCloudComputing={cloudTechnologies}
        systemMonitoringAndPerformance={cloudTechnologies}
        directoryServices={cloudTechnologies}
        ides={cloudTechnologies}
        cmsApp={cloudTechnologies}
        iPaas={cloudTechnologies}
        frontendDevelopment={cloudTechnologies}
        serverSide={cloudTechnologies}
        fullStack={cloudTechnologies}
        mobileDevelopment={cloudTechnologies}
        apiDevelopment={cloudTechnologies}
        applicationIntegrationTools={cloudTechnologies}
        unitTestingFrameworks={cloudTechnologies}
        programmingLanguages={cloudTechnologies}
        codeQualityTools={cloudTechnologies}
        testCoverage={cloudTechnologies}
        productivityMeasurement={cloudTechnologies}
        tracing={cloudTechnologies}
      />

      <SectionFour />
      <SectionFive />
      <SectionSix register={register} />
    </>
  );
};

export default NewProject;
