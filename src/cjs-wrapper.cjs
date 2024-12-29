exports.activate = async (context) => {
  const { activate } = await import("./extension.js");
  return activate(context);
};

exports.deactivate = async () => {
  const { deactivate } = await import("./extension.js");
  return deactivate();
};
