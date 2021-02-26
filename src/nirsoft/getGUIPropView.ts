import { join } from "https://deno.land/std/path/mod.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import currentWorkingDir from "../utils/currentWorkingDir.ts";
import tsToBin from "../convertBin/tsToBin.ts";

export default async function getGUIPropView(bin: string): Promise<string> {
    const propViewFolder:string = join(currentWorkingDir(), "/bin/GUIPropView/");
    const nirPath:string = join(propViewFolder, "GUIPropView.exe")
    let existNirPath:boolean = await exists(nirPath);
    if (!existNirPath) {
        await ensureDir(propViewFolder);
        await tsToBin(bin, nirPath)
    }

    return nirPath;
}
