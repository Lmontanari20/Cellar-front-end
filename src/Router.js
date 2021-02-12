import React from "react";
import GuiPage from "./components/GuiPage";
import Bottles from "./components/Bottles";
import LogInContainer from "./components/LogInContainer";

const routes = {
  "/": () => <GuiPage selectedForm={null} loggedIn={loggedIn} />,
  "/add-section": () => <GuiPage selectedForm="add-section" />,
  "/add-bottle": () => <GuiPage selectedForm="add-bottle" />,
  "/filter": () => <GuiPage selectedForm="filter" />,
  "/all-bottles": () => <Bottles />,
  "/log-in": () => <LogInContainer formType="log-in" logIn={logIn} />,
  "/sign-up": () => <LogInContainer formType="sign-up" logIn={signUp} />,
};
export default routes;
