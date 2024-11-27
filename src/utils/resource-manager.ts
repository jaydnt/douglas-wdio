import data from "../resources/data.json";

export const getPageDetails = async (pageName: string) => {
  const page = data.pageDetails.find((p) => p.pageName === pageName);
  return page;
};
