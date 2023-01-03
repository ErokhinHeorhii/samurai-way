import { mySideBar } from "../Navbar/Navbar";


 export type IsideinitialStateTypeForNavbar = {
  sideBar: mySideBar[];
};

let initialState: IsideinitialStateTypeForNavbar = {
  sideBar: [
    {
      avatarSrc:
        "https://cspromogame.ru//storage/upload_images/avatars/897.jpg",
      name: "Borya",
    },
    {
      avatarSrc:
        "https://cspromogame.ru//storage/upload_images/avatars/4169.jpg",
      name: "Vashya",
    },
    {
      avatarSrc:
        "https://cspromogame.ru//storage/upload_images/avatars/899.jpg",
      name: "Igor",
    },
  ],
};
export const SideBarReducer = (
  state: IsideinitialStateTypeForNavbar = initialState,
) : IsideinitialStateTypeForNavbar=> {
  return state;
};

export default SideBarReducer;
