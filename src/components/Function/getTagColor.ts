import type { newTagType } from "../API/useSettingAPi";

export default function getTagColor(tagName: string, tagArr: newTagType[]) {
  for (let i = 0; i < tagArr.length; i++) {
    if (tagName === tagArr[i].tagsName) return tagArr[i].color
  }
  return '#000000'
}