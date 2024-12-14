"use client";
import React from "react";
import Typography from "@/components/ui/typography";
import { useCreateWorkspaceValues } from "@/hooks/create-workspace-values";
import { Button } from "@/components/ui/button";

const CreateWorkspace = () => {
  const { currStep } = useCreateWorkspaceValues();

  let stepInView = null;
  switch (currStep) {
    case 1:
      stepInView = <Step1 />;
      break;
    case 2:
      stepInView = <Step2 />;
      break;
    default:
      stepInView = <Step1 />;
      break;
  }

  return (
    <div className="w-screen h-screen grid place-content-center text-white bg-black">
      <div className="p-3 max-w-[550px]">
        <Typography
          text={`Step ${currStep} of 2`}
          variant="p"
          className="text-neutral-400"
        />
        {stepInView}
      </div>
    </div>
  );
};

export default CreateWorkspace;

const Step1 = () => {
  const { name, updateValues, setCurrStep } = useCreateWorkspaceValues();
  return (
    <>
      <Typography
        text="What is the name of your company or team?"
        className="my-4"
      />
      <Typography
        text="This will be the name of your work space - choose something that your team will recoganize"
        className="text-neutral-300"
        variant="p"
      />

      {/* Add input for name */}
      <form action="" className="mt-6">
        <fieldset>
          <input
            type="text"
            value={name}
            onChange={(event) => updateValues({ name: event.target.value })}
            className="bg-neutral-800 p-2 text-white  rounded type='text  w-full '"
            placeholder="Enter your company/team name"
          />
        </fieldset>
      </form>
      <Button
        disabled={!name}
        type="button"
        onClick={() => setCurrStep(2)}
        className="mt-10"
      >
        Next
      </Button>
    </>
  );
};

const Step2 = () => {
  const { setCurrStep } = useCreateWorkspaceValues();
  return (
    <>
      <Button
        size="sm"
        className="text-white"
        variant="link"
        onClick={() => setCurrStep(1)}
      >
        <Typography text="Back" variant="p" className="mt-10 " />
      </Button>

      <form>
        <Typography text="Add workspace Avatar" className="mt-4" />
        <Typography
          text="This image can be changed leter in your work space settings"
          className="text-neutral-300 mt-3"
          variant="p"
        />
        <fieldset className="mt-6 flrx flex-col items-center space-y-9">
          {/* image component */}
          <div className="space-x-5">
            <Button onClick={() => {}}>
              <Typography text="Skip for now" variant="p" />
            </Button>
          </div>
        </fieldset>
      </form>
    </>
  );
};
