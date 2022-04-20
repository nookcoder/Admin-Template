import { NextRouter } from "next/router";

export const routePageByUuid = (
  currentUrl: string,
  uuid: string,
  router: NextRouter,
) => {
  router.push(`${currentUrl}/${uuid}`);
};

export const getRouterQuery = (router: NextRouter, queryKeyValue: string) => {
  return router.query[queryKeyValue];
};
