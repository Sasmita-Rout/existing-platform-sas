import {useEffect } from "react"
import useStore from "../zustand/store"
import { getPlatformData } from "../network/Service"

const useFetch = () => {
  const { setProjects, setLoading, setError } = useStore()

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const data = await getPlatformData()
        setProjects(data) 
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [setProjects, setLoading, setError])
}

export default useFetch;
