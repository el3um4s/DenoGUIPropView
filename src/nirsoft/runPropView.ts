import getGUIPropView from "./getGUIPropView.ts";
import { bin } from "./GUIPropView.ts";

export default async function runGUIPropView(args: Array<string>) {

    const nirSoft: string = await getGUIPropView(bin);
    const listArgs: Array<string> = [nirSoft].concat(args);
    const process = Deno.run({
        cmd: listArgs,
        stdout: "piped",
        stderr: "piped"
    });

    let status = await process.status();
    process.stdout?.close();
    process.stderr?.close();
    process.close();

    let result = {
        success: status.success,
        cmd: listArgs
    }
    return result;
}

  