import { Client, Account, Databases } from "appwrite";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6545dbdf6c2f5fdce6ce");

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = "654618b0a232bbc2d96d";
export const COMMUNITY_COLLECTION_ID = "654618d2c0eeb193ba3a";
export const CHAT_COLLECTION_ID = "65475d2ba0152c2f7dd8";

