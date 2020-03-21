/**
 * tableHook.js 用于处理 Table组件的分页事件
 * 自定义的一个 server hook，该 hook 封装了 ajax 请求中的 { loading, error, response } 三个基础逻辑；
 * 有了这个 hook 我们就能很轻松的在每次网络请求里面去处理各种异常逻辑了
 */
import { useEffect, useState, useCallback } from 'react'

export const useServiceCallback = (service) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  // 使用 useCallback，来判断 service 是否改变
  const callback = useCallback(
    (params) => {
      setLoading(true)
      setError(null)
      service(params)
        .then((res) => {
          setLoading(false)
          setResponse(res)
        })
        .catch(() => {
          setLoading(false)
        })
    },
    [service]
  )
  return [callback, { loading, error, response }]
}

const useService = (service, params) => {
  const [callback, { loading, error, response }] = useServiceCallback(service)
  useEffect(() => {
    callback(params)
    return () => {}
  }, [callback, params])
  return { loading, error, response }
}

export default useService