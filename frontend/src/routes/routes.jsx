import React, { Suspense } from "react";
import PageRoutes from "./PageRoutes";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/ui/spinner/Spinner";
import { useLocation } from "react-router-dom";

const routes = () => {
  const location = useLocation();
  console.log(location.pathname);
  const pageRoutes = PageRoutes.map(({ path, element }, index) => {
    console.log(path)
    return <Route exact key={index}  path={path.replace("/flashcard", "")}  element={element} />;
  });

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Routes>{pageRoutes}</Routes>
      </Suspense>
    </div>
  );
};

export default routes;
