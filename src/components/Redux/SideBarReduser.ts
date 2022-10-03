import { mySideBar } from "../Navbar/Navbar";

let initialState = {
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
  state: {
    sideBar: mySideBar[];
  } = initialState,
  action:any
) => {
  return state;
};

export default SideBarReducer;
