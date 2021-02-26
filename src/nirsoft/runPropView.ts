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

    let response: string = "";
    let decoder = new TextDecoder();

    if (process) {
        const buff = new Uint8Array(1);
        while (true) {
            try {
                let result = await process.stdout?.read(buff);
                if (!result) {
                    break;
                }
                response = response + decoder.decode(buff);
            } catch (ex) {
                break;
            }
        }
    }

    let status = await process.status();
    process.stdout?.close();
    process.stderr?.close();
    process.close();

    response = response.trim();

    let result = {
        success: status.success,
        cmd: listArgs,
        result: response
    }
    return result;
}

  