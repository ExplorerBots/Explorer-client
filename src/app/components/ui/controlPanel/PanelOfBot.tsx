import BotIcon from './BotIcon'
import s from "./PanelOfBot.module.scss"

const PanelOfBot = () => {
  // const [copied, copyToClipboard] = useCopyToClipboard(); // функция для копирования ip сервера
  const copyToClipboard = (val: string) => console.log(val)
  const value = 'mc.holyworld.ru'

  return (
    <div className={s.bot_panel}>

      {false && (
        <div className={s.rate}>
          <p>Classic</p>
        </div>
      )}

      <div className={s.discription}>
        <div className={s.name_and_logo_of_server}>
          <div className={s.name_of_server}>
            <p>HolyWorld</p>
          </div>
          <div className={s.logo_of_server}>
            <img src="https://panels.twitch.tv/panel-86708767-image-8b699b32-ba6a-4b04-bd57-fd34f124e71f" alt="Нет изображения" />
          </div>
        </div>
        <div className={s.ip_of_server}>
          <p>ip: <span onClick={() => copyToClipboard(value)}>mc.holyworld.ru</span></p>
        </div>
      </div>

      <div className={s.bot_icon}>
        <BotIcon size={200} />
      </div>
      <div className={s.run_bot}>
        <button>
          Запустить
        </button>
      </div>
      <div className={s.time_left}>
        <p>Осталось дней: {12 + 1}</p>
      </div>
    </div>
  )
}


export default PanelOfBot