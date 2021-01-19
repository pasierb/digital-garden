import React, { useRef } from "react"

const Comments = () => {
  const ref = useRef<HTMLScriptElement>();
  const config = {
    repo: "https://github.com/pasierb/digital-garden",
    label: "Comment",
    theme: "github-light",
    crossOrigin: "anonymous",
    "issue-term": "pathname"
  }

  return (
    <script
      ref={ref}
      src="https://utteranc.es/client.js"
      {...config}
      async
    ></script>
  )
}

export default Comments
