import React, { Suspense } from "react";
import {
  Route,
  Switch,
  HashRouter as Router,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
// 导入私有路由
// import AuthRoute from '@c/Route'
// 导入全局loading
import Mask from "@c/Mask";
import routersMapping from "@s/router/routersMapping";

const Login = React.lazy(() => import("@v/login"));

const AppView = ({ model }) => {
  // 将路由表的component -> Reat.lazy加载的组件
  const mapToComponent = data =>
    data.map(item => {
      let temp = { ...item };
      let component = routersMapping[item.component];
      if (component === undefined) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `generateRouter wanning : ${item.name} component wasn't in routersMapping.that will make it's page be 404 page`
          );
        }
        component = React.lazy(() => import("@v/404"));
      }
      temp.component = component;
      if (item.children && item.children.length > 0) {
        temp.children = mapToComponent(item.children);
      }
      return temp;
    });

  const routers = mapToComponent(model.routers);

  return (
    <Router>
      <Suspense fallback={<Mask />}>
        <Switch>
          {routers.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              render={() => <item.component {...item} />}
            />
          ))}
          <Route path="/login" exact component={Login} />
          <Redirect from="/" to="/index/dashBoard"></Redirect>
          <Redirect to="/404"></Redirect>
        </Switch>
      </Suspense>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    model: state["permission"]
  };
};

export const App = connect(mapStateToProps)(AppView);
