import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ArticleDetails from "./components/article/ArticleDetails";
import FailedArticles from "./components/article/FailedArticles";

import SingleArticle from "./components/single/SingleArticle";
import ChannelsTable from "./components/youtube/ChannelsTable";
import VideoTable from "./components/youtube/VideoTable";
import SuccessSourcesTable from "./sources/SuccessSourcesTable";
import FailedSourcesTable from "./sources/FailedSourcesTable";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="articles" element={<ArticleDetails />} />
            <Route path="failed" element={<FailedArticles></FailedArticles>} />
               <Route path="channels" element={<ChannelsTable></ChannelsTable>} />
                  <Route path="success" element={<SuccessSourcesTable></SuccessSourcesTable>} />
                     <Route path="fail" element={<FailedSourcesTable></FailedSourcesTable>} />
                  <Route path="videos" element={<VideoTable></VideoTable>} />
            <Route path="singlearticle/:encodedUrl" element={<SingleArticle />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
