import React, { FC } from "react"
import s from "./BotIcon.module.css"

interface Props {
  size: number
}

const BotIcon: FC<Props> = (props) => {
  return (
    <div className={s.bot_icon_box}>
      <div className={s.bot_icon}>
        <img style={{ width: props.size, height: props.size }} src="https://wiki.hypixel.net/images/4/40/Minecraft_items_zombie_head.png" alt="Нет изображения" />
      </div>
    </div>
  )
}

export default BotIcon