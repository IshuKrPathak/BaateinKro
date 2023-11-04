import { Client, Account } from "appwrite";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6545dbdf6c2f5fdce6ce");

export const account = new Account(client);
