"use client";
import { ChevronRight, Lock } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { config } from "@/data/config";

/** Subject + body for the email, built from what the visitor typed.
 *  (Their address isn't needed — Gmail sends from their own account.) */
const composeEmail = (fullName: string, message: string) => {
  const name = fullName.trim();
  const subject = `Portfolio enquiry from ${name || "a visitor"}`;
  const body = `Hi Nayan,\n\n${message.trim()}${name ? `\n\nBest regards,\n${name}` : ""}`;
  return { subject, body };
};

/** Gmail's compose window, pre-filled (same URL format as a Gmail "compose" link) */
const gmailComposeUrl = (subject: string, body: string) =>
  `https://mail.google.com/mail/u/0/?${new URLSearchParams({ fs: "1", to: config.email, su: subject, body, tf: "cm" })}`;

/** Fallback for visitors who don't use Gmail — opens their default mail app */
const mailtoUrl = (subject: string, body: string) =>
  `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { subject, body } = composeEmail(fullName, message);

  // Opens a pre-filled Gmail compose window to my address in a new tab
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(gmailComposeUrl(subject, body), "_blank", "noopener,noreferrer");
  };
  return (
    <form className="w-full sm:mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            placeholder="Your Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="to" className="flex items-center gap-1.5">
            To <Lock className="h-3 w-3 opacity-60" aria-hidden />
          </Label>
          {/* Fixed recipient — shown so visitors know where the message goes */}
          <Input
            id="to"
            type="email"
            value={config.email}
            readOnly
            aria-readonly
            className="cursor-default text-[var(--aw-text-secondary)]"
          />
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">Your Message</Label>
        <Textarea
          placeholder="Tell me about your project or role…"
          id="content"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Opens Gmail with your message ready to send.
        </p>
      </div>
      <Button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        <div className="flex items-center justify-center">
          Send via Gmail <ChevronRight className="w-4 h-4 ml-4" />
        </div>
        <BottomGradient />
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Not using Gmail?{" "}
        <a href={mailtoUrl(subject, body)} className="underline underline-offset-4 hover:text-foreground">
          Use your email app
        </a>
      </p>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
