import { useState, useCallback } from "react";
import { url } from "../Constant/url";
import * as feedback from '../Function/feedback'
import { dataRemap } from "../Function/dataRemap";

export interface newTagType {
  tagsName: string
  color: string
}

interface tagType extends newTagType {
  key: string
}

export default function useSettingAPI() {
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [isGettingTag, setIsGettingTag] = useState(false)
  const [tag, setTag] = useState<tagType[]>([])

  const getTag = useCallback(async () => {
    setIsGettingTag(true)
    try {

      const res = await fetch(`${url}/tag.json`)
      const data = await res.json()
      setTag(dataRemap(data))
      setIsGettingTag(false)
    } catch (e) {
      setIsGettingTag(false)
      feedback.error(e as Error)
    }
  }, [])

  const addTag = useCallback(async (newTag: newTagType) => {
    setIsAddingTag(true)
    try {
      const res = await fetch(`${url}/tag.json`, {
        method: 'POST',
        body: JSON.stringify(newTag),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsAddingTag(false)
      if (res.ok) feedback.success('Add Tag')
    } catch (e) {
      setIsAddingTag(false)
      feedback.error(e as Error)
    }
  }, [])

  return {
    isAddingTag,
    addTag,
    getTag,
    tag,
    isGettingTag
  }
}