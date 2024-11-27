import data from "../resources/data.json";

export const getResourcePageDetails = async (pageName: string) => {
  const page = data.pageDetails.find((p) => p.pageName === pageName);
  return page;
};
