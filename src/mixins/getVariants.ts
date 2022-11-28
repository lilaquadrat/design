export default (moduleName: string) => {

  const modules = process.env.MODULES as unknown as any[];
  const module = modules.find((single) => single.name === moduleName);

  if (!module) return [];

  return module.variants?.map((single) => single.key);

};
