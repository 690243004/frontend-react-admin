import React, { useEffect } from "react";
import "./index.less";

const OFFSET = 50; // 偏差值
const STEP_MAGNIFICATION = 5; // 移动速率

const BackToTop = () => {
  const hasScrollbar = dirction => {
    if (dirction === "vertical") {
      return element => element.scrollHeight - element.clientHeight > OFFSET;
    } else {
      return element => element.scrollWidth - element.clientWidth > OFFSET;
    }
  };

  // 广度优先搜索
  const bfs = root => callback => {
    const queue = [root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (callback(node)) return node;
      if (node.childNodes) {
        queue.push(...node.childNodes);
      }
    }
  };

  let scrollContainer;

  useEffect(() => {
    scrollContainer = bfs(document.querySelector(".container"))(
      hasScrollbar("vertical")
    );
  }, []);

  const animate2Top = dom => {
    const scrollTop = dom.scrollTop;
    if (scrollTop > 0) {
      console.log(Math.floor(scrollTop / STEP_MAGNIFICATION));
      scrollContainer.scrollTo(0, Math.floor(scrollTop / 10));
      window.requestAnimationFrame(() => {
        animate2Top(dom);
      });
    }
  };

  const onBackToTop = () => {
    if (scrollContainer) {
      animate2Top(scrollContainer);
    }
  };

  return <div className="back-to-top" onClick={onBackToTop}></div>;
};

export default BackToTop;
