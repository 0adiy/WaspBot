import glob from "glob";
import { promisify } from "util";

const proGlob = promisify(glob);

async function loadFiles(dirName) {
  const Files = await proGlob(
    `${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`
  );
  // Files.forEach((file) => delete require.cache[require.resolve(file)]);

  // FIXME: ESM Cache busting not possible so this is a workaround
  Files.forEach((file) => `${file}?d=${Date.now()}`);
  return Files;
}

export default loadFiles;
