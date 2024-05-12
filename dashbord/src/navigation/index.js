/** @format */
import { allNav } from "./allNav";

export const getNavs = (role) => {
  const finalNav = [];

  for (let i = 0; i < allNav.length; i++) {
    if (role === allNav[i].role) {
      finalNav.push(allNav[i]);
    }
  }
  return finalNav;
};
