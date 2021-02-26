function getOS(): OS {
    return OS[Deno.build.os];
}

enum OS {
   windows = "windows",
   linux = "linux",
   darwin = "darwin",
}

export function isWindows():boolean {
    const os: OS = getOS();
    return os === OS.windows;
}