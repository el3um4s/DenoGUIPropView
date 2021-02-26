import { join } from "https://deno.land/std/path/mod.ts";
// cli: deno -A binToTs.ts binFile nameTs

const binFile = Deno.args[0];
const nameTs = Deno.args[1];

const filePath = join(Deno.cwd(),`/${binFile}`);
const uint = await Deno.readFile(filePath);

let binary = ""
const len = uint.length

for (let index = 0; index < len; index++) {
    binary += String.fromCharCode(uint[index])
}

const binBase64 = btoa(binary)
const base64 = trunString(binBase64, 100)

const tsFileContent = `export const bin=\`${base64}\``
//const tsFilePath = join(binFolderPath, `${binFile}.ts`)
await Deno.writeTextFile(nameTs, tsFileContent);

console.log(`TS File saved to: ${nameTs}`)

function trunString(input: string, width: number): string {
    const it = Math.ceil(input.length / width);
    let rtnVal = ""
    for (let index = 0; index < it; index++) {
        rtnVal += input.substring(index * width, index * width + width) + "\r\n"
    }
    return rtnVal
}