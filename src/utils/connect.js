import store from "../store";
import React from "react";

export default modelName => {
  const selector = store => store.getState()[modelName];
  // debugger;
  const preState = selector(store);
  console.log(preState, "prestate");
  if (!preState) {
    return new Error(
      `${modelName} model doesn't esist on redux state. please check your combileReducer function`
    );
  }

  return WrapperCommponnet =>
    class extends React.Component {
      state = preState;
      constructor() {
        super();
      }
      componentDidMount() {
        console.log(this);
        this.unsubscribe = store.subscribe(() => {
          const nextState = selector(store);
          // 浅比较
          if (nextState !== this.state.preState) {
            console.log(
              `connect component : redux state has benn update, name : ${WrapperCommponnet.name}`
            );
            this.setState(nextState);
          }
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return (
          <WrapperCommponnet
            {...this.props}
            model={this.state}
            dispatch={store.dispatch}
          />
        );
      }
    };
};

/**
 * 订阅顺序 : App -> Login
 *
 * App
 *  |_login -> updateModel -> notify connect -> 更新AppView -> 更新LoginView
 *  |_pages
 */
