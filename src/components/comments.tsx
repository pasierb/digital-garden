import React, { useRef, useEffect } from "react"

const CONFIG = {
  repo: "pasierb/digital-garden",
  label: "Comment",
  theme: "github-light",
  "issue-term": "title"
};

const Comments = () => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current.childNodes.length > 0) {
      return;
    }

    const scriptElement = document.createElement('script')
    scriptElement.setAttribute("src", "https://utteranc.es/client.js");
    scriptElement.setAttribute("async", "");
    scriptElement.setAttribute("crossorigin", "anonymous");

    for (const key in CONFIG) {
      scriptElement.setAttribute(key, CONFIG[key]);
    }

    ref.current.appendChild(scriptElement);
  }, []);

  return (
    <div ref={ref} />
  );
}

export default Comments
