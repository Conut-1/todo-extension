exports.run = async () => {
  const { run } = await import("./index.js");
  return run();
};
