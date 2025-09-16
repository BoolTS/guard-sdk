/** @internal */
(async () => {
    const rootDir = import.meta.dir;

    await Bun.build({
        entrypoints: [`${rootDir}/src/index.ts`],
        root: `${rootDir}/src`,
        outdir: `${rootDir}/dist`,
        publicPath: "./src/",
        sourcemap: "external",
        target: "bun",
        format: "esm",
        packages: "bundle",
        minify: true
    });
})();
