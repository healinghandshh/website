import { APIRoute } from "astro";
import client from "@sendgrid/mail";
import { error } from "astro/dist/core/logger/core";
client.setApiKey(process.env.SENDGRID_API_KEY as string);

export const get: APIRoute = ({ request }) => {
  return new Response("HI", { status: 200 });
};

export const post: APIRoute = ({ request }) => {
  const params = new URLSearchParams(request.url);
  const firstName = params.get("firstName");
  const lastName = params.get("lastName");
  const email = params.get("email");
  const message = params.get("message");
  const subject = params.get("subject");
  const mail = {
    to: "Msawadogo.healinghandsllc@gmail.com",
    from: "hhealing14@gmail.com",
    templateId: "d-6c77a401df934180b44b48dbaa0d32e3",
    dynamicTemplateData: { firstName, lastName, email, message, subject },
  };

  try {
    client.send(mail);
    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
};
