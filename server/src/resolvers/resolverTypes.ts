import { Context, Args } from "prisma-client-lib/dist/types";
import { Client } from "prisma-client-lib";

export interface hasClient extends Context {
    client: Client;
  }