import React from 'react'

export default function Duration ({ style, seconds }) {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} style={style}>
      {format(seconds)}
    </time>
  )
}

function format (seconds) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

function pad (string) {
  return ('0' + string).slice(-2)
}