import type { JSX } from "react/jsx-runtime";

export type SideBarItem = {
    icon: JSX.Element;
    title: string;
    route: string;
}