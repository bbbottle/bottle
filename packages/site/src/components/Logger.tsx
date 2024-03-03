export default () => {
  // @ts-ignore
  const appVer = GLOBAL_BBKING_VERSION;
  const tagUrl = `https://github.com/bbbottle/bottle/releases/tag/@bbki.ng/site@${appVer}`;

  console.log(appVer, tagUrl);

  return null;
};
