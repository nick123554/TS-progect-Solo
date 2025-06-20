import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
// import Layout from "./widgets/Layout/Layout";
// import MainPage from "./pages/MainPage/MainPage";
// import SignUpPage from "./pages/SignUpPage/SignUpPage";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import { axiosInstance, setAccessToken } from "./shared/lib/axiosInstance";
// import { UserApi } from "./entities/users/UserApi";
// import AddProductPage from "./pages/AddProductPage/AddProductPage";
// import MyProductsPage from "./pages/MyProductsPage/MyProductsPage";
// import OnePage from "./pages/OnePage/OnePage";
// import EditPage from "./pages/EditPage/EditPage";
// import PersonalPage from "./pages/Personalpage/PersonalPage";

function App():React.JSX.Element {
  const [user, setUser] = useState({ status: "loging", data: null });
  console.log(user);

  useEffect(() => {
    const getUser = async ():Promise<void> => {
      try {
        const data = await UserApi.refresh();
        console.log(data);
        setUser({ status: "logged", data: data.data.user });
      } catch (error) {
        console.log(error);
      }
    };

    
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} setUser={setUser} />}>
          {/* <Route path="/" element={<MainPage user={user} />} />
          <Route path="/personal" element={<PersonalPage user={user} />} />
          <Route path="/add" element={<AddProductPage user={user} />} />
          <Route
            path="/products"
            element={<MyProductsPage user={user} />}
          />
          <Route path="/products/:id" element={<OnePage />} />

          <Route path="/edit/:id" element={<EditPage />} />

          <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
///