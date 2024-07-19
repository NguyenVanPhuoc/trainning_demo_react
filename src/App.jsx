import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authRoutesAdmin, adminRoutes } from "./config/routes";
import { isEmpty, uniqueId } from "lodash";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import { useSelector } from "react-redux";

function App() {
  const { admin } = useSelector((state) => state.adminAuth);

  return (
    <BrowserRouter>
      <Routes>
      {!isEmpty(admin) ?
          <Route path="/admin" element={<AdminLayout />}>
            {adminRoutes.map((route) => {
              if (!isEmpty(route.to)) {
                return (
                  <Route
                      key={uniqueId()}
                      path={route.path}
                    element={<Navigate to={route.to} />}
                  />
                )
              }

              return (
                <Route
                  key={uniqueId()}
                  path={route.path}
                  element={<route.component />}
                />
              )
            })}
          </Route>
          : <Route path="/admin" element={<AuthLayout />}>
          {
            authRoutesAdmin.map(route => (
              <Route
                key={uniqueId()}
                path={route.path}
                element={<route.component />}
              />
            ))
          }
        </Route>
      }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
