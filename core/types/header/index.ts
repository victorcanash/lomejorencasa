export type DrawerItems = {
  textId: string,
  path: string | undefined,
  items: {
    textId: string,
    path: string | undefined,
  }[],
  open: boolean,
};
