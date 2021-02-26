export default function currentWorkingDir():string {
    return Deno.cwd();
}