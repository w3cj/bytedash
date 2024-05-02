import express from "express";
import { rpcHandler } from "typed-rpc/lib/express";
import { ByteDashService } from "./service";

const app = express();

app.use(express.json());
app.post("/api", rpcHandler(ByteDashService));

app.listen(process.env.PORT || 3000);
