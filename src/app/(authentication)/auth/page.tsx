"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { BsSlack } from "react-icons/bs";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { log } from "node:console";

const Authpage = () => {
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Provide Valid email" })
      .min(2, { message: "Email must be 2 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography text="Slackk" variant="h1" />
        </div>
        <Typography
          text="Sign into your Slackk"
          variant="h2"
          className="mb-3"
        />
        <Typography
          text="Enter your Email and Password"
          variant="p"
          className="opacity-19 mb-7"
        />
        <div className="flex flex-col space-y-4">
          <Button variant="outline" className="py-6 border-2 flex space-x-3">
            <FcGoogle />
            <Typography
              text="Continue With Google"
              variant="p"
              className=" text-xl"
            />
          </Button>
          <Button variant="outline" className="py-6 border-2 flex space-x-3">
            <RxGithubLogo />
            <Typography
              text="Sign In With GitHub"
              variant="p"
              className=" text-xl"
            />
          </Button>
        </div>
        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />

            <Typography text="OR" variant="p"></Typography>
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
          </div>
          {/* form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="yourEmail@Email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="secondary"
                  className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
                  type="submit"
                >
                  <Typography text="Sign in with Email" variant="p" />
                </Button>
                <div className="px-5 py-4 bg-gray-100 rounded-sm">
                  <div className="text-gray-500 flex items-center space-x-3 ">
                    <MdOutlineAutoAwesome />
                    <Typography
                      text="We will email you a link for password free sign-in"
                      variant="p"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Authpage;
// function zodResolver(
//   formSchema: z.ZodObject<
//     { email: z.ZodString },
//     "strip",
//     z.ZodTypeAny,
//     { email: string },
//     { email: string }
//   >
// ): import("react-hook-form").Resolver<{ email: string }, any> | undefined {
//   throw new Error("Function not implemented.");
// }
