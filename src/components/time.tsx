import React from "react"

const dateFormat = new Intl.DateTimeFormat("en-us", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

const Time: React.FC<{ date: Date }> = ({ date }) => (
  <time dateTime={date.toISOString()}>{dateFormat.format(date)}</time>
)

export default Time
