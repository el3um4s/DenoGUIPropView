export default async function tsToBin(bin: string, binPath: string) {
    const binContent = atob(bin)
    const binArray = new Uint8Array(binContent.length);
    
    let ctn = 0;
    binContent.split("").forEach(char => {
        binArray[ctn++] =  char.charCodeAt(0);
    });
    
    await Deno.writeFile(binPath, binArray)
}