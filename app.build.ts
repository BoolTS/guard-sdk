import { build } from "bun";
import { rm } from "node:fs/promises";

(async () => {
    const currentDir = import.meta.dir;

    await Promise.all([
        rm(`${currentDir}/dist/index.js`, { recursive: true, force: true }),
        rm(`${currentDir}/dist/index.js.map`, { recursive: true, force: true })
    ]);

    await build({
        entrypoints: [`${currentDir}/src/index.ts`],
        root: `${currentDir}/src`,
        outdir: `${currentDir}/dist`,
        publicPath: "./src/",
        sourcemap: "external",
        target: "bun",
        format: "esm",
        packages: "bundle",
        minify: true
    });
})();
