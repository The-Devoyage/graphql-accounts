import { MailerConnect } from "@the-devoyage/mailer-connect";

const mailerRoute = process.env.MAILER_URI;

let mailer: MailerConnect;

if (mailerRoute) {
  mailer = new MailerConnect({ uri: mailerRoute });
}

export { mailer };
